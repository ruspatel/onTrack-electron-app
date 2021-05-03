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
    margin-top: 10px;
`;

export const Button = styled.button`
    background-color: DodgerBlue;
    color: white;
    border: 2px solid blue;
    margin: 5px;
    &.discard{
        background-color: green;
        float: right;
        height: 50px;
        width: 120px;
        font-size: 20px;
        // border-radius: 20%;
        border: 2px solid DodgerBlue;
    }
    &:hover{
        cursor: pointer;
    }
`;

export const SectionHeader = styled.h1`
    color: DodgerBlue;
    font-family: Arial;
`;