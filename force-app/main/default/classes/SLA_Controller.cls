public with sharing class SLA_Controller {
  @AuraEnabled
  public static List<CaseMilestone> getMilestones(String caseId) {
    return [
      SELECT
        Id,
        ElapsedTimeInHrs,
        TimeRemainingInHrs,
        TimeRemainingInMins,
        MileStoneType.Id,
        MilestoneType.Name,
        TargetDate,
        CompletionDate,
        IsCompleted
      FROM CaseMilestone
      WHERE CaseId = :caseId
    ];
  }
}
