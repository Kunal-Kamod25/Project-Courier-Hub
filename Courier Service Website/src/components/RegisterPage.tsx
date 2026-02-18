import { useState } from "react"; 
import axios from "axios";
import { Package, User, Mail, Lock, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner@2.0.3";

const API_BASE_URL = "http://localhost:5000/api";

export function RegisterPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName: formData.fullName,  // ✅ changed here
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
      });

      toast.success("Registration successful! Please login to continue.");
      setTimeout(() => navigateTo("login"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" onClick={() => navigateTo("home")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-gray-900">Create Your Account</CardTitle>
            <CardDescription>Join CourierHub and start shipping today</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="fullName" name="fullName" type="text" placeholder="John Doe"
                      className="pl-10" value={formData.fullName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="email" name="email" type="email" placeholder="john@example.com"
                      className="pl-10" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="phone" name="phone" type="tel" placeholder="9876543210"
                      className="pl-10" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="city" name="city" type="text" placeholder="Mumbai"
                      className="pl-10" value={formData.city} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" type="text" placeholder="123, Street Name, Area"
                  value={formData.address} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input id="pincode" name="pincode" type="text" placeholder="400001"
                  value={formData.pincode} onChange={handleChange} required />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="password" name="password" type="password" placeholder="••••••••"
                      className="pl-10" value={formData.password} onChange={handleChange} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••"
                      className="pl-10" value={formData.confirmPassword} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">Create Account</Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button type="button" onClick={() => navigateTo("login")} className="text-blue-600 hover:underline">
                  Login here
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
