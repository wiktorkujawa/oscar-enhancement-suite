import { useEffect, useState } from "preact/hooks";
import { nanoid } from "nanoid";
import Select from "../base/Select";
import Checkbox from "../base/Checkbox";

const mediums = [
  {
    value: "phone",
    label: "Phone",
    id: nanoid(),
  },
  {
    value: "clinic",
    label: "Clinic",
    id: nanoid(),
  },
  {
    value: "virtual",
    label: "Virtual",
    id: nanoid(),
  },
  {
    value: "",
    label: "None",
    id: nanoid(),
  },
  {
    value: "quiet",
    label: "Quiet",
    id: nanoid(),
  },
];

const getResourceFieldString = (medium, workflow) => {
  return `${medium === "placeholder" ? "" : medium}|${
    workflow === "placeholder" ? "" : workflow
  }`;
};

export default function SetupResources({
  resourcesField,
  resourcesContainer,
  workflowSlugs,
  ...props
}) {
  const [medium, setMedium] = useState(() => {
    if (!resourcesField?.value) {
      return localStorage.getItem("medium-option") || "placeholder";
    }
    return "placeholder";
  });
  const [workflow, setWorkflow] = useState("placeholder");
  const [textField, setTextField] = useState(false);
  const [slugs, setSlugs] = useState([]);

  useEffect(() => {
    if (resourcesField) {
      if (resourcesField.value.includes("|")) {
        const [medium, workflow] = resourcesField.value.split("|");
        const existingMedium = mediums.find((m) => m.value === medium);
        const existingWorkflow = workflowSlugs.find(
          (w) => w.value === workflow
        );

        console.log(
          "Existing Medium, existig workingflow",
          existingMedium,
          existingWorkflow
        );
        setMedium(existingMedium?.value);
        setWorkflow(existingWorkflow?.value);
      }
    }
  }, [resourcesField]);

  useEffect(() => {
    if (resourcesField) {
      resourcesField.value = getResourceFieldString(medium, workflow);
      resourcesField.setAttribute(
        "value",
        getResourceFieldString(medium, workflow)
      );
    }
  }, [medium, workflow]);

  useEffect(() => {
    if (textField === false) {
      resourcesField.style.display = "none";
    } else {
      resourcesField.style.display = "block";
    }
  }, [textField]);

  useEffect(() => {
    console.log("Workflow slugs", workflowSlugs);
    if (workflowSlugs) {
      setSlugs(
        workflowSlugs.map((wf) => {
          return {
            value: wf.slug,
            label: wf.name,
            id: wf.slug,
          };
        })
      );
    }
  }, [workflowSlugs]);
  return (
    <div className="tw-p-4 tw-font-sans">
      <div className="tw-bg-gray-100 tw-p-2 tw-rounded-md tw-shadow-lg tw-flex tw-flex-col tw-space-y-3">
        <div>
          <Select
            label="Medium"
            className="tw-bg-white tw-text-gray-700"
            options={mediums}
            onChange={(val) => setMedium(val)}
            defaultValue={medium}
            placeholder={true}
            placeholderText="Select a Medium"
            value={medium}
          ></Select>
        </div>
        <div>
          <Select
            label="Workflow"
            className="tw-bg-white tw-text-gray-700 "
            options={slugs}
            onChange={(val) => setWorkflow(val)}
            defaultValue={workflow}
            placeholderText="Select a Workflow"
            placeholder={true}
            value={workflow}
          ></Select>
        </div>
        <div className="tw-block">
          <Checkbox
            className="tw-border"
            label="Show Text Field"
            checked={textField}
            onChange={(isChecked) => setTextField(isChecked)}
            defaultChecked={textField}
          />
        </div>
      </div>
    </div>
  );
}
