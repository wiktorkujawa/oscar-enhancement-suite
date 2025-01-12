import classNames from "classnames";
import {
  ChevronDoubleRightIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";

export default function GridList({ actions, onClick, ...props }) {
  return (
    <div className="tw-rounded-lg tw-bg-gray-200 tw-overflow-hidden tw-shadow tw-divide-y tw-divide-gray-200 sm:tw-divide-y-0 sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-px">
      {actions.map((action, actionIdx) => (
        <div
          onClick={() => onClick(action.value)}
          key={action.id}
          className={classNames(
            actionIdx === 0
              ? "tw-rounded-tl-lg tw-rounded-tr-lg sm:tw-rounded-tr-none"
              : "",
            actionIdx === 1 ? "sm:tw-rounded-tr-lg" : "",
            actionIdx === actions.length - 2 ? "sm:tw-rounded-bl-lg" : "",
            actionIdx === actions.length - 1
              ? "tw-rounded-bl-lg tw-rounded-br-lg sm:tw-rounded-bl-none"
              : "",
            "tw-relative tw-group tw-bg-white tw-p-6 focus-within:tw-ring-2 focus-within:tw-ring-inset focus-within:tw-ring-indigo-500",
            "hover:tw-bg-gray-100 tw-transition-colors tw-duration-500"
          )}
        >
          <div className="tw-flex tw-items-start">
            <span>{action.icon}</span>
          </div>

          <div className="tw-h-[35px] tw-overflow-hidden tw-mt-2">
            {action.premium === true ? (
              <div className="tw-bg-gray-50  tw-text-gray-700 tw-inline-block tw-text-2xs tw-font-medium tw-px-2 tw-py-1 tw-rounded-md tw-border">
                <ExclamationCircleIcon className="tw-inline-block tw-text-red-300 tw-w-4 tw-h-4 tw-mr-1" />{" "}
                Sign In Required
              </div>
            ) : null}
          </div>

          <div className="tw-mt-2">
            <p className="tw-text-lg tw-font-normal">
              <a href={action.href} className="focus:tw-outline-none">
                {/* Extend touch target to entire panel */}
                <span className="tw-absolute tw-inset-0" aria-hidden="true" />
                {action.name}
              </a>
            </p>
            <p className="tw-mt-2 tw-text-sm tw-text-gray-500">
              {action.description}
            </p>
          </div>

          <ChevronDoubleRightIcon className="tw-pointer-events-none tw-absolute tw-top-6 tw-right-6 tw-text-gray-300 group-hover:tw-text-gray-400 tw-w-6 tw-h-6 tw-transform tw-rotate-[-45deg]" />
        </div>
      ))}
    </div>
  );
}
