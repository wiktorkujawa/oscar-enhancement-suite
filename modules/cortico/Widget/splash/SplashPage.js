import Button from "../../../core/Button";
import corticoIcon from "../../../../resources/icons/logo-dark-blue.svg";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
import SplashBg from "../../../../resources/illustrations/splash-bg.jpg";

export default function SplashPage() {
  return (
    <div className="tw-font-sans tw-absolute tw-inset-0 tw-bg-gray-100 tw-flex tw-rounded-xl tw-z-10005 tw-border-white tw-text-gray-800 tw-flex-col">
      <div className="tw-max-h-[700px] tw-overflow-y-auto tw-p-6">
        <div className="tw-flex tw-w-full tw-items-center ">
          <div className="tw-flex-grow">
            {" "}
            <img
              src={corticoIcon}
              alt="Cortico"
              className="tw-w-[30px] tw-h-[30px] tw-inline-block"
            />
            <span className=" tw-tracking-wide tw-text-gray-900 tw-inline-block tw-mx-2 tw-text-xs">
              Oscar Enhancement Suite
            </span>
          </div>

          <div className="tw-flex tw-space-x-1 tw-items-center">
            <p className="tw-text-sm tw-font-bold">Get Started</p>
            <ArrowSmRightIcon className="tw-w-5 tw-h-5 tw-mr-3" />
            <Button
              size="sm"
              className="tw-bg-transparent tw-text-gray-900 tw-text-xs tw-rounded-md tw-border tw-border-gray-400"
              variant="custom"
            >
              <span className="tw-flex tw-items-center tw-cursor-pointer">
                <span className="tw-cursor-pointer">Free User</span>
              </span>
            </Button>
            <Button
              size="sm"
              className="tw-bg-indigo-100 tw-text-blue-1000 tw-text-xs tw-rounded-md "
              variant="custom"
            >
              <span className="tw-flex tw-items-center tw-cursor-pointer">
                <span className="tw-cursor-pointer">Premium User</span>
              </span>
            </Button>
          </div>
        </div>
        <div
          className="tw-relative tw-mt-8 tw-min-h-[280px] tw-h-[280px] tw-bg-center tw-bg-no-repeat tw-bg-cover tw-rounded-xl"
          style={{
            backgroundImage: 'url("' + SplashBg + '")',
          }}
        >
          <div className="tw-absolute tw-inset-0 tw-p-4 tw-bg-indigo-800 tw-bg-opacity-70  tw-rounded-xl tw-shadow-md">
            <p className="tw-text-3xl tw-text-center tw-font-semibold tw-text-white tw-mt-8 tw-max-w-[350px] tw-mx-auto">
              Enhance your <span className="tw-text-cyan-400">Oscar</span>{" "}
              experience. Save Time.
            </p>
            <p className="tw-text-sm tw-text-center tw-mx-auto tw-max-w-[450px] tw-mt-3 tw-text-white">
              Send{" "}
              <span className="tw-text-cyan-300 tw-font-semibold tw-underline">
                messages
              </span>{" "}
              to your patients with attachments,{" "}
              <span className="tw-text-cyan-300 tw-font-semibold tw-underline">
                automate
              </span>{" "}
              tedious tasks, set preferred pharmacies, and more.
            </p>
            <div className="tw-flex tw-space-x-3 tw-items-center tw-justify-center tw-mt-8">
              <Button
                size="sm"
                className="tw-bg-indigo-900 tw-text-white tw-text-xs tw-rounded-md tw-p-2 tw-shadow-lg tw-border-white tw-border tw-border-opacity-50"
                variant="custom"
              >
                <span className="tw-flex tw-items-center tw-cursor-pointer">
                  <span className="tw-cursor-pointer">Sign Up</span>
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className=" tw-mx-auto tw-mt-12">
          <p className="tw-text-center tw-text-gray-700 tw-font-semibold tw-text-2xl tw-max-w-[350px] tw-mx-auto">
            "Big workflow saving so many, thanks!"
          </p>
          <p className="tw-text-left tw-text-gray-600 tw-text-sm tw-mt-4 tw-italic tw-max-w-[400px] tw-mx-auto">
            I introduced the messenger feature to the docs and they all love it!
            The MOAs do too - one physician who usually creates a large number
            of ticklers had created just one as the rest were dealt with through
            email/sms I introduced the messenger feature to the docs and they
            all love it!
          </p>
          <p className="tw-text-right tw-text-gray-800 tw-text-sm tw-mt-6 tw-max-w-[400px] tw-mx-auto">
            - Dan Earl-Gray
          </p>
          <p className="tw-text-right tw-text-gray-600 tw-text-sm tw-italic tw-max-w-[400px] tw-mx-auto">
            Practice Manager at Seawatch Medical Clinic
          </p>
        </div>
      </div>
    </div>
  );
}
