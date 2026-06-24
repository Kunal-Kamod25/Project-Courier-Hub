# CourierHub - Admin Login Guide

## What's New?

### Admin Login Button in Header
A new "Admin" button has been added to the website header, positioned next to the Login and Sign Up buttons. This provides easy access to the admin portal.

**Location:**
- Desktop: Top right header, purple-colored button next to Login/Sign Up
- Mobile: Mobile menu, at the bottom of the menu options

## Admin Access

### Admin Login Credentials
```
Email: admin@courierhub.in
Password: admin123
```

### How to Access Admin Dashboard
1. Click the "Admin" button in the header
2. Enter admin credentials
3. You'll be redirected to the Admin Dashboard

## Admin Dashboard Features

The admin panel allows you to:
- View total bookings, users, revenue, and active shipments
- Manage all courier bookings
- Update shipment status (Booked → Picked Up → In Transit → Out for Delivery → Delivered)
- View all registered users
- Monitor business analytics

## User vs Admin Login

### User Login
- Regular customers use the "Login" button
- Access their personal dashboard
- Can book couriers, track orders, view history

### Admin Login
- Administrators use the "Admin" button
- Access the admin dashboard
- Can manage all bookings and users

## All Working Features

✅ **Homepage**
- Navigation menu (desktop & mobile)
- Book Now buttons
- Track Order buttons
- Service cards
- Pricing section
- Footer links

✅ **User Features**
- Registration (with validation)
- Login (with stored credentials)
- Book courier service
- Track shipments
- View booking history
- User dashboard with stats

✅ **Admin Features**
- Admin login (separate page)
- Admin dashboard
- View all bookings
- Update shipment status
- View all registered users
- Business statistics

✅ **Courier Booking**
- Sender & receiver details
- Package details
- Price calculation
- Service type selection (Standard/Express/Heavy)
- Tracking number generation

✅ **Tracking System**
- Real-time tracking by tracking number
- Status timeline visualization
- Estimated delivery date
- Complete shipment details

## Technical Details

### New Files Created
- `/components/AdminLoginPage.tsx` - Dedicated admin login page

### Modified Files
- `/App.tsx` - Added admin-login route
- `/components/HomePage.tsx` - Added Admin button to header (desktop & mobile)

### Data Storage
All data is stored in browser's localStorage:
- `courierUsers` - Registered users
- `courierBookings` - All courier bookings

## Responsive Design
The website is fully responsive and works on:
- Windows desktops
- Mac computers
- Android devices
- iPhones & iPads
- Tablets

## Color Scheme
- User Interface: Blue theme
- Admin Interface: Purple theme
- Status indicators: Green (delivered), Blue (in transit), Yellow (picked up), Gray (booked)
