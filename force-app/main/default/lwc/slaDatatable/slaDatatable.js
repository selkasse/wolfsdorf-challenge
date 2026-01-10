import { LightningElement, api } from "lwc";
import getMilestones from "@salesforce/apex/SLA_Controller.getMilestones";

const columns = [
  { label: "Milestone", fieldName: "MilestoneName" },
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
            MilestoneName: row.MilestoneType ? row.MilestoneType.Name : ""
          };
        });
      })
      .catch((error) => {
        console.error("Error fetching milestones: ", error);
      });
  }
}
