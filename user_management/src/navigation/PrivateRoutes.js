import React, { Component, useState } from 'react'
import { login } from '../pages/auth/login'
import { useUserData } from '../hooks/useUserData';
import { Route, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';



export const PrivateRoutes = ({ children, ...rest }) => {
    const screenByRole = useSelector(state => state.screenReducer.screensbyRole?.screens);
    console.log("screenByRole",screenByRole)
    const useriD = useUserData();
    const history = useHistory()
    const isAuthenticated = useriD;
    let status = false;

    console.log(" rest.path",  rest.path, {screenByRole})

    if (screenByRole) {
        screenByRole.map((item) => {
            if (item.screenUrl === rest.path) {
                status = true;
                return;
            };
        });
    }

    console.log("statusstatus>>>",status)

    return (<Route {...rest} render={() => {
        if (isAuthenticated && rest.path === '/' && !status) {
            return children;
        };
        if (isAuthenticated && status) {
            return children;
        } else if (isAuthenticated && !status) {
            return history.goBack();
        } else {
            return <Redirect to={{ pathname: '/Login' }} />;
        };
    }} />)
};
