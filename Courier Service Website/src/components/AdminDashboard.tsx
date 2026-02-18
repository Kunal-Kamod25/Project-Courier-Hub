import { useState, useEffect } from "react";
import {
  Package,
  Users,
  TrendingUp,
  DollarSign,
  LogOut,
  RefreshCw,
  ShieldOff,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

export function AdminDashboard({ navigateTo, user, onLogout }) {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // ✅ Load data from backend (with token)
  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const [bookingsRes, usersRes] = await Promise.all([
        fetch("http://localhost:5000/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!bookingsRes.ok || !usersRes.ok)
        throw new Error("Failed to fetch data from server");

      const bookingsData = await bookingsRes.json();
      const usersData = await usersRes.json();

      setBookings(bookingsData.bookings || []);
      setUsers(usersData.users || []);

      toast.success("✅ Data loaded successfully!");
    } catch (error) {
      console.error("❌ Error loading data:", error);
      toast.error("Failed to fetch data from server!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error("Failed to update booking");
      toast.success("✅ Booking status updated!");
      loadData();
    } catch (error) {
      console.error("❌ Error updating booking:", error);
      toast.error("Failed to update booking status!");
    }
  };

  // ✅ Block / Unblock User
  const toggleUserBlock = async (userId, isBlocked) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/block`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isBlocked: !isBlocked }),
        }
      );

      if (!response.ok) throw new Error("Failed to update user status");

      toast.success(`User ${isBlocked ? "unblocked" : "blocked"} successfully!`);
      loadData();
    } catch (error) {
      console.error("❌ Error blocking/unblocking user:", error);
      toast.error("Failed to update user status!");
    }
  };

  // ✅ Color-coded status badges
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Picked Up":
        return "bg-orange-500 text-white";
      case "In Transit":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-600 text-white";
      case "Cancelled":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  // ✅ Stats
  const stats = {
    totalBookings: bookings.length,
    totalUsers: users.length,
    totalRevenue: bookings.reduce((sum, b) => sum + (b.price || 0), 0),
    activeShipments: bookings.filter(
      (b) => !["Delivered", "Cancelled"].includes(b.status)
    ).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Package className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-purple-100 text-sm">
                  CourierHub Management
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={loadData} disabled={loading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button variant="secondary" onClick={() => navigateTo("home")}>
                Home
              </Button>
              <Button
                variant="outline"
                className="bg-white text-purple-600"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-400 text-black shadow-md hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle>{stats.totalBookings}</CardTitle>
            </CardHeader>
            <CardContent>
              <Package className="h-8 w-8 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-400 text-black shadow-md hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <CardDescription>Total Users</CardDescription>
              <CardTitle>{stats.totalUsers}</CardTitle>
            </CardHeader>
            <CardContent>
              <Users className="h-8 w-8 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-400 text-black shadow-md hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle>
                ₹{stats.totalRevenue.toLocaleString("en-IN")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DollarSign className="h-8 w-8 opacity-70" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-yellow-400 text-black shadow-md hover:scale-105 transition-transform">
            <CardHeader className="pb-3">
              <CardDescription>Active Shipments</CardDescription>
              <CardTitle>{stats.activeShipments}</CardTitle>
            </CardHeader>
            <CardContent>
              <TrendingUp className="h-8 w-8 opacity-70" />
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "bookings" ? "default" : "outline"}
            onClick={() => setActiveTab("bookings")}
          >
            All Bookings
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
          >
            All Users
          </Button>
        </div>

        {/* Bookings Table */}
        {activeTab === "bookings" && (
          <Card>
            <CardHeader>
              <CardTitle>All Courier Bookings</CardTitle>
              <CardDescription>Manage and track courier bookings</CardDescription>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  No bookings found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tracking ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((b) => (
                        <TableRow key={b._id}>
                          <TableCell>{b._id}</TableCell>
                          <TableCell>{b.senderName}</TableCell>
                          <TableCell>
                            {b.pickupAddress} → {b.deliveryAddress}
                          </TableCell>
                          <TableCell>₹{b.price || 0}</TableCell>
                          <TableCell>
                            <Badge className={`${getStatusColor(b.status)} px-3 py-1`}>
                              {b.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={b.status}
                              onValueChange={(v) =>
                                updateBookingStatus(b._id, v)
                              }
                            >
                              <SelectTrigger className="w-40">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Picked Up">
                                  Picked Up
                                </SelectItem>
                                <SelectItem value="In Transit">
                                  In Transit
                                </SelectItem>
                                <SelectItem value="Delivered">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="Cancelled">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>Manage all registered users</CardDescription>
            </CardHeader>
            <CardContent>
              {users.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  No users registered yet
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Registered On</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((u) => (
                        <TableRow key={u._id}>
                          <TableCell>{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            {new Date(u.createdAt).toLocaleDateString("en-IN")}
                          </TableCell>
                          <TableCell>
                            {u.isBlocked ? (
                              <Badge className="bg-red-500 text-white">
                                Blocked
                              </Badge>
                            ) : (
                              <Badge className="bg-green-500 text-white">
                                Active
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant={u.isBlocked ? "outline" : "destructive"}
                              onClick={() =>
                                toggleUserBlock(u._id, u.isBlocked)
                              }
                            >
                              {u.isBlocked ? (
                                <>
                                  <ShieldCheck className="h-4 w-4 mr-2" /> Unblock
                                </>
                              ) : (
                                <>
                                  <ShieldOff className="h-4 w-4 mr-2" /> Block
                                </>
                              )}
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
        )}
      </div>
    </div>
  );
}
