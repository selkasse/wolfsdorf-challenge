import LightningDatatable from "lightning/datatable";
import milestoneStatusTemplate from "./milestoneStatusTemplate.html";

export default class CustomSlaTable extends LightningDatatable {
  static customTypes = {
    milestoneStatus: {
      template: milestoneStatusTemplate,
      standardAttributes: ["value"]
    }
  };
}
