import React, {Component} from 'react';
import { SelectorDot, SelectorDotsGroup, Button, SectionHeader } from './style';

export class DayDashboard extends Component{
    constructor(props){
        super(props);
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
        if(this.state.inputValue !== '' && !this.state.selectedDot){
            console.log('submitted new point');
        }
        this.setState({
            inputValue: '',
            selectedDot: null
        })
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
                    <SelectorDot id="Kudos" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('Kudos')}/>
                    <div>Kudos</div>
                    <SelectorDot id="Tmr" onClick={this.selectorDotClicked} style={this.getSelectorDotStyle('Tmr')}/>
                    <div>Tomorrow's Goals</div>
                </SelectorDotsGroup>
                <SectionHeader>Yesterday's Goals...</SectionHeader>
                <SectionHeader>Kudos to me for...</SectionHeader>
                <SectionHeader>Tomorrow's Goals...</SectionHeader>
            </div>
        );
    }
}