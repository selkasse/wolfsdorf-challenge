# SLA Management Prototype

## Objective: Give users a clear understanding of which SLAs apply to a Case, e.g. when deadlines are approaching, and what actions need to be taken.

### Task: Create a lightweight system that

- models SLAs
- applies them automatically

## Assumptions

- All Cases must meet SLAs (no Record Type or other criteria must be met)
- Resolution SLA starts from the time the Case was opened, NOT from the time the First Response SLA was satisfied

## Approach

- use OOTB Entitlements/Milestones/SLA features
  - Entitlement: `Standard Case`
  - Milestone: `First Response to Customer`
  - Milestone: `Resolution`
  - for both Milestones, check the `Enable Apex class for time trigger (minutes)` checkbox to use the custom calculation
    - Apex class: `FirstResponseMilestoneCalculator`
    - Apex class: `ResolutionMilestoneCalculator`

- use the standard picklist field on Case, `Priority` to determine SLA priority
- use standard `CustomerPriority__c` field on Account with a value of `VIP` to determine VIP status
- use standard `Status` field with added custom value `Responded`, which is used to determine the First Response SLA
