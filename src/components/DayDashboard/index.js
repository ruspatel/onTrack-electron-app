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
            this.goalTrackerService.updateGoalData(activeDay, this.state.selectedDot, this.state.inputValue);
        }
        this.setState({
            inputValue: '',
            selectedDot: null
        })
    }

    activeDayUpdated = () =>{}

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

    render(){
        return(
            <div>
                <SectionHeader>Add New Goals/Personal Props!</SectionHeader>
                <label>
                    <span>
                        New Point:
                        <input value={this.state.inputValue} onChange={this.updateInputValue}/>                       
                        <Button disabled={this.isButtonDisabled()} style={this.getSubmitButtonStyle()} onClick={this.createButtonClicked}>Create</Button>
                    </span>
                </label>
                <SelectorDotsGroup>
                    <SelectorDot id="kudos" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('kudos')}/>
                    <div>kudos</div>
                    <SelectorDot id="goals" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('goals')}/>
                    <div>Tomorrow's Goals</div>
                </SelectorDotsGroup>
                <SectionHeader>Yesterday's Goals...</SectionHeader>
                <SectionHeader>Kudos to me for...</SectionHeader>
                <SectionHeader>Tomorrow's Goals...</SectionHeader>
            </div>
        );
    }
}