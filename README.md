# SLA Management Prototype

## Objective: Give users a clear understanding of which SLAs apply to a Case, e.g. when deadlines are approaching, and what actions need to be taken.

### Task: Create a lightweight system that

- models SLAs
- applies them automatically

## Assumptions

- All Cases must meet SLAs (no Record Type or other criteria must be met)
- Resolution SLA starts from the time the Case was opened, NOT from the time the First Response SLA was satisfied

## Approach

- use OOTB Entitlements/SLA features

- use the standard picklist field on Case, `Priority` to determine SLA priority
- use a custom `VIP__c` checkbox field on Account to determine VIP status
- use standard fields `SlaStartDate` and `SlaExitDate`
  - upon Case creation, set `SlaStartDate` to Case creation datetime
    - set `SlaExitDate` to 1/4/8 hours from start date, depending on priority
  - once the First Response SLA window has passed (or once the customer has been responded to via Chatter), set `SlaExitDate` to the Resolution SLA time
    - keep `SlaStartDate` the same
    - display a LWC (data table) on the Case that shows SLA status/actions
