import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DestinationSelector = ({ selectedRoute, onRouteChange, routes }) => {
  const [selectedPort, setSelectedPort] = useState('');
  const [selectedDirection, setSelectedDirection] = useState('');

  const ports = [
    { value: 'fromentine', label: 'Fromentine' },
    { value: 'saint-gilles', label: 'Saint-Gilles-Croix-de-Vie' },
    { value: 'barbatre', label: 'Barbâtre' }
  ];

  const directions = [
    { value: 'vers', label: 'Vers' },
    { value: 'depuis', label: 'Depuis' }
  ];

  const handlePortChange = (port) => {
    setSelectedPort(port);
    if (selectedDirection) {
      const portName = ports?.find(p => p?.value === port)?.label;
      const routeValue = `${selectedDirection}-${port}`;
      const routeLabel = selectedDirection === 'vers' ? `Vers ${portName}` : `Depuis ${portName}`;
      onRouteChange(routeValue);
    }
  };

  const handleDirectionChange = (direction) => {
    setSelectedDirection(direction);
    if (selectedPort) {
      const portName = ports?.find(p => p?.value === selectedPort)?.label;
      const routeValue = `${direction}-${selectedPort}`;
      const routeLabel = direction === 'vers' ? `Vers ${portName}` : `Depuis ${portName}`;
      onRouteChange(routeValue);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 maritime-shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Destination</h3>
      
      {/* Direction Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">Direction</label>
        <div className="grid grid-cols-2 gap-2">
          {directions?.map((direction) => (
            <button
              key={direction?.value}
              type="button"
              onClick={() => handleDirectionChange(direction?.value)}
              className={`p-3 rounded-lg border-2 maritime-transition text-center ${
                selectedDirection === direction?.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon 
                  name={direction?.value === 'vers' ? 'ArrowRight' : 'ArrowLeft'} 
                  size={16} 
                />
                <span className="font-medium">{direction?.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Port Selection */}
      <Select
        label="Sélectionnez le port"
        placeholder="Choisir un port"
        options={ports}
        value={selectedPort}
        onChange={handlePortChange}
        required
      />

      {/* Current Selection Display */}
      {selectedRoute && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-primary">
              {selectedDirection === 'vers' 
                ? `Vers ${ports?.find(p => p?.value === selectedPort)?.label}`
                : `Depuis ${ports?.find(p => p?.value === selectedPort)?.label}`
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DestinationSelector;