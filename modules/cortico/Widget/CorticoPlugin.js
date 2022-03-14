import Login from "../../Login/Login";
import { useState, useEffect } from "preact/hooks";
import WidgetSidebar from "./WidgetSidebar";
import WidgetSettings from "./WidgetSettings";
import WidgetAutomation from "./WidgetAutomation";
import {
  UserIcon,
  DesktopComputerIcon,
  ChatIcon,
  CogIcon,
} from "@heroicons/react/solid";
import { isLoggedIn } from "../../Utils/Utils";
import AccountInformation from "./AccountInformation";
import NotAvailable from "./NotAvailable";

export default function CorticoPlugin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([
    {
      name: "Account",
      icon: <UserIcon className="tw-w-8 tw-h-8" />,
      current: true,
    },
    {
      name: "Automation",
      icon: <DesktopComputerIcon className="tw-w-8 tw-h-8" />,
      current: false,
    },
    {
      name: "Settings",
      icon: <CogIcon className="tw-w-8 tw-h-8" />,
      current: false,
    },
    {
      name: "Messenger",
      icon: <ChatIcon className="tw-w-8 tw-h-8" />,
      current: false,
    },
  ]);
  const [activeItem, setActiveItem] = useState("Account");

  const handleClick = (name) => {
    const newItems = items.map((item) => {
      if (item.name === name) {
        item.current = true;
      } else {
        item.current = false;
      }
      return item;
    });
    setItems(newItems);
  };

  useEffect(() => {
    const activeItem = items.find((item) => item.current === true);
    setActiveItem(activeItem.name);
  }, [items]);

  useEffect(() => {
    isLoggedIn().then((result) => {
      setLoggedIn(result);
    });
  }, []);

  return (
    <div className="tw-flex tw-h-full">
      <div className="">
        <WidgetSidebar items={items} onClick={handleClick} />
      </div>
      <div className=" tw-text-black">
        {activeItem === "Account" ? (
          <div className="tw-p-4 tw-mx-auto tw-flex tw-items-center tw-justify-center tw-overflow-hidden">
            {loggedIn === true ? <AccountInformation /> : <Login />}
          </div>
        ) : activeItem === "Automation" ? (
          <div className="tw-p-6">
            <WidgetAutomation />
          </div>
        ) : activeItem === "Settings" ? (
          <div className="tw-p-4 tw-w-[700px] tw-h-full">
            <WidgetSettings />
          </div>
        ) : activeItem === "Messenger" ? (
          <div className="tw-w-[320px] tw-h-full">
            <NotAvailable />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
