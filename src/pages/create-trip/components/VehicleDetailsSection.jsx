import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const VehicleDetailsSection = ({ 
  trunkSize, 
  onTrunkSizeChange, 
  vehicleFeatures, 
  onVehicleFeaturesChange,
  trunkError 
}) => {
  const trunkSizeOptions = [
    { value: '', label: 'Sélectionnez la taille du coffre', disabled: true },
    { value: 'small', label: 'Petit coffre', description: '1-2 valises cabine ou sacs à dos' },
    { value: 'medium', label: 'Coffre moyen', description: '2-3 valises moyennes ou équipement de plage' },
    { value: 'large', label: 'Grand coffre', description: '4+ valises ou matériel volumineux' },
    { value: 'xl', label: 'Très grand coffre', description: 'Véhicules utilitaires, espace illimité' }
  ];

  const availableFeatures = [
    {
      id: 'air_conditioning',
      label: 'Climatisation',
      description: 'Véhicule climatisé',
      icon: 'Wind'
    },
    {
      id: 'wifi',
      label: 'Wi-Fi',
      description: 'Connexion internet mobile',
      icon: 'Wifi'
    },
    {
      id: 'phone_charger',
      label: 'Chargeur téléphone',
      description: 'USB ou prise 12V disponible',
      icon: 'Battery'
    },
    {
      id: 'music_system',
      label: 'Système audio',
      description: 'Bluetooth ou prise auxiliaire',
      icon: 'Music'
    },
    {
      id: 'child_seat',
      label: 'Siège enfant',
      description: 'Siège auto disponible sur demande',
      icon: 'Baby'
    },
    {
      id: 'pet_friendly',
      label: 'Animaux acceptés',
      description: 'Voyage avec animaux de compagnie',
      icon: 'Heart'
    },
    {
      id: 'non_smoking',
      label: 'Non-fumeur',
      description: 'Véhicule non-fumeur',
      icon: 'Shield'
    },
    {
      id: 'bike_rack',
      label: 'Porte-vélos',
      description: 'Transport de vélos possible',
      icon: 'Bike'
    }
  ];

  const handleFeatureChange = (featureId, checked) => {
    const updatedFeatures = checked
      ? [...vehicleFeatures, featureId]
      : vehicleFeatures?.filter(id => id !== featureId);
    onVehicleFeaturesChange(updatedFeatures);
  };

  const getTrunkIcon = (size) => {
    switch (size) {
      case 'small': return 'Package';
      case 'medium': return 'Package2';
      case 'large': return 'PackageOpen';
      case 'xl': return 'Truck';
      default: return 'Package';
    }
  };

  const getTrunkColor = (size) => {
    switch (size) {
      case 'small': return 'var(--color-warning)';
      case 'medium': return 'var(--color-primary)';
      case 'large': return 'var(--color-success)';
      case 'xl': return 'var(--color-secondary)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
          <Icon name="Car" size={20} color="var(--color-success)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Détails du véhicule</h3>
          <p className="text-sm text-muted-foreground">Informations sur votre véhicule et équipements</p>
        </div>
      </div>
      {/* Trunk Size Selection */}
      <div className="mb-6">
        <Select
          label="Taille du coffre"
          description="Capacité de stockage pour les bagages des passagers"
          options={trunkSizeOptions}
          value={trunkSize}
          onChange={onTrunkSizeChange}
          error={trunkError}
          required
          placeholder="Choisissez la taille..."
        />

        {trunkSize && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getTrunkIcon(trunkSize)} 
                size={24} 
                color={getTrunkColor(trunkSize)} 
              />
              <div>
                <div className="font-medium text-foreground">
                  {trunkSizeOptions?.find(opt => opt?.value === trunkSize)?.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {trunkSizeOptions?.find(opt => opt?.value === trunkSize)?.description}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Vehicle Features */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-4">
          Équipements et services (optionnel)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {availableFeatures?.map((feature) => (
            <div key={feature?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 maritime-transition">
              <Checkbox
                checked={vehicleFeatures?.includes(feature?.id)}
                onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon name={feature?.icon} size={16} color="var(--color-primary)" />
                  <label className="text-sm font-medium text-foreground cursor-pointer">
                    {feature?.label}
                  </label>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Selected Features Summary */}
      {vehicleFeatures?.length > 0 && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="CheckCircle" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              Équipements sélectionnés ({vehicleFeatures?.length})
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {vehicleFeatures?.map((featureId) => {
              const feature = availableFeatures?.find(f => f?.id === featureId);
              return (
                <div key={featureId} className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-full">
                  <Icon name={feature?.icon} size={12} color="var(--color-primary)" />
                  <span className="text-xs text-primary">{feature?.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-6 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Conseils :</p>
            <ul className="space-y-1">
              <li>• Plus d'équipements = plus d'attractivité pour les passagers</li>
              <li>• Soyez précis sur la capacité de bagages pour éviter les malentendus</li>
              <li>• Les équipements de confort peuvent justifier un prix légèrement plus élevé</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsSection;