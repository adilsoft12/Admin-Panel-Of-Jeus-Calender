import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Advertisement,
  AssignRole,
  DashBoard,
  ForgotPassword,
  Login,
  Report,
  Screen,
  Userlogin,
  AssignPermission,
  Permission,
  UserManagement,
  Setting,
  CreateBusinessForm,
  UpcomingEvent,
} from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";
import { useUserData } from "../hooks/useUserData";
import { createBrowserHistory } from "history";
import { Organization } from "../pages/app/organisation/index";
import { AddORG } from "../pages/app/organisation/addorg";
import { AddADV } from "../pages/app/advertisement/addAdv";
import { DetailOrg } from "../pages/app/organisation/detail";
import { AddPdf } from "../pages/app/pdfFile/addpdf";
import { PDF, PdfList } from "../pages/app/pdfFile/pdflist";
import { DetailAdv } from "../pages/app/advertisement/advDetail";
import { Detail } from "../pages/app/pdfFile/pdfDetails";
import { EventList } from "../pages/app/event/eventlist";
import { AddEvent } from "../pages/app/event/addevent";
import { EventDetail } from "../pages/app/event/eventDetail";
import { Addcontact } from "../pages/app/contact/addcontact";
import { ContactDetail } from "../pages/app/contact/contactDetail";
import { ContactList } from "../pages/app/contact/contactList";
import { BannerList } from "../pages/app/banner/bannerlist";
import { AddBanner } from "../pages/app/banner/addbanner";
import { BannerDetail } from "../pages/app/banner/bannerdetail";
import { AddUpcomingEvent } from "../pages/app/upcomingEvent/addUpcomingEvent";
import { UpcomingeventDetail } from "../pages/app/upcomingEvent/upcomingEventDetail";
import { AboutList } from "../pages/app/about/aboutlist";
import { AddAbout } from "../pages/app/about/addabout";
import { AboutDetail } from "../pages/app/about/aboutdetail";

export const CommonRouter = () => {
  const userid = useUserData();
  console.log("userlogin", userid);
  const browserHistory = createBrowserHistory();

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes exact path="/Setting">
          <Setting />
        </PrivateRoutes>
        <PrivateRoutes exact path="/aboutus">
          <AboutList />
        </PrivateRoutes>
        <PrivateRoutes exact path="/CreateBusinessForm">
          <CreateBusinessForm />
        </PrivateRoutes>
        <PrivateRoutes exact path="/UserManagement">
          <UserManagement />
        </PrivateRoutes>
        <PrivateRoutes exact path="/dashboard">
          <DashBoard />
        </PrivateRoutes>
        <PrivateRoutes exact path="/Report">
          <Report />
        </PrivateRoutes>
        <PrivateRoutes exact path="/roles">
          <AssignRole />
        </PrivateRoutes>
        <PrivateRoutes exact path="/user">
          <UserManagement />
        </PrivateRoutes>
        <PrivateRoutes exact path="/assignpermission">
          <AssignPermission />
        </PrivateRoutes>
        <PrivateRoutes exact path="/screen">
          <Screen />
        </PrivateRoutes>
        <PrivateRoutes exact path="/permission">
          <Permission />
        </PrivateRoutes>
        <PrivateRoutes exact path="/Organization">
          <Organization />
        </PrivateRoutes>
        <PrivateRoutes exact path="/calenderdetails">
          <PdfList />
        </PrivateRoutes>
        <PrivateRoutes exact path="/event">
          <EventList />
        </PrivateRoutes>
        <PrivateRoutes exact path="/contact">
          <ContactList />
        </PrivateRoutes>
        <PrivateRoutes exact path="/logout">
          <BannerList />
        </PrivateRoutes>
        <PrivateRoutes exact path="/">
          <DashBoard />
        </PrivateRoutes>
        <PrivateRoutes exact path="/advertisement">
          <Advertisement />
        </PrivateRoutes>
        <PrivateRoutes exact path="/upcomingevent">
          <UpcomingEvent />
        </PrivateRoutes>
        <Route exact path="/Roles" component={AssignRole} />
        <Route exact path="/screen" component={Screen} />
        <Route exact path="/Userlogin" component={Userlogin} />
        <Route exact path="/ForgotPassword" component={ForgotPassword} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/permission" component={Permission} />
        <Route exact path="./" component={Login} />
        <Route exact path="/assignPermission" component={AssignPermission} />
        <Route
          exact
          path="/CreateBusinessForm"
          component={CreateBusinessForm}
        />
        <Route exact path="/Organization" component={Organization} />
        <Route exact path="/AddORG" component={AddORG} />
        <Route path="/AddORG/:id" component={AddORG} />
        <Route path="/DetailORG/:id" component={DetailOrg} />

        <Route exact path="/advertisement" component={Advertisement} />
        <Route exact path="/AddADV" component={AddADV} />
        <Route path="/AddADV/:id" component={AddADV} />
        <Route path="/DetailAdv/:id" component={DetailAdv} />

        <Route exact path="/addpdf" component={AddPdf} />
        <Route exact path="/calenderdetails" component={PdfList} />
        <Route path="/Addpdf/:id" component={AddPdf} />
        <Route exact path="/detail/:id" component={Detail} />

        <Route exact path="/event" component={EventList} />
        <Route exact path="/addevent" component={AddEvent} />
        <Route exact path="/addevent/:id" component={AddEvent} />
        <Route exact path="/eventDetail/:id" component={EventDetail} />

        <Route exact path="/addcontact/:id" component={Addcontact} />
        <Route exact path="/contactDetail/:id" component={ContactDetail} />
        <Route exact path="/addcontact" component={Addcontact} />
        <Route exact path="/contact" component={ContactList} />

        <Route exact path="/about" component={AboutList} />
        <Route exact path="/AddAbout" component={AddAbout} />
        <Route exact path="/AddAbout/:id" component={AddAbout} />
        <Route exact path="/AboutDetail/:id" component={AboutDetail} />

        <Route exact path="/banner" component={BannerList} />
        <Route exact path="/AddBanner" component={AddBanner} />
        <Route exact path="/AddBanner/:id" component={AddBanner} />
        <Route exact path="/BannerDetail/:id" component={BannerDetail} />

        <Route exact path="/upcomingevent" component={UpcomingEvent} />
        <Route exact path="/AddUpcomingEvent" component={AddUpcomingEvent} />
        <Route
          exact
          path="/AddUpcomingEvent/:id"
          component={AddUpcomingEvent}
        />
        <Route
          exact
          path="/UpcomingeventDetail/:id"
          component={UpcomingeventDetail}
        />
      </Switch>
    </BrowserRouter>
  );
};
