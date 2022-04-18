import Header from "./base/Header";
import { useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";
import classNames from "classnames";
import Button from "../../core/Button";

export default function WidgetPatient() {
  const patient = useSelector((state) => state.patient);
  const { clinic_name } = useSelector((state) => state.app);

  const handleRecall = () => {
    window.open(
      `https://${localStorage.getItem("clinicname")}.${localStorage.getItem(
        "customUrlSuffix"
      )}/invite-patient-booking/?demographic_no=${patient.demographicNo}`
    );
  };

  return (
    <div className="tw-font-sans tw-p-4">
      <>
        <Header
          title="Patient"
          desc="See information about the patient and execute actions"
        ></Header>
        <hr className="tw-my-4" />
        {isEmpty(patient) ? (
          <div>Empty</div>
        ) : (
          <>
            <div className="tw-mb-4">
              <Button
                onClick={handleRecall}
                size="xs"
                className="tw-bg-indigo-100 tw-text-blue-1000 tw-text-sm  tw-rounded-md tw-font-medium "
                variant="custom"
              >
                <span className="tw-flex tw-items-center tw-cursor-pointer">
                  <span className="tw-cursor-pointer">Recall Patient</span>
                </span>
              </Button>
            </div>

            <div className="tw-space-y-5">
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>First Name</Dt>
                  <Dd>{patient["First Name"]}</Dd>
                </div>
                <div>
                  <Dt>Last Name</Dt>
                  <Dd>{patient["Last Name"]}</Dd>
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>Email Address</Dt>
                  <Dd>{patient["email"]}</Dd>
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>Phone (Home)</Dt>
                  <Dd>{patient["PhoneHHistory"] || "N/A"}</Dd>
                </div>
                <div>
                  <Dt>Phone (Work)</Dt>
                  <Dd>{patient["PhoneWHistory"] || "N/A"}</Dd>
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>Phone (Cell)</Dt>
                  <Dd>{patient["Cell PhoneHistory"] || "N/A"}</Dd>
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>Sex</Dt>
                  <Dd>{patient["Sex"] || "N/A"}</Dd>
                </div>
                <div>
                  <Dt>Status</Dt>
                  <Dd>{patient["Patient Status"] || "N/A"}</Dd>
                </div>
              </div>
              <div className="tw-grid tw-grid-cols-2 tw-gap-2">
                <div>
                  <Dt>Age</Dt>
                  <Dd>{patient["Age"] || "N/A"}</Dd>
                </div>
                <div>
                  <Dt>Health Card Type</Dt>
                  <Dd>{patient["Health Card Type"] || "N/A"}</Dd>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}

function Dt({ className, ...props }) {
  return (
    <dt
      className={classNames(
        "tw-text-sm tw-font-medium tw-text-gray-500",
        className
      )}
    >
      {props.children}
    </dt>
  );
}

function Dd({ className, ...props }) {
  return (
    <dd className={classNames("tw-text-sm tw-text-gray-900", className)}>
      {props.children}
    </dd>
  );
}
