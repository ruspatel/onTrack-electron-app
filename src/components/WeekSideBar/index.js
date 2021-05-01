import React, {Component} from 'react';
import {NavColumn} from './style.js';
import Day from '../Day/index';

export default class WeekSideBar extends Component{
    constructor(props){
        super(props);
    }
    getDays = () =>{
        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    }

    render(){
        return(
            <div>
                <NavColumn>
                    {this.getDays().map((day) =>
                    <Day dayName={day}/>)}
                </NavColumn>
            </div>
        );
    }
}