import { useState, useEffect } from 'react';
import { Package, Plus, LogOut, User, MapPin, Clock, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export function UserDashboard({ navigateTo, user, onLogout }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem('courierBookings') || '[]');
    const userBookings = allBookings.filter(b => b.userId === user?.id);
    setBookings(userBookings);
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500';
      case 'In Transit':
      case 'Out for Delivery':
        return 'bg-blue-500';
      case 'Picked Up':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const stats = {
    total: bookings.length,
    active: bookings.filter(b => !['Delivered', 'Cancelled'].includes(b.status)).length,
    delivered: bookings.filter(b => b.status === 'Delivered').length,
    totalSpent: bookings.reduce((sum, b) => sum + (b.price || 0), 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-gray-900">CourierHub</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.fullName}!</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => navigateTo('home')}>
                Home
              </Button>
              <Button variant="outline" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Button size="lg" onClick={() => navigateTo('book-courier')} className="h-20">
            <Plus className="h-6 w-6 mr-2" />
            Book New Courier
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigateTo('track-courier')} className="h-20">
            <MapPin className="h-6 w-6 mr-2" />
            Track Courier
          </Button>
        </div>

       {/* Stats Cards */}
<div className="grid md:grid-cols-4 gap-6 mb-8">
  {/* Total Bookings */}
  <Card className="border-none shadow-md overflow-hidden">
    <div className="bg-blue-100 p-4 h-full rounded-lg">
      <CardHeader className="pb-3">
        <CardDescription className="text-blue-800 font-medium">Total Bookings</CardDescription>
        <CardTitle className="text-blue-700 text-3xl font-semibold">{stats.total}</CardTitle>
      </CardHeader>
      <CardContent>
        <Package className="h-8 w-8 text-blue-500 opacity-60" />
      </CardContent>
    </div>
  </Card>

  {/* Active Shipments */}
  <Card className="border-none shadow-md overflow-hidden">
    <div className="bg-yellow-100 p-4 h-full rounded-lg">
      <CardHeader className="pb-3">
        <CardDescription className="text-yellow-800 font-medium">Active Shipments</CardDescription>
        <CardTitle className="text-yellow-700 text-3xl font-semibold">{stats.active}</CardTitle>
      </CardHeader>
      <CardContent>
        <Clock className="h-8 w-8 text-yellow-600 opacity-60" />
      </CardContent>
    </div>
  </Card>

  {/* Delivered */}
  <Card className="border-none shadow-md overflow-hidden">
    <div className="bg-green-100 p-4 h-full rounded-lg">
      <CardHeader className="pb-3">
        <CardDescription className="text-green-800 font-medium">Delivered</CardDescription>
        <CardTitle className="text-green-700 text-3xl font-semibold">{stats.delivered}</CardTitle>
      </CardHeader>
      <CardContent>
        <Package className="h-8 w-8 text-green-600 opacity-60" />
      </CardContent>
    </div>
  </Card>

  {/* Total Spent */}
  <Card className="border-none shadow-md overflow-hidden">
    <div className="bg-purple-100 p-4 h-full rounded-lg">
      <CardHeader className="pb-3">
        <CardDescription className="text-purple-800 font-medium">Total Spent</CardDescription>
        <CardTitle className="text-purple-700 text-3xl font-semibold">₹{stats.totalSpent}</CardTitle>
      </CardHeader>
      <CardContent>
        <TrendingUp className="h-8 w-8 text-purple-600 opacity-60" />
      </CardContent>
    </div>
  </Card>
</div>

        {/* User Profile */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className= "text-sm text-gray-600">Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p>{user?.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p>{user?.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">PIN Code</p>
                <p>{user?.pincode}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Address</p>
                <p>{user?.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your courier booking history</CardDescription>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No bookings yet</p>
                <Button onClick={() => navigateTo('book-courier')}>
                  Book Your First Courier
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>From → To</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="text-blue-600">
                          {booking.trackingNumber}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{booking.senderCity}</div>
                            <div className="text-gray-500">↓</div>
                            <div>{booking.receiverCity}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(booking.createdAt).toLocaleDateString('en-IN')}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>₹{booking.price}</TableCell>
                        <TableCell>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => navigateTo('track-courier')}
                          >
                            Track
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
