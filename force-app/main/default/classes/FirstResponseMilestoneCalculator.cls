global with sharing class FirstResponseMilestoneCalculator implements Support.MilestoneTriggerTimeCalculator {
  private static final String HIGH_PRIORITY = 'High';
  private static final String MEDIUM_PRIORITY = 'Medium';
  private static final String LOW_PRIORITY = 'Low';

  private static final Map<String, Integer> PRIORITY_TO_MINUTES = new Map<String, Integer>{
    HIGH_PRIORITY => 60, // 1 hour
    MEDIUM_PRIORITY => 240, // 4 hours
    LOW_PRIORITY => 480 // 8 hours
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
