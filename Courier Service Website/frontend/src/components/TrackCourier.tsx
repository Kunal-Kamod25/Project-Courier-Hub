import { useState } from 'react';
import { Package, Search, MapPin, Clock, CheckCircle, Truck, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner@2.0.3';

export function TrackCourier({ navigateTo, user }) {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    
    const bookings = JSON.parse(localStorage.getItem('courierBookings') || '[]');
    const booking = bookings.find(b => b.trackingNumber === trackingNumber.toUpperCase());

    if (booking) {
      setTrackingResult(booking);
      toast.success('Tracking information found!');
    } else {
      setTrackingResult(null);
      toast.error('Tracking number not found!');
    }
  };

  const getStatusSteps = (status) => {
    const steps = [
      { name: 'Booked', icon: Package, completed: false },
      { name: 'Picked Up', icon: Truck, completed: false },
      { name: 'In Transit', icon: MapPin, completed: false },
      { name: 'Out for Delivery', icon: Truck, completed: false },
      { name: 'Delivered', icon: CheckCircle, completed: false }
    ];

    const statusOrder = ['Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
    const currentIndex = statusOrder.indexOf(status);

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex
    }));
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigateTo(user ? 'user-dashboard' : 'home')}
          className="mb-6 text-white hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-xl mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-lg">
                <Search className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-white text-2xl drop-shadow-md">Track Your Courier</CardTitle>
            <CardDescription>Enter your tracking number to view shipment details</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleTrack} className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter Tracking Number (e.g., TRKXXXXXX)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  required
                  className="uppercase"
                />
              </div>
              <Button type="submit">
                <Search className="h-4 w-4 mr-2" />
                Track
              </Button>
            </form>
          </CardContent>
        </Card>

        {trackingResult && (
          <div className="space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Shipment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white/80">Tracking Number</Label>
                    <p className="text-white font-bold">{trackingResult.trackingNumber}</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Booking ID</Label>
                    <p>{trackingResult.id}</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Current Status</Label>
                    <p className="text-white font-bold">{trackingResult.status}</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Service Type</Label>
                    <p className="capitalize">{trackingResult.serviceType}</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Weight</Label>
                    <p>{trackingResult.weight} kg</p>
                  </div>
                  <div>
                    <Label className="text-white/80">Total Amount</Label>
                    <p>₹{trackingResult.price}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80">From</Label>
                      <p>{trackingResult.senderName}</p>
                      <p className="text-sm text-white/80">{trackingResult.senderCity}, {trackingResult.senderPincode}</p>
                    </div>
                    <div>
                      <Label className="text-white/80">To</Label>
                      <p>{trackingResult.receiverName}</p>
                      <p className="text-sm text-white/80">{trackingResult.receiverCity}, {trackingResult.receiverPincode}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 border-white/20">
                  <Label className="text-white/80">Estimated Delivery</Label>
                  <p className="flex items-center gap-2 mt-1">
                    <Clock className="h-4 w-4 text-white" />
                    {new Date(trackingResult.estimatedDelivery).toLocaleDateString('en-IN', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Tracking Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getStatusSteps(trackingResult.status).map((step, index) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.name} className="flex items-center gap-4">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          step.completed ? 'bg-green-500' : 'bg-white/20'
                        }`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className={step.completed ? 'text-green-400' : 'text-white/60'}>
                            {step.name}
                          </p>
                          {step.completed && (
                            <p className="text-sm text-white/50">
                              Completed
                            </p>
                          )}
                        </div>
                        {step.completed && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
