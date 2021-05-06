import ActiveDayService from '../services/ActiveDayService';
import GoalTrackerService from '../services/GoalTrackerService';
import StoreService from '../services/StoreService';

export const storeService = new StoreService();
export const activeDayService = new ActiveDayService();
export const goalTrackerService = new GoalTrackerService();