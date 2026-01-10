# SLA Management Prototype

## Objective: Give users a clear understanding of which SLAs apply to a Case, e.g. when deadlines are approaching, and what actions need to be taken.

### Task: Create a lightweight system that

- models SLAs
- applies them automatically

## Assumptions

- All Cases must meet SLAs (no Record Type or other criteria must be met)
- Resolution SLA starts from the time the Case was opened, NOT from the time the First Response SLA was satisfied

## Approach

- TODO: add column that shows the due date (datetime)
- TODO: add refresh button to show updated due dates
- TODO: add `Status` column that calculates/displays:
  - `On Track` (Blue)
  - `Approaching Breach` (Yellow)
  - `Breached` (Red)
  - `Completed` (Green)

- TODO: pull down the following Flows and commit them to the repo
  - `First Response SLA Flow`
  - `Resolution Time SLA Flow`
  - `Assign Entitlement`

- TODO: update page layouts to remove any but the necessary fields

- TODO: create `lightning-datatable` to display at the top of the layout
  - for each milestone, color-code based on "on-track", "approaching breach" or "breached"
  - provide "mark complete" action for each Milestone

- use the standard `Priority` picklist field on Case to determine SLA priority
- use standard `CustomerPriority__c` field on Account with a value of `VIP` to determine VIP status
- use standard `Status` field with added custom value `Responded`, which is used to determine the First Response SLA

- use OOTB Entitlements/Milestones/SLA features
  - Entitlement: `Standard Case`
    - Flow: `Assign Entitlement`
  - Milestone: `First Response to Customer`
    - Flow: `First Response SLA Flow` marks the Milestone as complete when the Case is put into a `Responded` Status
  - Milestone: `Resolution`
    - Flow: `Resolution Time SLA Flow` marks the Milestone as complete when the Case is put into a `Resolved` Status
  - for both Milestones, check the `Enable Apex class for time trigger (minutes)` checkbox to use the custom calculation
    - Apex class: `FirstResponseMilestoneCalculator`
    - Apex class: `ResolutionMilestoneCalculator`
