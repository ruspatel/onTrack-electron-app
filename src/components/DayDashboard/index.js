import React, {Component} from 'react';
import { SelectorDot, SelectorDotsGroup, Button, SectionHeader, Section, SectionContent, GoalEntry, StyledList, StyledListItem } from './style';
import {activeDayService, goalTrackerService} from '../../Dependencies/dependencyList';

const sectionNames = {
    todayGoals: 'todayGoals',
    activeDayKudos: 'kudos',
    tomorrowGoals: 'tmrGoals'
};

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
            activeDay: this.activeDayService.getActiveDay(),
            todayGoals: null,
            activeDayKudos: null,
            tomorrowGoals: null,
        }
    }

    componentDidMount = () =>{
        this.goalDataUpdated();
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
            if(this.state.selectedDot === sectionNames.activeDayKudos || this.state.selectedDot === sectionNames.todayGoals){
                const type = this.state.selectedDot === sectionNames.todayGoals ? 'goals': this.state.selectedDot;
                this.goalTrackerService.makeGoalEntry(activeDay, type, this.state.inputValue);
            }else{
                const tomorrowDay = (activeDay + 1) % 7;
                this.goalTrackerService.makeGoalEntry(tomorrowDay, 'goals', this.state.inputValue);
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

        const todayGoals = Object.entries(goals)[activeDay][1]["goals"].slice(0);
        const activeDayKudos = Object.entries(goals)[activeDay][1]["kudos"].slice(0);
        const tomorrowGoals = Object.entries(goals)[tomorrow][1]["goals"].slice(0);
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

    removeEntry = (sectionId, entryIndex) =>{
        let dayIndex = this.activeDayService.getActiveDay();;
        let type = 'goals';
        if(sectionId === sectionNames.todayGoals){
            let todayGoalsArray = this.state.todayGoals;
            todayGoalsArray.splice(entryIndex, 1);
            this.setState({
                todayGoals: todayGoalsArray,
            });
        }else if(sectionId === sectionNames.activeDayKudos){
            type = 'kudos';
            let activeDayKudosArray = this.state.activeDayKudos;
            activeDayKudosArray.splice(entryIndex, 1);
            this.setState({
                activeDayKudos: activeDayKudosArray,
            });
        }else{
            dayIndex = (this.activeDayService.getActiveDay() + 1) % 7;
            let tomorrowGoalsArray = this.state.tomorrowGoals;
            tomorrowGoalsArray.splice(entryIndex, 1);
            this.setState({
                tomorrowGoals: tomorrowGoalsArray,
            });
        }
        this.goalTrackerService.goalEntryRemoved(dayIndex, type, entryIndex);
    }

    getSectionLists = (entryList, listNum, maxListEntries) =>{
        if(!entryList){
            return null;
        }
        let newList = null;
        if(listNum === 0){
            newList = entryList.slice(0, maxListEntries);
        }else if(listNum === 1){
            newList = entryList.length > maxListEntries ? entryList.slice(maxListEntries, 2*maxListEntries): null;
        }
        return newList;
    }

    render(){
        const todayGoalsList1 = this.getSectionLists(this.state.todayGoals, 0, 4);
        const todayGoalsList2 = this.getSectionLists(this.state.todayGoals, 1, 4);
        const activeDayKudosList1 = this.getSectionLists(this.state.activeDayKudos, 0, 4);
        const activeDayKudosList2 = this.getSectionLists(this.state.activeDayKudos, 1, 4);
        const tomorrowGoalsList1 = this.getSectionLists(this.state.tomorrowGoals, 0, 4);
        const tomorrowGoalsList2 = this.getSectionLists(this.state.tomorrowGoals, 1, 4);
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
                    <SelectorDot id={sectionNames.todayGoals} onClick={this.selectorDotClicked} style={this.getSelectorDotStyle(sectionNames.todayGoals)}/>
                    <div>Today's Goals</div>
                    <SelectorDot id={sectionNames.activeDayKudos} onClick={this.selectorDotClicked} style={this.getSelectorDotStyle(sectionNames.activeDayKudos)}/>
                    <div>Kudos</div>
                    <SelectorDot id={sectionNames.tomorrowGoals} onClick={this.selectorDotClicked} style={this.getSelectorDotStyle(sectionNames.tomorrowGoals)}/>
                    <div>Tomorrow's Goals</div>
                </SelectorDotsGroup>

                <Section>
                    <SectionHeader>Today's Goals...</SectionHeader>
                    <SectionContent>
                        <div style={{display: 'flex'}}>
                            <StyledList>
                                {todayGoalsList1 ? todayGoalsList1.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.todayGoals, index)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                            <StyledList>
                                {todayGoalsList2 ? todayGoalsList2.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.todayGoals, index + 4)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                        </div>
                    </SectionContent>
                </Section>

                <Section>
                <SectionHeader>Kudos to me for...</SectionHeader>
                    <SectionContent>
                        <div style={{display: 'flex'}}>
                            <StyledList>
                                {activeDayKudosList1 ? activeDayKudosList1.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.activeDayKudos, index)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                            <StyledList>
                                {activeDayKudosList2 ? activeDayKudosList2.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.activeDayKudos, index + 4)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                        </div>
                    </SectionContent>
                </Section>

                <Section>
                <SectionHeader>Tomorrow's Goals...</SectionHeader>
                    <SectionContent>
                        <div style={{display: 'flex'}}>
                            <StyledList>
                                {tomorrowGoalsList1 ? tomorrowGoalsList1.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.tomorrowGoalsList1, index)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                            <StyledList>
                                {tomorrowGoalsList2 ? tomorrowGoalsList2.map((entry, index) => <GoalEntry onClick={() =>this.removeEntry(sectionNames.tomorrowGoals, index + 4)}><StyledListItem>{entry}</StyledListItem></GoalEntry>): null}
                            </StyledList>
                        </div>
                    </SectionContent>
                </Section>
            </div>
        );
    }
}