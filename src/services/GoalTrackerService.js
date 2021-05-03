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
        this.observers.forEach((o) => o.goalDataUpdated());
    }

    updateGoalData(dayIndex, type, dataEntry){
        Object.entries(this.data)[dayIndex][1][type].push(dataEntry);
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
        this.notifyObservers();
    }
}