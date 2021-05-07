import styled from 'styled-components';

export const SelectorDot = styled.span`
    height: 20px;
    width: 20px;
    background-color: #bbb;
    border-radius: 50%;
    margin-right: 10px;
    margin-left: 10px;
    &:hover{
        cursor:pointer;
        background-color: blue;
    }
`;

export const SelectorDotsGroup = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 0px 25px 0px;
`;

export const SelectorText = styled.div`
    font-family: Arial;
    font-size: 18px;
`;

export const HeaderLabel = styled.label`
    margin: 10px 0px 0px 0px;
`;

export const HeaderSpan = styled.div`
    display: flex;
    margin: 20px 0px 0px 0px;
    font-family: Arial;
    font-size: 18px;
    display: flex;
    align-items: center;    
`;

export const StyledInput = styled.input`
    margin-left: 10px;
`;

export const Button = styled.button`
    background-color: DodgerBlue;
    color: white;
    border: 2px solid blue;
    margin: 5px 5px 5px 10px;
    width: 75px;
    height: 35px;
    font-size: 15px;
    border-radius: 10px;
    &.discard{
        background-color: green;
        float: right;
        height: 50px;
        width: 120px;
        font-size: 20px;
        border: 2px solid DodgerBlue;
    }
    &:hover{
        cursor: pointer;
    }
`;

export const SectionHeader = styled.div`
    color: DodgerBlue;
    font-family: Arial;
    font-size: 2em;
    font-weight: bolder;
`;

export const Section = styled.div`
`;

export const SectionContent = styled.div`
    display: flex;
    height: 140px;
`;

export const GoalEntry = styled.div`
    font-size: 2em;
    font-weight: bolder;
`;

export const StyledList = styled.ul`
    width: 400px;
`;

export const StyledListItem = styled.li`
    font-size: 22px;
    font-family: Arial;
    margin: 7px 0px 7px 0px;
    &:hover{
        color: green;
        cursor: pointer;
    }
`;

