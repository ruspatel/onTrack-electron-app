import React, {Component} from 'react';
import { DayDashboard } from '../DayDashboard';
import WeekSideBar from '../WeekSideBar/index';

export class Dashboard extends Component{
    render(){
        return(
            <div>
                <WeekSideBar/>
                <DayDashboard/>
            </div>
        );
    }
}