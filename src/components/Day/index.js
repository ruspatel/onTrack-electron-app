import React, {Component} from 'react';
import {DayBlock, DayText} from './style.js';

export default class Day extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(            
            <DayBlock style={this.props.active ? {'background-color': 'white'}: null}>
                <DayText style={this.props.active ? {'color': 'DodgerBlue'}: null}>{this.props.dayName}</DayText>
            </DayBlock>
        );
    }
}