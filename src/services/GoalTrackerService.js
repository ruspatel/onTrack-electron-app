import {storeService} from '../Dependencies/dependencyList';

export default class GoalTrackerService{
    constructor(){
        this.storeService = storeService;
        this.observers = [];
        this.data={
            "Sunday": {
                "goals": [],
                "kudos": []
            },
            "Monday": {
                "goals": [],
                "kudos": []
            },
            "Tuesday": {
                "goals": [],
                "kudos": []
            },
            "Wednesday": {
                "goals": [],
                "kudos": []
            },
            "Thursday": {
                "goals": [],
                "kudos": []
            },
            "Friday": {
                "goals": [],
                "kudos": []
            },
            "Saturday": {
                "goals": [],
                "kudos": []
            },
        }
        this.initializeData();
    }

    initializeData(){
        if(this.storeService.getStoreSize() === 0){
            return;
        }
        this.data = this.storeService.getStoreData();
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(){
        this.observers.forEach((o) => o.goalDataUpdated());
    }

    makeGoalEntry(dayIndex, type, dataEntry){
        Object.entries(this.data)[dayIndex][1][type].push(dataEntry);
        this.storeService.updateStoreData(this.data);
        this.notifyObservers();
    }

    goalEntryRemoved(dayIndex, type, entryIndex){        
        Object.entries(this.data)[dayIndex][1][type].splice(entryIndex, 1);
        this.storeService.updateStoreData(this.data);
        this.notifyObservers();
    }

    getGoalData(){
        return this.data;
    }

    createNewWeek(){
        for (let [key, value] of Object.entries(this.data)) {
            for(let [keyDay, valueDay] of Object.entries(value)){
                valueDay.length = 0;
            }
        }
        this.storeService.clearStore();
        this.notifyObservers();
    }
}