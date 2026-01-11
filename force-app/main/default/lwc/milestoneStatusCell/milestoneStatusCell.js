import { LightningElement, api } from "lwc";

export default class MilestoneStatusCell extends LightningElement {
  @api value; // This will receive the 'status' string calculated in the main LWC

  get statusText() {
    return this.value || "Unknown";
  }

  get badgeClass() {
    const base = "slds-badge ";
    switch (this.value) {
      case "Complete":
        return base + "slds-theme_success"; // Green
      case "Breached":
        return base + "slds-theme_error"; // Red
      case "Approaching Breach":
        return base + "slds-theme_warning"; // Yellow
      case "On Track":
        return base + "slds-theme_info"; // Blue
      default:
        return base;
    }
  }
}
