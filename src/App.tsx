import { BrowserRouter, Routes, Route } from "react-router";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import CreateBooking from "./pages/CreateBooking";
import BookingHistory from "./pages/BookingHistory";
import BookingLog from "./pages/BookingLog";

import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar fluid={true} rounded={true} className=" bg-blue-100">
        <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Room Booking App
          </span>
        </NavbarBrand>
        <NavbarToggle />
        <NavbarCollapse>
          <NavbarLink href="/rooms">Rooms</NavbarLink>
          <NavbarLink href="/bookings">Bookings</NavbarLink>
          <NavbarLink href="/create-booking">Create Booking</NavbarLink>
          <NavbarLink href="/booking-log">Booking Log</NavbarLink>
        </NavbarCollapse>
      </Navbar>
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/create-booking" element={<CreateBooking />} />
        <Route path="/booking-history/:id" element={<BookingHistory />} />
        <Route path="/booking-log" element={<BookingLog />} />
      </Routes>
    </BrowserRouter>
  );
}
