import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PickupLocationSection = ({ 
  pickupAddress, 
  onPickupAddressChange, 
  flexibilityRadius, 
  onFlexibilityRadiusChange,
  pickupNotes,
  onPickupNotesChange,
  addressError 
}) => {
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 46.6707, lng: -1.4266 }); // La Roche-sur-Yon coordinates

  const radiusOptions = [
    { value: '0', label: 'Point exact uniquement', description: 'Pas de flexibilité' },
    { value: '2', label: '2 km autour', description: 'Flexibilité limitée' },
    { value: '5', label: '5 km autour', description: 'Flexibilité modérée' },
    { value: '10', label: '10 km autour', description: 'Grande flexibilité' },
    { value: '15', label: '15 km autour', description: 'Très grande flexibilité' }
  ];

  const commonPickupPoints = [
    {
      name: 'Gare SNCF La Roche-sur-Yon',
      address: 'Place de la Gare, 85000 La Roche-sur-Yon',
      type: 'transport',
      icon: 'Train'
    },
    {
      name: 'Centre Commercial Galeries Lafayette',
      address: 'Rue du Général de Gaulle, 85000 La Roche-sur-Yon',
      type: 'shopping',
      icon: 'ShoppingBag'
    },
    {
      name: 'Parking Clemenceau',
      address: 'Place Clemenceau, 85000 La Roche-sur-Yon',
      type: 'parking',
      icon: 'Car'
    },
    {
      name: 'Hôtel de Ville',
      address: 'Place Napoléon, 85000 La Roche-sur-Yon',
      type: 'landmark',
      icon: 'Building'
    }
  ];

  const handleQuickSelect = (point) => {
    onPickupAddressChange(point?.address);
    setMapCenter({ lat: 46.6707, lng: -1.4266 }); // Mock coordinates
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position?.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          onPickupAddressChange(`Position actuelle (${latitude?.toFixed(4)}, ${longitude?.toFixed(4)})`);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-warning)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Point de rendez-vous</h3>
          <p className="text-sm text-muted-foreground">Où les passagers peuvent-ils vous rejoindre ?</p>
        </div>
      </div>
      {/* Address Input */}
      <div className="mb-6">
        <Input
          label="Adresse de rendez-vous"
          type="text"
          placeholder="Entrez l'adresse complète..."
          value={pickupAddress}
          onChange={(e) => onPickupAddressChange(e?.target?.value)}
          error={addressError}
          description="Adresse précise où vous récupérerez les passagers"
          required
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCurrentLocation}
            iconName="Crosshair"
            iconPosition="left"
            iconSize={14}
          >
            Position actuelle
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMap(!showMap)}
            iconName={showMap ? 'EyeOff' : 'Eye'}
            iconPosition="left"
            iconSize={14}
          >
            {showMap ? 'Masquer' : 'Voir'} la carte
          </Button>
        </div>
      </div>
      {/* Quick Select Points */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Points de rendez-vous populaires
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commonPickupPoints?.map((point, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickSelect(point)}
              className="p-3 text-left rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 maritime-transition"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={point?.icon} size={14} color="var(--color-primary)" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground text-sm">{point?.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{point?.address}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Flexibility Radius */}
      <div className="mb-6">
        <Select
          label="Rayon de flexibilité"
          description="Distance autour du point de rendez-vous où vous acceptez de récupérer les passagers"
          options={radiusOptions}
          value={flexibilityRadius}
          onChange={onFlexibilityRadiusChange}
          placeholder="Sélectionnez un rayon..."
        />
      </div>
      {/* Map Display */}
      {showMap && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-3">
            Localisation sur la carte
          </label>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Point de rendez-vous"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`}
              className="border-0"
            />
          </div>
          <div className="mt-2 text-xs text-muted-foreground">
            Cliquez et faites glisser pour ajuster la position exacte
          </div>
        </div>
      )}
      {/* Additional Notes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Instructions supplémentaires (optionnel)
        </label>
        <textarea
          value={pickupNotes}
          onChange={(e) => onPickupNotesChange(e?.target?.value)}
          placeholder="Ex: Parking gratuit disponible, proche de l'entrée principale, appeler en arrivant..."
          className="w-full h-20 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          maxLength={200}
        />
        <div className="mt-1 text-xs text-muted-foreground text-right">
          {pickupNotes?.length}/200 caractères
        </div>
      </div>
      {/* Flexibility Preview */}
      {flexibilityRadius && parseInt(flexibilityRadius) > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">Zone de récupération</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Les passagers pourront demander à être récupérés dans un rayon de{' '}
            <span className="font-medium text-foreground">{flexibilityRadius} km</span> autour de votre point de rendez-vous.
            Vous pourrez accepter ou refuser selon la faisabilité.
          </div>
        </div>
      )}
      <div className="mt-6 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Conseils pour le point de rendez-vous :</p>
            <ul className="space-y-1">
              <li>• Choisissez un lieu facile à trouver et accessible</li>
              <li>• Privilégiez les parkings gratuits ou les transports en commun</li>
              <li>• Évitez les zones à circulation dense aux heures de pointe</li>
              <li>• Précisez les détails pratiques dans les instructions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupLocationSection;