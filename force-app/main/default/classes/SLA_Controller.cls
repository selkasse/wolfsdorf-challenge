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
    System.debug(
      'Completing milestone: ' + milestoneName + ' for Case Id: ' + caseId
    );
    try {
      Case c = [
        SELECT Id, Status
        FROM Case
        WHERE Id = :caseId
        LIMIT 1
      ];

      if (milestoneName == 'First Response') {
        System.debug('Setting Case Status to Responded');
        c.Status = 'Responded';
      } else if (milestoneName == 'Resolution') {
        System.debug('Setting Case Status to Resolved');
        c.Status = 'Resolved';
      }

      update c;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
