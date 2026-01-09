public with sharing class SLA_Controller {
  @AuraEnabled(cacheable=true)
  public static List<CaseMilestone> getMilestones(String caseId) {
    return [
      SELECT Id, TimeRemainingInHrs, TimeRemainingInMins, MilestoneType.Name
      FROM CaseMilestone
      WHERE CaseId = :caseId
    ];
  }
}
