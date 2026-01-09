import { LightningElement, api } from "lwc";
import getMilestones from "@salesforce/apex/SLA_Controller.getMilestones";

const columns = [
  { label: "Milestone", fieldName: "MilestoneName" },
  { label: "Hours Left", fieldName: "TimeRemainingInHrs" }
];

export default class SlaDatatable extends LightningElement {
  @api recordId;

  milestones = [];
  columns = columns;

  connectedCallback() {
    console.log("Record Id: " + this.recordId);
    if (this.milestones.length === 0) {
      getMilestones({ caseId: this.recordId })
        .then((result) => {
          //   this.data = result;
          //   console.log("Data: " + JSON.stringify(this.data));
          this.milestones = result.map((row) => {
            return {
              ...row,
              // Create a new property at the top level
              MilestoneName: row.MilestoneType ? row.MilestoneType.Name : ""
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching milestones: ", error);
        });
    }
  }
}
