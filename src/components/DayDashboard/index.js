import React, {Component} from 'react';
import { SelectorDot, SelectorDotsGroup, Button, SectionHeader } from './style';
import {activeDayService, goalTrackerService} from '../../Dependencies/dependencyList';

export class DayDashboard extends Component{
    constructor(props){
        super(props);
        this.goalTrackerService = goalTrackerService;
        this.activeDayService = activeDayService;
        this.goalTrackerService.addObserver(this);
        this.activeDayService.addObserver(this);
        this.state = {
            inputValue: '',
            selectedDot: null,
            activeDay: 0,
            todayGoals: null,
            activeDayKudos: null,
            tomorrowGoals: null,
        }
    }

    updateInputValue = (e) =>{
        this.setState({
            inputValue: e.target.value,
        });
    }

    selectorDotClicked = (e) =>{
        this.setState({
            selectedDot: e.target.id,
        });
    }

    createButtonClicked = () =>{
        if(this.state.inputValue !== '' && this.state.selectedDot){
            const activeDay = this.activeDayService.getActiveDay();
            if(this.state.selectedDot === 'kudos' || this.state.selectedDot === 'todayGoals'){
                const type = this.state.selectedDot === 'todayGoals' ? 'goals': this.state.selectedDot;
                this.goalTrackerService.updateGoalData(activeDay, type, this.state.inputValue);
            }else{
                const tomorrowDay = (activeDay + 1) % 7;
                this.goalTrackerService.updateGoalData(tomorrowDay, 'goals', this.state.inputValue);
            }
        }
        this.setState({
            inputValue: '',
            selectedDot: null
        })
    }

    activeDayUpdated = () =>{
        const activeDay = this.activeDayService.getActiveDay();
        this.setState({
            activeDay: activeDay,
        });
        this.goalDataUpdated();
    }

    goalDataUpdated = () =>{
        const activeDay = this.activeDayService.getActiveDay();
        const goals = this.goalTrackerService.getGoalData();
        const tomorrow = (activeDay + 1) % 7;

        const todayGoals = Object.entries(goals)[activeDay][1]["goals"];
        const activeDayKudos = Object.entries(goals)[activeDay][1]["kudos"];
        const tomorrowGoals = Object.entries(goals)[tomorrow][1]["goals"];
        this.setState({
            todayGoals: todayGoals,
            activeDayKudos: activeDayKudos,
            tomorrowGoals: tomorrowGoals,
        });
    }

    isButtonDisabled = () =>{
        return (this.state.inputValue === '' || !this.state.selectedDot);
    }

    getSubmitButtonStyle = () =>{
        if(this.isButtonDisabled()){
            return {'background-color': '#bbb', 'border': '2px solid #bbb'};
        }else{
            return {'background-color': 'DodgerBlue'};
        }
    }

    getSelectorDotStyle = (selectorDot) =>{
        if(this.state.selectedDot === selectorDot){
            return {'background-color': 'DodgerBlue'};
        }else{
            return {'background-color': '#bbb'};
        }
    }

    createNewWeek = () =>{
        this.goalTrackerService.createNewWeek();
    }

    render(){
        return(
            <div>
                <SectionHeader>
                    Add New Goals/Personal Props!                 
                    <Button className="discard" onClick={this.createNewWeek}>New Week</Button>
                </SectionHeader>
                <label>
                    <span>
                        New Point:
                        <input value={this.state.inputValue} onChange={this.updateInputValue}/>                       
                        <Button disabled={this.isButtonDisabled()} style={this.getSubmitButtonStyle()} onClick={this.createButtonClicked}>Create</Button>
                    </span>
                </label>
                <SelectorDotsGroup>
                    <SelectorDot id="todayGoals" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('todayGoals')}/>
                    <div>Today's Goals</div>
                    <SelectorDot id="kudos" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('kudos')}/>
                    <div>Kudos</div>
                    <SelectorDot id="tmrGoals" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('tmrGoals')}/>
                    <div>Tomorrow's Goals</div>
                </SelectorDotsGroup>
                <SectionHeader>Today's Goals...</SectionHeader>
                {this.state.todayGoals ? this.state.todayGoals.map((goal) => <h1>{goal}</h1>): null}
                <SectionHeader>Kudos to me for...</SectionHeader>
                {this.state.activeDayKudos ? this.state.activeDayKudos.map((kudos) => <h1>{kudos}</h1>): null}
                <SectionHeader>Tomorrow's Goals...</SectionHeader>
                {this.state.tomorrowGoals ? this.state.tomorrowGoals.map((goal) => <h1>{goal}</h1>): null}

            </div>
        );
    }
}