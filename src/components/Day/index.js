import React, {Component} from 'react';
import {DayBlock, DayText} from './style.js';

export default class Day extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(            
            <DayBlock>
                <DayText>{this.props.dayName}</DayText>
            </DayBlock>
        );
    }
}