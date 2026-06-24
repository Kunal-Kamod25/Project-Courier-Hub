import {
  Package,
  Truck,
  Clock,
  Shield,
  MapPin,
  DollarSign,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";

export function HomePage({ navigateTo, user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-white" />
              <span className="text-white font-bold text-xl">CourierHub</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <button
                onClick={() => navigateTo("home")}
                className="text-white/80 hover:text-white transition"
              >
                Home
              </button>
              <button
                onClick={() => navigateTo("track-courier")}
                className="text-white/80 hover:text-white transition"
              >
                Track Order
              </button>
              <a
                href="#services"
                className="text-white/80 hover:text-white transition"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="text-white/80 hover:text-white transition"
              >
                Pricing
              </a>
              {user ? (
                <Button
                  onClick={() =>
                    navigateTo(
                      user.role === "admin"
                        ? "admin-dashboard"
                        : "user-dashboard",
                    )
                  }
                >
                  Dashboard
                </Button>
              ) : (
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    onClick={() => navigateTo("login")}
                  >
                    Login
                  </Button>
                  <Button
                    className="bg-white text-blue-900 hover:bg-white/90"
                    onClick={() => navigateTo("register")}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                    onClick={() => navigateTo("admin-login")}
                  >
                    Admin
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <button
                onClick={() => {
                  navigateTo("home");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigateTo("track-courier");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Track Order
              </button>
              <a
                href="#services"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Services
              </a>
              <a
                href="#pricing"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Pricing
              </a>
              {user ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    navigateTo(
                      user.role === "admin"
                        ? "admin-dashboard"
                        : "user-dashboard",
                    );
                    setMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <div className="px-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigateTo("login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigateTo("register");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
                    onClick={() => {
                      navigateTo("admin-login");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Admin Login
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-white text-5xl font-bold mb-6 drop-shadow-md">
                India's Fastest Courier Service
              </h1>
              <p className="text-white/90 text-xl mb-8 drop-shadow-sm">
                Delivering happiness across India with speed,
                safety, and reliability. Track your packages in
                real-time and enjoy same-day delivery in major
                cities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() =>
                    navigateTo(
                      user ? "book-courier" : "register",
                    )
                  }
                >
                  <Package className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigateTo("track-courier")}
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Track Order
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-white font-bold text-3xl mb-1">500+</div>
                  <div className="text-white/80 text-sm">
                    Cities Covered
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-3xl mb-1">1M+</div>
                  <div className="text-white/80 text-sm">
                    Deliveries/Month
                  </div>
                </div>
                <div>
                  <div className="text-white font-bold text-3xl mb-1">98%</div>
                  <div className="text-white/80 text-sm">
                    On-Time Delivery
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transform hover:scale-105 transition-transform duration-300">
                <Truck className="h-64 w-64 text-white mx-auto drop-shadow-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-4 drop-shadow-md">
              Why Choose CourierHub?
            </h2>
            <p className="text-white/90 text-lg">
              Experience the best courier service in India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Same-day delivery in major cities. Express
                  delivery across India in 24-48 hours.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>100% Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your packages are insured and handled with
                  utmost care. Real-time tracking available.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Live Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your courier in real-time with our
                  advanced GPS tracking system.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Best Prices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Affordable pricing with no hidden charges. Get
                  instant quotes online.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-4 drop-shadow-md">Our Services</h2>
            <p className="text-white/90 text-lg">
              Comprehensive courier solutions for all your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-shadow border-t-4 border-blue-600">
              <CardHeader>
                <CardTitle>Domestic Courier</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>✓ Pan-India delivery network</li>
                  <li>✓ Door-to-door pickup & delivery</li>
                  <li>✓ Same-day delivery available</li>
                  <li>✓ Cash on delivery option</li>
                  <li>✓ Starting from ₹40</li>
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() =>
                    navigateTo(
                      user ? "book-courier" : "register",
                    )
                  }
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-t-4 border-green-600">
              <CardHeader>
                <CardTitle>Express Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>✓ 24-hour delivery guarantee</li>
                  <li>✓ Priority handling</li>
                  <li>✓ Real-time updates</li>
                  <li>✓ Dedicated support</li>
                  <li>✓ Starting from ₹80</li>
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() =>
                    navigateTo(
                      user ? "book-courier" : "register",
                    )
                  }
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow border-t-4 border-purple-600">
              <CardHeader>
                <CardTitle>Heavy Parcel</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>✓ Up to 50kg weight</li>
                  <li>✓ Special handling</li>
                  <li>✓ Insurance included</li>
                  <li>✓ Fragile item care</li>
                  <li>✓ Custom quotes</li>
                </ul>
                <Button
                  className="w-full mt-6"
                  onClick={() =>
                    navigateTo(
                      user ? "book-courier" : "register",
                    )
                  }
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl font-bold mb-4 drop-shadow-md">
              Simple Pricing
            </h2>
            <p className="text-white/90 text-lg">
              Transparent pricing with no hidden charges
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 max-w-2xl mx-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/90 font-medium">
                  Within City (up to 5kg)
                </span>
                <span className="text-white font-bold">₹40 - ₹60</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/90 font-medium">
                  Same State (up to 5kg)
                </span>
                <span className="text-white font-bold">
                  ₹60 - ₹100
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/90 font-medium">
                  Other States (up to 5kg)
                </span>
                <span className="text-white font-bold">
                  ₹80 - ₹150
                </span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/20">
                <span className="text-white/90 font-medium">
                  Express Delivery (24hrs)
                </span>
                <span className="text-white font-bold">
                  ₹150 - ₹300
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/90 font-medium">
                  Heavy Parcel (per kg)
                </span>
                <span className="text-white font-bold">
                  ₹20 - ₹40/kg
                </span>
              </div>
            </div>
            <Button
              className="w-full mt-8"
              size="lg"
              onClick={() =>
                navigateTo(user ? "book-courier" : "register")
              }
            >
              Get Instant Quote
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/10 backdrop-blur-md border-y border-white/20 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold drop-shadow-md">Ready to Ship Your Package?</h2>
          <p className="text-white/90 text-lg mb-8 drop-shadow-sm">
            Join thousands of satisfied customers who trust
            CourierHub for their delivery needs
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigateTo("register")}
            >
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => navigateTo("track-courier")}
            >
              Track Your Order
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white/80 py-12 px-4 sm:px-6 lg:px-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="h-6 w-6 text-blue-500" />
                <span className="text-white">CourierHub</span>
              </div>
              <p className="text-sm">
                India's fastest and most reliable courier
                service provider.
              </p>
            </div>
            <div>
              <h3 className="text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigateTo("home")}
                    className="hover:text-blue-400"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigateTo("track-courier")}
                    className="hover:text-blue-400"
                  >
                    Track Order
                  </button>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-blue-400"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-blue-400"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => {
                      window.location.hash = 'services';
                      navigateTo('home');
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left w-full"
                  >
                    Domestic Courier
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.hash = 'services';
                      navigateTo('home');
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left w-full"
                  >
                    Express Delivery
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.hash = 'services';
                      navigateTo('home');
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left w-full"
                  >
                    Heavy Parcel
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.hash = 'services';
                      navigateTo('home');
                    }}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-left w-full"
                  >
                    Corporate Solutions
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-4">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="tel:+18668807075" 
                    className="hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    📞 866-880-7075
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:support@courierhub.in" 
                    className="hover:text-blue-400 transition-colors inline-flex items-center gap-2"
                  >
                    📧 support@courierhub.in
                  </a>
                </li>
                <li className="text-gray-400">
                  🕐 24/7 Customer Support
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 CourierHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}