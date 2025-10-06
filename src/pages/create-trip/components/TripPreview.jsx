import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripPreview = ({ tripData, onEdit, onPublish }) => {
  const formatTime = (time) => {
    if (!time) return '--:--';
    return new Date(`2024-01-01T${time}:00`)?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFeatureIcon = (featureId) => {
    const iconMap = {
      air_conditioning: 'Wind',
      wifi: 'Wifi',
      phone_charger: 'Battery',
      music_system: 'Music',
      child_seat: 'Baby',
      pet_friendly: 'Heart',
      non_smoking: 'Shield',
      bike_rack: 'Bike'
    };
    return iconMap?.[featureId] || 'Check';
  };

  const getFeatureLabel = (featureId) => {
    const labelMap = {
      air_conditioning: 'Climatisation',
      wifi: 'Wi-Fi',
      phone_charger: 'Chargeur',
      music_system: 'Audio',
      child_seat: 'Siège enfant',
      pet_friendly: 'Animaux OK',
      non_smoking: 'Non-fumeur',
      bike_rack: 'Porte-vélos'
    };
    return labelMap?.[featureId] || featureId;
  };

  const getTrunkSizeLabel = (size) => {
    const sizeMap = {
      small: 'Petit coffre',
      medium: 'Coffre moyen',
      large: 'Grand coffre',
      xl: 'Très grand coffre'
    };
    return sizeMap?.[size] || size;
  };

  const getCityLabel = (cityValue) => {
    const cityMap = {
      'la-roche-sur-yon': 'La Roche-sur-Yon',
      'nantes': 'Nantes',
      'les-sables-dolonne': 'Les Sables-d\'Olonne',
      'challans': 'Challans',
      'saint-jean-de-monts': 'Saint-Jean-de-Monts',
      'fontenay-le-comte': 'Fontenay-le-Comte',
      'lucon': 'Luçon',
      'other': 'Autre ville'
    };
    return cityMap?.[cityValue] || cityValue;
  };

  if (!tripData?.selectedFerry) {
    return (
      <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
        <div className="text-center py-8">
          <Icon name="Eye" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Aperçu du trajet</h3>
          <p className="text-muted-foreground">
            Remplissez les informations ci-dessus pour voir l'aperçu de votre annonce
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Eye" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Aperçu de votre annonce</h3>
            <p className="text-sm text-muted-foreground">Voici comment les passagers verront votre trajet</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          iconName="Edit"
          iconPosition="left"
          iconSize={16}
        >
          Modifier
        </Button>
      </div>
      {/* Trip Card Preview */}
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 bg-primary/5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={20} color="white" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Votre nom</div>
              <div className="text-sm text-muted-foreground">Conducteur vérifié</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{tripData?.passengerPrice} €</div>
            <div className="text-sm text-muted-foreground">par personne</div>
          </div>
        </div>

        {/* Route */}
        <div className="mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="w-3 h-3 bg-success rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium text-foreground">
                {getCityLabel(tripData?.selectedCity)}
              </div>
              <div className="text-xs text-muted-foreground">Départ</div>
            </div>
            
            <div className="flex-1 flex items-center space-x-2">
              <div className="flex-1 h-px bg-border"></div>
              <Icon name="Ship" size={16} color="var(--color-primary)" />
              <div className="flex-1 h-px bg-border"></div>
            </div>
            
            <div className="text-center">
              <div className="w-3 h-3 bg-error rounded-full mx-auto mb-1"></div>
              <div className="text-sm font-medium text-foreground">Île d'Yeu</div>
              <div className="text-xs text-muted-foreground">Arrivée</div>
            </div>
          </div>
        </div>

        {/* Ferry Details */}
        <div className="mb-4 p-3 bg-background rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-foreground">{tripData?.selectedFerry?.company}</div>
              <div className="text-sm text-muted-foreground">{tripData?.selectedFerry?.vessel}</div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {formatTime(tripData?.selectedFerry?.departure)} → {formatTime(tripData?.selectedFerry?.arrival)}
              </div>
              <div className="text-sm text-muted-foreground">{tripData?.selectedFerry?.duration}</div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">
              {tripData?.availableSeats} place{tripData?.availableSeats > 1 ? 's' : ''} disponible{tripData?.availableSeats > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Package" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-foreground">{getTrunkSizeLabel(tripData?.trunkSize)}</span>
          </div>
        </div>

        {/* Vehicle Features */}
        {tripData?.vehicleFeatures && tripData?.vehicleFeatures?.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-foreground mb-2">Équipements</div>
            <div className="flex flex-wrap gap-2">
              {tripData?.vehicleFeatures?.map((feature) => (
                <div key={feature} className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Icon name={getFeatureIcon(feature)} size={12} color="var(--color-primary)" />
                  <span className="text-xs text-primary">{getFeatureLabel(feature)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pickup Location */}
        {tripData?.pickupAddress && (
          <div className="mb-4 p-3 bg-background rounded-lg border border-border">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} color="var(--color-warning)" className="mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">Point de rendez-vous</div>
                <div className="text-sm text-muted-foreground">{tripData?.pickupAddress}</div>
                {tripData?.flexibilityRadius && parseInt(tripData?.flexibilityRadius) > 0 && (
                  <div className="text-xs text-primary mt-1">
                    Flexibilité: {tripData?.flexibilityRadius} km autour
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Additional Notes */}
        {tripData?.pickupNotes && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground">{tripData?.pickupNotes}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            iconName="MessageCircle"
            iconPosition="left"
            iconSize={16}
          >
            Contacter
          </Button>
          <Button
            variant="default"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
          >
            Réserver
          </Button>
        </div>
      </div>
      {/* Publish Section */}
      <div className="mt-6 p-4 bg-success/5 rounded-lg border border-success/20">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-success mb-1">Prêt à publier ?</div>
            <div className="text-sm text-muted-foreground">
              Votre annonce sera visible par tous les passagers recherchant ce ferry
            </div>
          </div>
          <Button
            variant="default"
            onClick={onPublish}
            iconName="Send"
            iconPosition="right"
            iconSize={16}
            className="bg-success hover:bg-success/90"
          >
            Publier le trajet
          </Button>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Après publication :</p>
            <ul className="space-y-1">
              <li>• Les passagers pourront voir et réserver votre trajet</li>
              <li>• Vous recevrez des notifications pour chaque demande</li>
              <li>• Vous pourrez modifier ou annuler jusqu'à 2h avant le départ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPreview;