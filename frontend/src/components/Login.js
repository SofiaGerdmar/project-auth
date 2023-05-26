import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import styled from 'styled-components/macro';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
max-width: 50vw;
background-color: rgba(255,255,255,0.9);
margin-top: 50%;
border-radius: 10px 25px;
height: 50vh;
`
const StyledDiv1 = styled.div`
display: flex;
flex-direction: row;
align-items: center;
margin-top: 40px;
margin-bottom: 20px;
`
const Styledh1 = styled.h1`
margin: 80px 30px 0 30px;
color: #DFA8AA;
`
const Styledh2 = styled.h2`
color: #DFA8AA;
`
const StyledLabel = styled.label`
text-align: center;
margin-top: 15px;
padding: 5px;
`
const StyledForm = styled.form`
display: flex;
flex-direction: column;
`
const StyledInput = styled.input`
background-color: transparent;
border: 1px solid black;
outline: none;
padding: 5px 5px 5px 10px;
border-radius: 5px;
font-family: "Montserrat", sans-serif;
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

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(store => store.user.accessToken);
    useEffect(() => {
        if(accessToken) {
            navigate("/")
        }
    }, [accessToken]);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL(mode), options)
        .then(res => res.json())
        .then(data => {
            if(data.success) {
                dispatch(user.actions.setAccessToken(data.response.accessToken))
                dispatch(user.actions.setUsername(data.response.username))
                dispatch(user.actions.setUserId(data.response.id))
                dispatch(user.actions.setError(null))
            } else {
                dispatch(user.actions.setAccessToken(null))
                dispatch(user.actions.setUsername(null))
                dispatch(user.actions.setUserId(null))
                dispatch(user.actions.setError(data.response))
            }
        })
    }
    return (
        <StyledSection>
            <Styledh1>What is buzzing around in your head?</Styledh1>
            <Styledh2>Log in to jot down your thoughts.</Styledh2>
            <StyledDiv1>
                <label className="container" htmlFor="register">Register
                <input
                    type="radio"
                    id="register"
                    checked={mode === "register"}
                    onChange={() => setMode("register")} />
                <span className="checkmark"></span>
                </label>
                <label className="container" htmlFor="login">Log in
                <input
                    type="radio"
                    id="login"
                    checked={mode === "login"}
                    onChange={() => setMode("login")} />
                <span className="checkmark"></span>
                </label>
            </StyledDiv1>
                <StyledForm onSubmit={onFormSubmit}>
                    <StyledLabel htmlFor="username">Username:</StyledLabel>
                    <StyledInput
                        type="text"
                        id="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)} />
                    <StyledLabel htmlFor="password">Password:</StyledLabel>
                    <StyledInput
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />
                <StyledBtn type="submit">Submit</StyledBtn>
                </StyledForm>
                
        </StyledSection>
    )
}