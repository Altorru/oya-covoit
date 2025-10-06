import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const departureCities = [
    { value: 'la-roche-sur-yon', label: 'La Roche-sur-Yon' },
    { value: 'nantes', label: 'Nantes' },
    { value: 'saint-nazaire', label: 'Saint-Nazaire' },
    { value: 'les-sables-dolonne', label: 'Les Sables-d\'Olonne' },
    { value: 'challans', label: 'Challans' },
    { value: 'saint-jean-de-monts', label: 'Saint-Jean-de-Monts' }
  ];

  const luggageOptions = [
    { value: 'small', label: 'Petit bagage (sac à dos)' },
    { value: 'medium', label: 'Bagage moyen (valise)' },
    { value: 'large', label: 'Gros bagage (valise XL)' },
    { value: 'bike', label: 'Vélo' },
    { value: 'surfboard', label: 'Planche de surf' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handlePriceRangeChange = (type, value) => {
    const newPriceRange = { ...localFilters?.priceRange, [type]: parseInt(value) };
    handleFilterChange('priceRange', newPriceRange);
  };

  const resetFilters = () => {
    const resetFilters = {
      departureCity: '',
      maxPrice: 50,
      priceRange: { min: 0, max: 50 },
      luggageSpace: [],
      proximityRadius: 10,
      instantBooking: false,
      verifiedDrivers: false
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  return (
    <div className="bg-card rounded-lg maritime-shadow-sm border border-border">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Filtres de recherche</h3>
        <Button
          variant="ghost"
          onClick={onToggle}
          iconName={isOpen ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="md:hidden"
        >
          {isOpen ? 'Masquer' : 'Afficher'}
        </Button>
      </div>
      <div className={`p-4 space-y-6 ${!isOpen ? 'hidden md:block' : ''}`}>
        {/* Departure City */}
        <div>
          <Select
            label="Ville de départ"
            placeholder="Sélectionner une ville"
            options={departureCities}
            value={localFilters?.departureCity}
            onChange={(value) => handleFilterChange('departureCity', value)}
            searchable
            clearable
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Fourchette de prix (€)
          </label>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Min</label>
              <input
                type="range"
                min="0"
                max="50"
                value={localFilters?.priceRange?.min}
                onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground">{localFilters?.priceRange?.min}€</span>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Max</label>
              <input
                type="range"
                min="0"
                max="50"
                value={localFilters?.priceRange?.max}
                onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-foreground">{localFilters?.priceRange?.max}€</span>
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Prix suggéré: {Math.round((localFilters?.priceRange?.min + localFilters?.priceRange?.max) / 2)}€
          </div>
        </div>

        {/* Luggage Space */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Espace bagages requis
          </label>
          <div className="space-y-2">
            {luggageOptions?.map((option) => (
              <Checkbox
                key={option?.value}
                label={option?.label}
                checked={localFilters?.luggageSpace?.includes(option?.value)}
                onChange={(e) => {
                  const newLuggage = e?.target?.checked
                    ? [...localFilters?.luggageSpace, option?.value]
                    : localFilters?.luggageSpace?.filter(item => item !== option?.value);
                  handleFilterChange('luggageSpace', newLuggage);
                }}
              />
            ))}
          </div>
        </div>

        {/* Proximity Radius */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Rayon de proximité: {localFilters?.proximityRadius} km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={localFilters?.proximityRadius}
            onChange={(e) => handleFilterChange('proximityRadius', parseInt(e?.target?.value))}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3">
          <Checkbox
            label="Réservation instantanée"
            description="Conducteurs acceptant les réservations automatiques"
            checked={localFilters?.instantBooking}
            onChange={(e) => handleFilterChange('instantBooking', e?.target?.checked)}
          />
          
          <Checkbox
            label="Conducteurs vérifiés uniquement"
            description="Profils avec vérification d'identité"
            checked={localFilters?.verifiedDrivers}
            onChange={(e) => handleFilterChange('verifiedDrivers', e?.target?.checked)}
          />
        </div>

        {/* Reset Button */}
        <div className="pt-4 border-t border-border">
          <Button
            variant="outline"
            fullWidth
            onClick={resetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Réinitialiser les filtres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;