import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingHeader from './components/BookingHeader';
import TripSummary from './components/TripSummary';
import PickupLocation from './components/PickupLocation';
import PaymentSummary from './components/PaymentSummary';
import TripCoordination from './components/TripCoordination';
import CancellationPolicy from './components/CancellationPolicy';
import NextSteps from './components/NextSteps';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  // Mock booking data - in real app this would come from route state or API
  const mockBookingData = {
    bookingReference: "OYA-2024-001234",
    status: "confirmed",
    tripDetails: {
      ferry: {
        company: "Yeu Continent",
        departureTime: "2024-10-07T08:30:00",
        arrivalTime: "2024-10-07T09:15:00",
        departurePort: "Fromentine",
        arrivalPort: "Port-Joinville",
        date: "2024-10-07T08:30:00"
      },
      driver: {
        name: "Marie Dubois",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        rating: 4.8,
        reviewCount: 127,
        vehicle: "Renault Scenic",
        bio: "Conductrice expérimentée, je fais régulièrement la liaison vers l'île d'Yeu. Toujours ponctuelle et bienveillante avec mes passagers."
      },
      departureCity: "La Roche-sur-Yon",
      departureTime: "2024-10-07T07:15:00",
      passengerCount: 2,
      luggageSpace: "2 valises moyennes",
      pricePerPerson: 15.00,
      totalPrice: 30.00
    },
    pickupDetails: {
      name: "Parking Carrefour La Roche-sur-Yon",
      address: "Avenue des Boires, 85000 La Roche-sur-Yon",
      distance: "2,3 km",
      coordinates: {
        lat: 46.6707,
        lng: -1.4266
      },
      instructions: `Rendez-vous côté sortie du magasin, près des bornes de recharge électrique. 
Je serai dans un Renault Scenic gris métallisé. 
N'hésitez pas à m'appeler si vous ne me trouvez pas !`
    },
    paymentDetails: {
      passengerCount: 2,
      basePrice: 30.00,
      fees: 2.50,
      total: 32.50
    },
    coordinationDetails: {
      driverName: "Marie Dubois",
      driverPhone: "06 12 34 56 78",
      driverEmail: "marie.dubois@email.com",
      destination: "Île d\'Yeu",
      departureTime: "2024-10-07T07:15:00",
      pickupLocation: "Parking Carrefour La Roche-sur-Yon",
      vehicle: {
        model: "Renault Scenic",
        color: "Gris métallisé",
        licensePlate: "AB-123-CD"
      }
    },
    cancellationPolicy: {
      totalAmount: 32.50,
      tripDate: "2024-10-07T07:15:00"
    }
  };

  const handlePaymentComplete = () => {
    setPaymentCompleted(true);
  };

  const handleCancelBooking = (reason) => {
    console.log('Booking cancelled:', reason);
    // In real app, this would call an API to cancel the booking
    navigate('/ferry-schedule-search');
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-4xl mx-auto">
          {/* Booking Header */}
          <BookingHeader 
            bookingReference={mockBookingData?.bookingReference}
            status={mockBookingData?.status}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Trip Summary */}
              <TripSummary tripDetails={mockBookingData?.tripDetails} />

              {/* Pickup Location */}
              <PickupLocation pickupDetails={mockBookingData?.pickupDetails} />

              {/* Trip Coordination */}
              <TripCoordination coordinationDetails={mockBookingData?.coordinationDetails} />

              {/* Cancellation Policy */}
              <CancellationPolicy 
                policyDetails={mockBookingData?.cancellationPolicy}
                onCancelBooking={handleCancelBooking}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Payment Summary */}
              {!paymentCompleted && (
                <PaymentSummary 
                  paymentDetails={mockBookingData?.paymentDetails}
                  onPaymentComplete={handlePaymentComplete}
                />
              )}

              {/* Next Steps */}
              <NextSteps bookingReference={mockBookingData?.bookingReference} />
            </div>
          </div>

          {/* Success Message for Payment */}
          {paymentCompleted && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-card rounded-lg p-8 text-center max-w-md w-full">
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Paiement confirmé !</h3>
                <p className="text-muted-foreground mb-6">
                  Votre réservation est maintenant finalisée. 
                  Vous recevrez un email de confirmation sous peu.
                </p>
                <button
                  onClick={() => setPaymentCompleted(false)}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg maritime-transition hover:bg-primary/90"
                >
                  Continuer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookingConfirmation;