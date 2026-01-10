public with sharing class SLA_Controller {
  @AuraEnabled
  public static List<CaseMilestone> getMilestones(String caseId) {
    return [
      SELECT Id, TimeRemainingInHrs, TimeRemainingInMins, MilestoneType.Name
      FROM CaseMilestone
      WHERE CaseId = :caseId
    ];
  }
}
