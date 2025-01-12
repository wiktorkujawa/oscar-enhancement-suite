import { useEffect, useState } from "preact/hooks";
import { LockOpenIcon, StarIcon } from "@heroicons/react/solid";
import {
  removeExtensionStorageValue,
  loadExtensionStorageValue,
} from "../../Utils/Utils";
import storage from "./storage/";
import { useSelector } from "react-redux";
import Button from "../../core/Button";
import Header from "./base/Header";
import { BroadcastChannel } from "broadcast-channel";

export default function AccountInformation() {
  const [loading, setLoading] = useState(false);
  const { clinic_name: clinicName, uid } = useSelector((state) => state.app);
  const [username, setUsername] = useState(null);

  const handleSignOut = async () => {
    setLoading(true);
    const remove = [
      "jwt_username",
      "jwt_expired",
      "jwt_access_token",
      "name",
      "clinicname",
      "customUrlSuffix",
    ];

    for (let i = 0; i < remove.length; i++) {
      await removeExtensionStorageValue(remove[i]);
    }

    const authChannel = new BroadcastChannel("cortico/oes/auth");
    authChannel.postMessage({
      title: "Sign Out Detected",
      description: "Refresh is required to have the plugin working smoothly",
      uid,
    });
    authChannel.close();

    storage.removeItem("oes").then(() => {
      setTimeout(() => window.location.reload());
    });
  };

  useEffect(() => {
    if (!username) {
      loadExtensionStorageValue("jwt_username").then((username) => {
        setUsername(username);
      });
    }
  }, []);

  return (
    <>
      <div className="tw-p-4 tw-min-w-[450px]">
        <div className="tw-font-sans">
          <Header title="Account" desc="Account related information" />
          <hr className="tw-my-4" />
          <div className="tw-flex tw-w-full tw-items-start">
            <span className="tw-text-xl tw-flex-shrink-0 tw-h-24 tw-w-24 tw-mx-auto  tw-rounded-full tw-overflow-hidden tw-bg-gray-100 tw-flex tw-items-center tw-justify-center tw-text-gray-900 tw-font-medium">
              {clinicName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        </div>
        <div className="tw-font-sans tw-text-sm tw-mt-2">
          <div className="tw-flex tw-justify-between tw-py-4 tw-border-b tw-border-black tw-border-opacity-10">
            <p className="tw-text-gray-700">Clinic Name</p>
            <p>{clinicName}</p>
          </div>
          <div className="tw-flex tw-justify-between tw-py-4 tw-border-b tw-border-black tw-border-opacity-10">
            <p className="tw-text-gray-700">Clinic Url</p>
            <p>
              <a
                href={`https://${localStorage.getItem(
                  "clinicname"
                )}.${localStorage.getItem("customUrlSuffix")}`}
                target="_blank"
                className="tw-underline"
              >
                https://{localStorage.getItem("clinicname")}.
                {localStorage.getItem("customUrlSuffix")}
              </a>
            </p>
          </div>
          <div className="tw-flex tw-justify-between tw-py-4 tw-border-b tw-border-black tw-border-opacity-10">
            <p className="tw-text-gray-700">Username</p>
            <p className="tw-font-normal">{username}</p>
          </div>
        </div>
        <div className="tw-w-full tw-flex tw-justify-end tw-mt-4 tw-font-sans">
          <Button
            variant="custom"
            onClick={handleSignOut}
            size="sm"
            loading={loading}
            className="tw-bg-blue-100 tw-text-blue-700 tw-text-sm tw-rounded-md tw-font-medium"
          >
            <LockOpenIcon className="tw-inline-block tw-mr-2 tw-text-blue-1000 tw-h-4 tw-w-4 tw-opacity-50"></LockOpenIcon>
            Sign Out
          </Button>
        </div>

        <div className="tw-flex tw-justify-between tw-mt-10 tw-font-sans">
          <p className="tw-text-sm tw-text-center tw-font-semibold">
            &copy; <span className="tw-text-blue-1000">Cortico</span>
          </p>
          <a
            href="mailto:help@cortico.health"
            className="tw-text-blue-1000 tw-text-sm tw-font-normal"
          >
            help@cortico.health
          </a>
        </div>
      </div>
    </>
  );
}
