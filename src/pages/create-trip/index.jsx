import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DepartureCitySelector from './components/DepartureCitySelector';
import FerryScheduleSelector from './components/FerryScheduleSelector';
import SeatsPricingSection from './components/SeatsPricingSection';
import VehicleDetailsSection from './components/VehicleDetailsSection';
import PickupLocationSection from './components/PickupLocationSection';
import TripPreview from './components/TripPreview';

const CreateTrip = () => {
  const navigate = useNavigate();
  
  // Form state - simplified without direction selection
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedFerry, setSelectedFerry] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(1);
  const [passengerPrice, setPassengerPrice] = useState('');
  const [trunkSize, setTrunkSize] = useState('');
  const [vehicleFeatures, setVehicleFeatures] = useState([]);
  const [pickupAddress, setPickupAddress] = useState('');
  const [flexibilityRadius, setFlexibilityRadius] = useState('2');
  const [pickupNotes, setPickupNotes] = useState('');
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const totalSteps = 5;

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!selectedCity) {
          newErrors.city = 'Veuillez sélectionner votre ville de départ';
        }
        break;
      case 2:
        if (!selectedFerry) {
          newErrors.ferry = 'Veuillez sélectionner un ferry';
        }
        break;
      case 3:
        if (!availableSeats || availableSeats < 1) {
          newErrors.seats = 'Veuillez sélectionner le nombre de places';
        }
        if (!passengerPrice || parseInt(passengerPrice) < 1) {
          newErrors.price = 'Veuillez définir un prix par passager';
        }
        break;
      case 4:
        if (!trunkSize) {
          newErrors.trunkSize = 'Veuillez sélectionner la taille du coffre';
        }
        break;
      case 5:
        if (!pickupAddress?.trim()) {
          newErrors.address = 'Veuillez indiquer le point de rendez-vous';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePublish = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Navigate to confirmation page
    navigate('/booking-confirmation', {
      state: {
        type: 'trip_created',
        tripData: {
          selectedCity,
          selectedFerry,
          availableSeats,
          passengerPrice,
          trunkSize,
          vehicleFeatures,
          pickupAddress,
          flexibilityRadius,
          pickupNotes
        }
      }
    });
  };

  const tripData = {
    selectedCity,
    selectedFerry,
    availableSeats,
    passengerPrice,
    trunkSize,
    vehicleFeatures,
    pickupAddress,
    flexibilityRadius,
    pickupNotes
  };

  const getStepTitle = (step) => {
    const titles = {
      1: 'Ville de départ',
      2: 'Ferry et port',
      3: 'Places et prix',
      4: 'Véhicule',
      5: 'Rendez-vous'
    };
    return titles?.[step];
  };

  const isStepCompleted = (step) => {
    switch (step) {
      case 1: return selectedCity;
      case 2: return selectedFerry;
      case 3: return availableSeats && passengerPrice;
      case 4: return trunkSize;
      case 5: return pickupAddress;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/ferry-schedule-search')}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              Retour
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={24} color="white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Créer un trajet</h1>
              <p className="text-muted-foreground">
                Proposez un covoiturage basé sur les horaires de ferry
              </p>
            </div>
          </div>
        </div>

        {/* Progress Steps - Desktop */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5]?.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center space-x-3 ${step < 5 ? 'flex-1' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 maritime-transition ${
                    currentStep === step
                      ? 'border-primary bg-primary text-primary-foreground'
                      : isStepCompleted(step)
                      ? 'border-success bg-success text-success-foreground'
                      : 'border-border bg-background text-muted-foreground'
                  }`}>
                    {isStepCompleted(step) && currentStep !== step ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </div>
                  <div className="hidden lg:block">
                    <div className={`text-sm font-medium ${
                      currentStep === step ? 'text-primary' : 
                      isStepCompleted(step) ? 'text-success' : 'text-muted-foreground'
                    }`}>
                      {getStepTitle(step)}
                    </div>
                  </div>
                </div>
                {step < 5 && (
                  <div className={`flex-1 h-px mx-4 ${
                    isStepCompleted(step) ? 'bg-success' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Steps - Mobile */}
        <div className="md:hidden mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Étape {currentStep} sur {totalSteps}
            </span>
            <span className="text-sm text-muted-foreground">
              {getStepTitle(currentStep)}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full maritime-transition"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Departure City */}
            {currentStep === 1 && (
              <DepartureCitySelector
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
                error={errors?.city}
              />
            )}

            {/* Step 2: Ferry Schedule */}
            {currentStep === 2 && (
              <FerryScheduleSelector
                selectedFerry={selectedFerry}
                onFerryChange={setSelectedFerry}
                error={errors?.ferry}
              />
            )}

            {/* Step 3: Seats and Pricing */}
            {currentStep === 3 && (
              <SeatsPricingSection
                availableSeats={availableSeats}
                onSeatsChange={setAvailableSeats}
                passengerPrice={passengerPrice}
                onPriceChange={setPassengerPrice}
                selectedFerry={selectedFerry}
                seatsError={errors?.seats}
                priceError={errors?.price}
              />
            )}

            {/* Step 4: Vehicle Details */}
            {currentStep === 4 && (
              <VehicleDetailsSection
                trunkSize={trunkSize}
                onTrunkSizeChange={setTrunkSize}
                vehicleFeatures={vehicleFeatures}
                onVehicleFeaturesChange={setVehicleFeatures}
                trunkError={errors?.trunkSize}
              />
            )}

            {/* Step 5: Pickup Location */}
            {currentStep === 5 && (
              <PickupLocationSection
                pickupAddress={pickupAddress}
                onPickupAddressChange={setPickupAddress}
                flexibilityRadius={flexibilityRadius}
                onFlexibilityRadiusChange={setFlexibilityRadius}
                pickupNotes={pickupNotes}
                onPickupNotesChange={setPickupNotes}
                addressError={errors?.address}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                iconName="ChevronLeft"
                iconPosition="left"
                iconSize={16}
              >
                Précédent
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  variant="default"
                  onClick={handleNextStep}
                  iconName="ChevronRight"
                  iconPosition="right"
                  iconSize={16}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  variant="default"
                  onClick={handlePublish}
                  loading={isSubmitting}
                  iconName="Send"
                  iconPosition="right"
                  iconSize={16}
                  className="bg-success hover:bg-success/90"
                >
                  Publier le trajet
                </Button>
              )}
            </div>
          </div>

          {/* Trip Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TripPreview
                tripData={tripData}
                onEdit={() => setCurrentStep(1)}
                onPublish={handlePublish}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;