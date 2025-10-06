import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DepartureCitySelector = ({ selectedCity, onCityChange, error }) => {
  const cityOptions = [
    { value: '', label: 'Sélectionnez votre ville de départ', disabled: true },
    { value: 'la-roche-sur-yon', label: 'La Roche-sur-Yon', description: 'Ville principale - 45 min du port' },
    { value: 'nantes', label: 'Nantes', description: 'Grande ville - 1h30 du port' },
    { value: 'les-sables-dolonne', label: 'Les Sables-d\'Olonne', description: 'Ville côtière - 30 min du port' },
    { value: 'challans', label: 'Challans', description: 'Ville locale - 25 min du port' },
    { value: 'saint-jean-de-monts', label: 'Saint-Jean-de-Monts', description: 'Station balnéaire - 20 min du port' },
    { value: 'fontenay-le-comte', label: 'Fontenay-le-Comte', description: 'Ville historique - 1h du port' },
    { value: 'lucon', label: 'Luçon', description: 'Ville épiscopale - 40 min du port' },
    { value: 'other', label: 'Autre ville', description: 'Précisez votre ville de départ' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Ville de départ</h3>
          <p className="text-sm text-muted-foreground">D'où partez-vous pour rejoindre le ferry ?</p>
        </div>
      </div>

      <Select
        label="Ville de départ"
        description="Sélectionnez votre point de départ pour le covoiturage"
        options={cityOptions}
        value={selectedCity}
        onChange={onCityChange}
        error={error}
        required
        searchable
        placeholder="Choisissez votre ville..."
        className="w-full"
      />

      {selectedCity === 'other' && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground mb-1">Ville personnalisée</p>
              <p className="text-muted-foreground">
                Vous pourrez préciser votre ville exacte et votre point de rendez-vous à l'étape suivante.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
        <Icon name="Clock" size={14} />
        <span>Les temps de trajet sont approximatifs depuis le centre-ville</span>
      </div>
    </div>
  );
};

export default DepartureCitySelector;