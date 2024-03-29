import styled from 'styled-components';

export const NavColumn = styled.div`
    display: flex;
    flex-direction: column;
    background-color: DodgerBlue;
    float: left;
    margin-right: 10px;
    margin-left: -10px;
    margin-top: -8px;
`;

export const DayBox = styled.div`
    &:hover{
        cursor: pointer;
    }
`;