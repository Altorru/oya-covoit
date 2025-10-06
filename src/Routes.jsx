import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import BookingConfirmation from './pages/booking-confirmation';
import Login from './pages/login';
import FerryScheduleSearch from './pages/ferry-schedule-search';
import CreateTrip from './pages/create-trip';
import UserProfile from './pages/user-profile';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<FerryScheduleSearch />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ferry-schedule-search" element={<FerryScheduleSearch />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
