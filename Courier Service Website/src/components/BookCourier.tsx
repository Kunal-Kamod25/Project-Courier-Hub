import { useState } from 'react';
import { Package, MapPin, User, ArrowLeft, Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner@2.0.3';

export function BookCourier({ navigateTo, user }) {
  const [formData, setFormData] = useState({
    senderName: user?.fullName || '',
    senderPhone: user?.phone || '',
    senderAddress: user?.address || '',
    senderCity: user?.city || '',
    senderPincode: user?.pincode || '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    receiverCity: '',
    receiverPincode: '',
    serviceType: 'standard',
    weight: '',
    description: '',
    declaredValue: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      serviceType: value
    });
  };

  const calculatePrice = () => {
    const weight = parseFloat(formData.weight) || 0;
    let basePrice = 40;

    if (formData.senderCity.toLowerCase() !== formData.receiverCity.toLowerCase()) {
      basePrice = 80;
    }

    if (formData.serviceType === 'express') {
      basePrice += 100;
    } else if (formData.serviceType === 'heavy') {
      basePrice = weight * 30;
    }

    if (weight > 5) {
      basePrice += (weight - 5) * 20;
    }

    setEstimatedPrice(Math.round(basePrice));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!estimatedPrice) {
      toast.error('Please calculate price first!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
          price: estimatedPrice,
          status: 'Booked',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || 'Booking failed');
      }

      toast.success(`Booking successful! Tracking ID: ${data.trackingNumber}`);

      setTimeout(() => {
        navigateTo('user-dashboard');
      }, 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigateTo(user ? 'user-dashboard' : 'home')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-gray-900">Book Courier Service</CardTitle>
            <CardDescription>Fill in the details to book your courier</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sender Details */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Sender Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Name</Label>
                    <Input
                      id="senderName"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderPhone">Phone</Label>
                    <Input
                      id="senderPhone"
                      name="senderPhone"
                      value={formData.senderPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="senderAddress">Address</Label>
                    <Input
                      id="senderAddress"
                      name="senderAddress"
                      value={formData.senderAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderCity">City</Label>
                    <Input
                      id="senderCity"
                      name="senderCity"
                      value={formData.senderCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="senderPincode">PIN Code</Label>
                    <Input
                      id="senderPincode"
                      name="senderPincode"
                      value={formData.senderPincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Receiver Details */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Receiver Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receiverName">Name</Label>
                    <Input
                      id="receiverName"
                      name="receiverName"
                      value={formData.receiverName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverPhone">Phone</Label>
                    <Input
                      id="receiverPhone"
                      name="receiverPhone"
                      value={formData.receiverPhone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="receiverAddress">Address</Label>
                    <Input
                      id="receiverAddress"
                      name="receiverAddress"
                      value={formData.receiverAddress}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverCity">City</Label>
                    <Input
                      id="receiverCity"
                      name="receiverCity"
                      value={formData.receiverCity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiverPincode">PIN Code</Label>
                    <Input
                      id="receiverPincode"
                      name="receiverPincode"
                      value={formData.receiverPincode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div>
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-600" />
                  Package Details
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select value={formData.serviceType} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard Delivery (3-5 days)</SelectItem>
                        <SelectItem value="express">Express Delivery (1-2 days)</SelectItem>
                        <SelectItem value="heavy">Heavy Parcel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="declaredValue">Declared Value (₹)</Label>
                    <Input
                      id="declaredValue"
                      name="declaredValue"
                      type="number"
                      value={formData.declaredValue}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Price</Label>
                    <div className="flex gap-2">
                      <Input
                        value={estimatedPrice ? `₹${estimatedPrice}` : 'Click calculate'}
                        disabled
                      />
                      <Button type="button" onClick={calculatePrice}>
                        <Calculator className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Package Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the contents of your package"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" size="lg" disabled={loading}>
                  {loading ? 'Booking...' : `Book Courier - ${estimatedPrice ? `₹${estimatedPrice}` : 'Calculate Price'}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
