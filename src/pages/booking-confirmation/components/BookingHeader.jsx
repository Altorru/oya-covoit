import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingHeader = ({ bookingReference, status }) => {
  return (
    <div className="bg-success text-success-foreground p-6 rounded-lg mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Icon name="CheckCircle" size={32} color="white" />
        </div>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Réservation confirmée !</h1>
        <p className="text-lg opacity-90 mb-2">
          Votre trajet en covoiturage est confirmé
        </p>
        <div className="bg-white bg-opacity-20 rounded-lg p-3 inline-block">
          <p className="text-sm font-medium">Référence de réservation</p>
          <p className="text-xl font-bold">{bookingReference}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;