public with sharing class SLA_Controller {
  @AuraEnabled
  public static List<CaseMilestone> getMilestones(String caseId) {
    try {
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
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static void completeMilestone(String caseId, String milestoneName) {
    try {
      Case c = [
        SELECT Id, Status
        FROM Case
        WHERE Id = :caseId
        LIMIT 1
      ];

      if (milestoneName == 'First Response') {
        c.Status = 'Responded';
      } else if (milestoneName == 'Resolution') {
        c.Status = 'Resolved';
      }

      update c;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
