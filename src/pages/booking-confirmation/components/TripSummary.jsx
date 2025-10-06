import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TripSummary = ({ tripDetails }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })?.format(new Date(date));
  };

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(time));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon name="MapPin" size={20} className="mr-2 text-primary" />
        Détails du trajet
      </h2>
      <div className="space-y-4">
        {/* Ferry Information */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-primary">Ferry sélectionné</h3>
            <span className="text-sm text-muted-foreground">
              {tripDetails?.ferry?.company}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Départ</p>
              <p className="font-medium">{formatTime(tripDetails?.ferry?.departureTime)}</p>
              <p className="text-sm">{tripDetails?.ferry?.departurePort}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Arrivée</p>
              <p className="font-medium">{formatTime(tripDetails?.ferry?.arrivalTime)}</p>
              <p className="text-sm">{tripDetails?.ferry?.arrivalPort}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-sm">
              <span className="text-muted-foreground">Date : </span>
              <span className="font-medium">{formatDate(tripDetails?.ferry?.date)}</span>
            </p>
          </div>
        </div>

        {/* Driver Information */}
        <div className="flex items-start space-x-4">
          <Image
            src={tripDetails?.driver?.avatar}
            alt={tripDetails?.driver?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{tripDetails?.driver?.name}</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
              <div className="flex items-center">
                <Icon name="Star" size={16} className="mr-1 text-warning fill-current" />
                <span>{tripDetails?.driver?.rating}</span>
              </div>
              <div className="flex items-center">
                <Icon name="MessageCircle" size={16} className="mr-1" />
                <span>{tripDetails?.driver?.reviewCount} avis</span>
              </div>
              <div className="flex items-center">
                <Icon name="Car" size={16} className="mr-1" />
                <span>{tripDetails?.driver?.vehicle}</span>
              </div>
            </div>
            <p className="text-sm">{tripDetails?.driver?.bio}</p>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Ville de départ</span>
              <span className="font-medium">{tripDetails?.departureCity}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Heure de départ</span>
              <span className="font-medium">{formatTime(tripDetails?.departureTime)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Nombre de passagers</span>
              <span className="font-medium">{tripDetails?.passengerCount}</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Espace bagages</span>
              <span className="font-medium">{tripDetails?.luggageSpace}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Prix par personne</span>
              <span className="font-medium">{formatPrice(tripDetails?.pricePerPerson)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2">
              <span className="font-semibold">Total à payer</span>
              <span className="font-bold text-lg text-primary">
                {formatPrice(tripDetails?.totalPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripSummary;