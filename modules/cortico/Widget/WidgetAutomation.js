import { ArrowRightIcon } from "@heroicons/react/outline";
import {
  StarIcon,
  ClipboardCheckIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/solid";
import classNames from "classnames";
import { Transition } from "@headlessui/react";
import { useState } from "preact/hooks";
import EligbilityCheck from "./automation/EligibilityCheck";
import PreferredPharmacies from "./automation/PreferredPharmacies";
import { useDispatch, useSelector } from "react-redux";

const automations = [
  {
    name: "Eligibility Check",
    value: "elig",
    description:
      "Have the plugin to check eligibility for each patient in the schedule. ",
    icon: (
      <ClipboardCheckIcon className="tw-w-6 tw-h-6 tw-mr-2 tw-text-blue-1000 tw-inline-block" />
    ),
  },
  {
    name: "Preferred Pharmacies",
    value: "phar",
    description:
      "Set preferred pharmacies for each of the patients in the schedule",
    icon: (
      <OfficeBuildingIcon className="tw-w-6 tw-h-6 tw-mr-2 tw-text-blue-1000 tw-inline-block" />
    ),
    premium: true,
  },
];

export default function WidgetAutomation() {
  const option = useSelector((state) => state.automation.option);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("Option", option);
  const dispatch = useDispatch();
  const handleClick = (value) => {
    const automation = automations.find((item) => item.value === value);
    const premium = automation.premium;

    if (premium && !isLoggedIn) {
      return;
    }
    dispatch({ type: "automation/setOption", payload: value });
  };

  const handleGoBack = () => {
    dispatch({ type: "setupPharmacyFailures/reset" });
    dispatch({ type: "setupPharmacy/reset" });
    dispatch({ type: "eligCheckFails/reset" });
    dispatch({ type: "eligCheck/reset" });
    dispatch({ type: "automation/setOption", payload: "none" });
  };

  return (
    <div className="tw-px-4 tw-py-4">
      <Transition
        show={true}
        appear={true}
        enter="tw-transition-opacity tw-duration-1000"
        enterFrom="tw-opacity-0"
        enterTo="tw-opacity-100"
        leave="tw-transition-opacity tw-duration-1000"
        leaveFrom="tw-opacity-100"
        leaveTo="tw-opacity-0"
      >
        {option === "none" ? (
          <WidgetAutomationOptions
            onClick={handleClick}
            isLoggedIn={isLoggedIn}
          />
        ) : option === "elig" ? (
          <EligbilityCheck goBack={handleGoBack} />
        ) : option === "phar" ? (
          <PreferredPharmacies goBack={handleGoBack} />
        ) : null}
      </Transition>
    </div>
  );
}

export function WidgetAutomationOptions({ isLoggedIn, onClick, ...props }) {
  return (
    <div className="tw-font-sans">
      <div>
        <h2 className="tw-text-xl tw-font-medium tw-text-gray-800 tw-m-0 tw-p-0">
          Automations
        </h2>
        <p className="tw-text-lg tw-text-gray-700">
          Replace tedious repetitive tasks with a single click
        </p>
      </div>
      <hr className="tw-my-6" />
      <div>
        {automations.map((automation, i) => {
          return (
            <div
              key={i}
              className={classNames(
                isLoggedIn === false && automation.premium === true
                  ? "tw-bg-gray-100 tw-border-2 tw-border-blue-1000"
                  : "tw-bg-gray-50 hover:tw-bg-gray-200",
                "tw-min-w-[600px] tw-relative tw-p-8 tw-my-8 tw-rounded-lg tw-shadow-md tw-flex tw-justify-between tw-items-center  tw-cursor-pointer"
              )}
              onClick={() => onClick(automation.value)}
            >
              <div className="tw-cursor-pointer">
                <span
                  className={classNames(
                    "tw-flex tw-text-base  tw-font-normal tw-mb-4 tw-items-center tw-w-full",
                    isLoggedIn === false && automation.premium === true
                      ? "tw-text-gray-700"
                      : "tw-text-gray-700"
                  )}
                >
                  <span>{automation.icon}</span>
                  {automation.name}
                </span>
                <p
                  className={classNames(
                    "tw-text-base tw-text-gray-700 tw-max-w-[300px] tw-opacity-80",
                    automation.premium === true
                      ? "tw-text-gray-700"
                      : "tw-text-gray-700"
                  )}
                >
                  {automation.description}
                </p>
              </div>
              <div className="tw-px-4 tw-cursor-pointer">
                <ArrowRightIcon className="tw-w-8 tw-h-8 tw-text-gray-600" />
              </div>
              {isLoggedIn === false && automation.premium === true ? (
                <div className="tw-absolute tw-top-[-5px] tw-right-[-5px] tw-rounded-xl tw-p-2 tw-bg-blue-1000 tw-shadow-md">
                  <p className="tw-text-sm tw-text-gray-50 tw-font-normal">
                    <StarIcon className="tw-inline-block tw-mr-1 tw-w-4 tw-h-4 tw-text-white"></StarIcon>
                    Requires Login
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}