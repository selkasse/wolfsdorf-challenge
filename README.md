# SLA Management Prototype

## Objective: Give users a clear understanding of which SLAs apply to a Case, e.g. when deadlines are approaching, and what actions need to be taken.

### Task: Create a lightweight system that

- models SLAs
- applies them automatically

## Approach

- use the standard picklist field on Case, `Priority`
- use standard fields `SlaStartDate` and `SlaExitDate`
  - upon Case creation, set `SlaStartDate` to Case creation datetime
    - set `SlaExitDate` to 1/4/8 hours from start date, depending on priority
  - once the First Response SLA window has passed (or once the customer has been responded to via Chatter), set `SlaExitDate` to the Resolution SLA time
    - keep `SlaStartDate` the same (assumption: Resolution SLA starts from the time the Case was opened, NOT from the time the First Response SLA was satisfied)
- display a LWC (data table) on the Case that shows SLA status/actions
