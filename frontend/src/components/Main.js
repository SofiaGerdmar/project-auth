import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thoughts } from 'reducers/thoughts';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import styled from 'styled-components';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
max-width: 80vw;
background-color: rgba(255,255,255,0.9);
margin-top: 50%;
border-radius: 10px 25px;

`
const Styledh1 = styled.h1`
margin: 80px 30px 20px 30px;
color: #DFA8AA;
`
const StyledBtn = styled.button`
margin: 50px;
font-family: "Montserrat", sans-serif;
background-color: #EFDAD7;
padding: 10px 20px;
border: none;
border-radius: 10px 15px;
font-size: 16px;
outline: none;
cursor: pointer;
`
export const Main = () => {
    const thoughtsItems = useSelector((store) => store.thoughts.items);
    const dispatch = useDispatch();
    const accessToken = useSelector(store => store.user.accessToken);
    const username = useSelector(store => store.user.username);
    const navigate = useNavigate();
    useEffect(() => {
        if(!accessToken) {
            navigate("/login")
        }
    }, [accessToken]);

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": accessToken
            }
        }
        fetch(API_URL("thoughts"), options)
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    dispatch(thoughts.actions.setError(null));
                    dispatch(thoughts.actions.setItems(data.response));
                } else {
                    dispatch(thoughts.actions.setError(response));
                    dispatch(thoughts.actions.setItems([]));
                }
            });
    })
    const onLogoutButtonClick = () => {
        dispatch(user.actions.setAccessToken(null));
        dispatch(user.actions.setUsername(null));
        dispatch(user.actions.setUserId(null));
        dispatch(user.actions.setError(null));
    }
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    return (
        <StyledSection>
            
            {username ? (<Styledh1>Hi there {capitalizeFirstLetter(username)}!</Styledh1>): ""}
            {thoughtsItems.map(item => {
                return (
                    <ul>
                        <li key={item._id}>{item.message}</li>
                    </ul>
                )
            })}
            <StyledBtn type="button" onClick={onLogoutButtonClick}>Log out</StyledBtn>
        </StyledSection>
    )
}
    