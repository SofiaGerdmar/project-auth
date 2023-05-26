import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 50vw;
background-color: rgba(255,255,255,0.9);
margin-top: 70%;
border-radius: 10px 25px;
`
const StyledBtn = styled.button`
margin: 50px;
font-family: "Montserrat", sans-serif;
color: #EFDAD7;
background-color: black;
padding: 10px 20px;
border: none;
border-radius: 10px 15px;
font-size: 16px;
outline: none;
cursor: pointer;
text-decoration: none;
font-weight: 500;
`
const StyledP = styled.p`
margin: 40px 30px 0 30px;
`
export const NotFound = () => {
    return (
        <StyledSection>
        <StyledP>Sorry, page not found</StyledP>
            <StyledBtn as={Link} to="/login">Go back
            </StyledBtn>            
        </StyledSection>
    )
}