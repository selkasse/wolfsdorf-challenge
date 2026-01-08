global with sharing class ResolutionMilestoneCalculator implements Support.MilestoneTriggerTimeCalculator {
  private static final String HIGH_PRIORITY = 'High';
  private static final String MEDIUM_PRIORITY = 'Medium';
  private static final String LOW_PRIORITY = 'Low';

  private static final Map<String, Integer> PRIORITY_TO_MINUTES = new Map<String, Integer>{
    HIGH_PRIORITY => 1440, // 24 hours
    MEDIUM_PRIORITY => 4320, // 72 hours
    LOW_PRIORITY => 7200 // 120 hours
  };

  global Integer calculateMilestoneTriggerTime(
    String caseId,
    String milestoneTypeId
  ) {
    Case c = [
      SELECT Id, CreatedDate, Priority, Account.CustomerPriority__c
      FROM Case
      WHERE Id = :caseId
      LIMIT 1
    ];
    Integer baseMinutes = PRIORITY_TO_MINUTES.get(c.Priority);
    Boolean isVIP = c.Account.CustomerPriority__c == 'VIP';
    return (Integer) (baseMinutes * (isVIP ? 0.5 : 1)).intValue();
  }
}
