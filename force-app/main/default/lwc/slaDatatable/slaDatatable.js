import { LightningElement, api } from "lwc";
import getMilestones from "@salesforce/apex/SLA_Controller.getMilestones";
import completeMilestone from "@salesforce/apex/SLA_Controller.completeMilestone";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

const ACTIONS = [{ label: "Complete Milestone", name: "complete" }];
const columns = [
  {
    label: "Milestone",
    fieldName: "MilestoneUrl", // This points to the URL string
    type: "url",
    typeAttributes: {
      label: { fieldName: "MilestoneName" }, // This displays the Name as the link text
      target: "_blank"
    }
  },
  {
    label: "Target Date",
    fieldName: "TargetDate",
    type: "date", // Use "date" type; it handles datetime values
    typeAttributes: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true // This gives you the AM/PM format
    }
  },
  {
    label: "Completion Date",
    fieldName: "CompletionDate",
    type: "date", // Use "date" type; it handles datetime values
    typeAttributes: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true // This gives you the AM/PM format
    }
  },
  { label: "Time Left (Hours: Minutes)", fieldName: "TimeRemainingInHrs" },
  {
    type: "action",
    typeAttributes: { rowActions: ACTIONS }
  }
];

export default class SlaDatatable extends LightningElement {
  @api recordId;

  milestones = [];
  columns = columns;

  connectedCallback() {
    if (this.milestones.length === 0) {
      this.getData();
    }
  }
  handleRefresh(event) {
    console.log(event);
    this.getData();
  }

  getData() {
    getMilestones({ caseId: this.recordId })
      .then((result) => {
        this.milestones = result.map((row) => {
          return {
            ...row,
            // 1. Create the link path
            MilestoneUrl: `/lightning/r/CaseMilestone/${row.Id}/view`,

            // 2. Extract the Name for the label
            MilestoneName: row.MilestoneType ? row.MilestoneType.Name : "",

            // 3. Optional: Clean up the display time
            TimeRemaining: `${row.TimeRemainingInHrs}:${row.TimeRemainingInMins}`
          };
        });
      })
      .catch((error) => {
        console.error("Error fetching milestones: ", error);
      });
  }

  handleRowAction(event) {
    const actionName = event.detail.action.name;
    const row = event.detail.row;

    if (actionName === "complete") {
      this.completeSLA(row);
    }
  }

  completeSLA(row) {
    // Use the flattened MilestoneName to decide the logic in Apex
    console.log("Completing milestone:", row.MilestoneName);
    completeMilestone({
      caseId: this.recordId,
      milestoneName: row.MilestoneName
    })
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: `${row.MilestoneName} updated via Case Status`,
            variant: "success"
          })
        );
        return this.getData(); // Refresh the table
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
