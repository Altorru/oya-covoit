import React from 'react';
import Icon from '../../../components/AppIcon';

const PickupLocation = ({ pickupDetails }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon name="Navigation" size={20} className="mr-2 text-primary" />
        Point de rendez-vous
      </h2>
      <div className="space-y-4">
        {/* Address */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-primary mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{pickupDetails?.name}</h3>
              <p className="text-muted-foreground mb-2">{pickupDetails?.address}</p>
              <p className="text-sm text-muted-foreground">
                Distance depuis votre position : {pickupDetails?.distance}
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="h-64 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={pickupDetails?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${pickupDetails?.coordinates?.lat},${pickupDetails?.coordinates?.lng}&z=15&output=embed`}
            className="w-full h-full"
          />
        </div>

        {/* Instructions */}
        <div className="bg-warning bg-opacity-10 border border-warning border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-warning mt-1" />
            <div>
              <h4 className="font-semibold text-warning mb-2">Instructions de rendez-vous</h4>
              <p className="text-sm text-foreground">{pickupDetails?.instructions}</p>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg maritime-transition hover:bg-primary/90">
            <Icon name="Phone" size={18} />
            <span>Appeler le conducteur</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-lg maritime-transition hover:bg-secondary/90">
            <Icon name="MessageCircle" size={18} />
            <span>Envoyer un message</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PickupLocation;