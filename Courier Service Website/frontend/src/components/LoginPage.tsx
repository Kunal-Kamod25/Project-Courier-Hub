import axios from "axios";
const API_BASE_URL = "http://localhost:5000/api";
import { useState } from "react";
import { Package, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { toast } from "sonner@2.0.3";

export function LoginPage({ navigateTo, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login (local)
    if (email === "admin@courierhub.in" && password === "admin123") {
      const adminUser = {
        id: 0,
        fullName: "Admin",
        email: "admin@courierhub.in",
        role: "admin",
      };
      toast.success("Welcome Admin!");
      onLogin(adminUser, true);
      return;
    }

    try {
      // Backend login
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ Save token to localStorage for future API calls
      localStorage.setItem("courierhubToken", token);

      toast.success(`Welcome back, ${user.fullName || "User"}!`); // ✅ changed here
      onLogin(user, false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.msg || "Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigateTo("home")}
          className="mb-6 text-white hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-white text-2xl drop-shadow-md">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Login to your CourierHub account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
              >
                Login
              </Button>

              <div className="text-center text-sm text-white/80">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigateTo("register")}
                  className="text-white font-semibold hover:underline"
                >
                  Register here
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
