import { LightningElement, api } from "lwc";
import getMilestones from "@salesforce/apex/SLA_Controller.getMilestones";

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
  { label: "Time Left (Hours: Minutes)", fieldName: "TimeRemainingInHrs" }
];

// const actions = [
//     { label: 'Show details', name: 'show_details' },
//     { label: 'Delete', name: 'delete' }
// ];

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
}
