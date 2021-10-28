import { render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { loadExtensionStorageValue, isLoggedIn } from "../Utils/Utils";
import Notification from "../Notifications/Notification";
import MessengerWidget from "./MessengerWidget";
import MessengerWindow from "./MessengerWindow";
import { sendEmailForm } from "../Api/Api";

function MessageException(message) {
  this.message = message;
  this.name = "MessageException";
  this.title = "Error";
}

const handleErrors = async (response) => {
  const result = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      throw new MessageException(result && result.detail);
    } else {
      throw new MessageException(response && response.statusText);
    }
  }
  return result;
};

function Messenger(patient) {
  const container = document.body;

  function Content({ patient, ...props }) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [messageInfo, setMessageInfo] = useState({
      title: null,
      content: null,
    });

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const promptLogin = () => {
      setMessageInfo({
        title: "Log In",
        content: "Please log in to use this service",
      });
      setShowNotification(true);
    };

    const handleSubmit = async (data) => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const token = await loadExtensionStorageValue("jwt_access_token");
      if (token) {
        sendEmailForm(data, token)
          .then(handleErrors)
          .then((response) => {
            setMessageInfo({
              title: "Success",
              content:
                response.message ||
                `Message successfully sent to ${patient?.email}`,
            });
          })
          .catch((error) => {
            setMessageInfo({
              title: error.title,
              content: error && error.message,
            });
          })
          .finally(() => {
            setShowNotification(true);
            setLoading(false);
          });
      }
    };

    useEffect(() => {
      (async () => {
        try {
          const result = await isLoggedIn();
          console.log("is logged in result?", result);
          setLoggedIn(result);
        } catch (error) {
          console.error(error);
          setLoggedIn(false);
        }
      })();
    }, []);

    return (
      <div className="tailwind tw-font-sans">
        <div
          className={`tw-fixed tw-bottom-5 tw-right-5 tw-bg-white tw-z-10000 tw-max-w-[400px] tw-shadow-xl tw-w-full tw-rounded-md tw-transform tw-transition-transform tw-duration-200 tw-ease-in-out ${
            open ? "tw-translate-x-0" : "tw-translate-x-[430px]"
          }`}
        >
          <MessengerWindow
            patient={patient}
            loading={loading}
            onSubmit={handleSubmit}
            close={handleClose}
          />
        </div>
        <div className="tw-fixed tw-bottom-5 tw-right-5 tw-z-5000 tw-shadow-xl">
          <MessengerWidget
            open={handleOpen}
            login={promptLogin}
            loggedIn={loggedIn}
          />
        </div>
        <Notification
          open={showNotification}
          close={() => {
            setShowNotification(false);
          }}
          delay={3000}
          content={messageInfo.content}
          title={messageInfo.title}
        />
      </div>
    );
  }

  return render(<Content patient={patient} />, container);
}

export default Messenger;
