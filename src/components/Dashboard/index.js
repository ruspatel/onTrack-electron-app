import React, {Component} from 'react';
import { DayDashboard } from '../DayDashboard';
import WeekSideBar from '../WeekSideBar/index';
import {StyledDashboard} from './style';

export class Dashboard extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <StyledDashboard>
                <WeekSideBar/>
                <DayDashboard/>
            </StyledDashboard>
        );
    }
}