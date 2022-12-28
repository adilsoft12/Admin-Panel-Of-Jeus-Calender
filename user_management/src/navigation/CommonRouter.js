import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Advertisement, Organisation, AssignRole, DashBoard, ForgotPassword, Login, Report, Screen, Userlogin, AssignPermission, Permission, UserManagement, Setting, CreateBusinessForm } from '../pages';
import { PrivateRoutes } from './PrivateRoutes';
import { useUserData } from '../hooks/useUserData';
import { createBrowserHistory } from 'history';
import { AddORG } from '../pages/app/organisation/addorg';
import { AddADV } from '../pages/app/advertisement/addAdv';
import { DetailOrg } from '../pages/app/organisation/detail';
import { AddPdf } from '../pages/app/pdfFile/addpdf';
import { PDF, PdfList } from '../pages/app/pdfFile/pdflist';
import { DetailAdv } from '../pages/app/advertisement/advDetail';
import { Detail } from '../pages/app/pdfFile/pdfDetails';
import { EventList} from '../pages/app/event/eventlist';
import {AddEvent} from '../pages/app/event/addevent';
import {EventDetail} from '../pages/app/event/eventDetail';
import {Addcontact} from '../pages/app/contact/addcontact';
import {ContactDetail} from '../pages/app/contact/contactDetail';
import { ContactList} from '../pages/app/contact/contactList';

// import {addorg} from '../pages/app/organisation/addorg';
export const CommonRouter = () => {
    // const location = useLocation();
    const userid = useUserData();
    console.log("userlogin", userid)
    const browserHistory = createBrowserHistory();

    return (


        <BrowserRouter>
            <Switch>

                <PrivateRoutes exact path='/Setting'>
                    <Setting />
                </PrivateRoutes>
                {/* <PrivateRoutes exact path='/CreateBusinessForm'>
                    <CreateBusinessForm />
                </PrivateRoutes> */}

                <PrivateRoutes exact path='/UserManagement'>
                    <UserManagement />
                </PrivateRoutes>

                <PrivateRoutes exact path='/dashboard'>
                    <DashBoard />
                </PrivateRoutes>


                <PrivateRoutes exact path='/Report'>
                    <Report />
                </PrivateRoutes>

                {/* <PrivateRoutes exact path='/roles'>
                    <AssignRole />
                </PrivateRoutes> */}

                <PrivateRoutes exact path='/user'>
                    <UserManagement />
                </PrivateRoutes>
                {/* 
                <PrivateRoutes exact path='/assignPermission'>
                    <AssignPermission />
                </PrivateRoutes> */}
                {/* <PrivateRoutes exact path='/organisation'>
                    <Organisation/>
                </PrivateRoutes> */}


                {/* <PrivateRoutes exact path='/screen'>
                    <Screen />
                </PrivateRoutes>   */}

                <PrivateRoutes exact path='/'>
                    <DashBoard />
                </PrivateRoutes>


                {/* <Route exact path='/assignPermission' component={AssignPermission} />  */}

                {/* <Route exact path='/user' component={UserManagement} /> */}

                <Route exact path='/Roles' component={AssignRole} />
                <Route exact path='/screen' component={Screen} />
                <Route exact path='/organisation' component={Organisation} />
                <Route exact path='/advertisement' component={Advertisement} />
                <Route exact path='/Userlogin' component={Userlogin} />
                <Route exact path='/ForgotPassword' component={ForgotPassword} />
                <Route exact path='/Login' component={Login} />
                <Route exact path='/permission' component={Permission} />
                <Route exact path='./' component={Login} />
                <Route exact path='/assignPermission' component={AssignPermission} />
                <Route exact path='/CreateBusinessForm' component={CreateBusinessForm} />
                <Route exact path='/AddORG' component={AddORG} />
                <Route path="/AddORG/:id" component={AddORG} />
                <Route path="/DetailORG/:id" component={DetailOrg} />
                <Route exact path='/AddADV' component={AddADV} />
                <Route path="/AddADV/:id" component={AddADV} />
                <Route path="/DetailAdv/:id" component={DetailAdv} />
                <Route exact path="/addpdf" component={AddPdf} />
                <Route path='/Addpdf/:id' component={AddPdf} />
                <Route exact path='/pdfdetails' component={PdfList} />
                <Route exact path='/detail/:id' component={Detail} />
                <Route exact path='/event' component={EventList} />
                <Route exact path='/addevent' component={AddEvent} />
                <Route exact path='/addevent/:id' component={AddEvent} />
                <Route exact path='/eventDetail/:id' component={EventDetail} />
                <Route exact path='/addcontact' component={Addcontact} />
                <Route exact path='/addcontact/:id' component={Addcontact} />
                <Route exact path='/contactDetail/:id' component={ContactDetail} />
                <Route exact path='/contact' component={ContactList} />

            </Switch>
        </BrowserRouter>

    )
}
