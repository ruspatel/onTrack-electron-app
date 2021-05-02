import React, {Component} from 'react';
import {NavColumn} from './style.js';
import Day from '../Day/index';
import {activeDayService} from '../../Dependencies/dependencyList';

export default class WeekSideBar extends Component{
    constructor(props){
        super(props);
        this.activeDayService = activeDayService;
        this.activeDayService.addObserver(this);

        this.state = {
            activeDay: 0,
        }
    }

    getDays = () =>{
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    handleCLick = (dayIndex) =>{
        this.activeDayService.updateActiveDay(dayIndex);
    }

    activeDayUpdated = ()=>{
        const activeDay = this.activeDayService.getActiveDay();
        this.setState({
            activeDay: activeDay,
        });
    }

    render(){
        return(
            <div>
                <NavColumn>
                    {this.getDays().map((day, index) =>
                    <div onClick={() =>this.handleCLick(index)}>
                        <Day active={this.state.activeDay === index} dayName={day}/>
                    </div>)}
                </NavColumn>
            </div>
        );
    }
}