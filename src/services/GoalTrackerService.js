export default class GoalTrackerService{
    constructor(){
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
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    notifyObservers(){
        this.notifyObservers.forEach((o) => o.goalDataUpdated());
    }

    updateGoalData(dayIndex, type, dataEntry){
        Object.entries(this.data)[dayIndex][1][type].push(dataEntry);
    }
}