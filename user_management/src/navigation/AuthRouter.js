import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, DashBoard, UserManagement, ForgotPassword, Userlogin, Screen, AssignRole } from '../pages';
export const AuthRouter = () => {


    return (
        <Switch>
            <Route exact path='/Userlogin' component={Userlogin} />
            <Route exact path='/ForgotPassword' component={ForgotPassword} />
            <Route exact path='/' component={Login} />
        </Switch>
    );
};
