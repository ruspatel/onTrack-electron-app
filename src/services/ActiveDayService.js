
export default class ActiveDayService{
    constructor(){
        this.observers = [];
        const date = new Date();
        this.currentDay = date.getDay();
        this.activeDay = this.currentDay;
    }

    addObserver(observer){
        this.observers.push(observer);
    }

    updateActiveDay = (activeDay) =>{
        this.activeDay = activeDay;
        this.notifyObservers();
    }
    
    notifyObservers(){
        this.observers.forEach((o) => o.activeDayUpdated());
    }

    getActiveDay = () =>{
        return this.activeDay;
    }

    getCurrentDay = () =>{
        return this.currentDay;
    }





}