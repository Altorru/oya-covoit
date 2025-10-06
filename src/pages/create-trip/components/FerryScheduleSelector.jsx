import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FerryScheduleSelector = ({ selectedFerry, onFerryChange, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedPort, setSelectedPort] = useState('fromentine');

  const ports = [
    { value: 'fromentine', label: 'Fromentine' },
    { value: 'saint-gilles', label: 'Saint-Gilles-Croix-de-Vie' },
    { value: 'barbatre', label: 'Barbâtre' }
  ];

  // Updated ferry schedules data with fixed Compagnie Vendéenne
  const ferrySchedules = {
    fromentine: [
      {
        id: 'yc-0730-f',
        company: 'Yeu Continent',
        departure: '07:30',
        arrival: '08:15',
        duration: '45 min',
        vessel: 'Insula Oya III',
        status: 'confirmed',
        price: '32.50',
        port: 'fromentine'
      },
      {
        id: 'yc-0930-f',
        company: 'Yeu Continent',
        departure: '09:30',
        arrival: '10:15',
        duration: '45 min',
        vessel: 'Châtelet',
        status: 'confirmed',
        price: '32.50',
        port: 'fromentine'
      },
      {
        id: 'yc-1430-f',
        company: 'Yeu Continent',
        departure: '14:30',
        arrival: '15:15',
        duration: '45 min',
        vessel: 'Insula Oya III',
        status: 'confirmed',
        price: '32.50',
        port: 'fromentine'
      }
    ],
    'saint-gilles': [
      {
        id: 'cv-0900-sg',
        company: 'Compagnie Vendéenne',
        departure: '09:00',
        arrival: '09:50',
        duration: '50 min',
        vessel: 'Vendée',
        status: 'confirmed',
        price: '28.00',
        port: 'saint-gilles'
      },
      {
        id: 'cv-1115-sg',
        company: 'Compagnie Vendéenne',
        departure: '11:15',
        arrival: '12:05',
        duration: '50 min',
        vessel: 'Île d\'Yeu',
        status: 'confirmed',
        price: '28.00',
        port: 'saint-gilles'
      },
      {
        id: 'cv-1545-sg',
        company: 'Compagnie Vendéenne',
        departure: '15:45',
        arrival: '16:35',
        duration: '50 min',
        vessel: 'Vendée',
        status: 'confirmed',
        price: '28.00',
        port: 'saint-gilles'
      }
    ],
    barbatre: [
      {
        id: 'cv-1030-b',
        company: 'Compagnie Vendéenne',
        departure: '10:30',
        arrival: '11:15',
        duration: '45 min',
        vessel: 'Noirmoutier',
        status: 'confirmed',
        price: '30.00',
        port: 'barbatre'
      },
      {
        id: 'cv-1400-b',
        company: 'Compagnie Vendéenne',
        departure: '14:00',
        arrival: '14:45',
        duration: '45 min',
        vessel: 'Noirmoutier',
        status: 'confirmed',
        price: '30.00',
        port: 'barbatre'
      }
    ]
  };

  const refreshSchedules = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLastUpdated(new Date());
    setIsLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success';
      case 'delayed': return 'text-warning';
      case 'cancelled': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'delayed': return 'Clock';
      case 'cancelled': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatTime = (time) => {
    return new Date(`2024-01-01T${time}:00`)?.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Ship" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Horaires des ferries</h3>
            <p className="text-sm text-muted-foreground">
              Dernière mise à jour: {lastUpdated?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshSchedules}
          loading={isLoading}
          iconName="RefreshCw"
          iconPosition="left"
          iconSize={16}
        >
          Actualiser
        </Button>
      </div>

      {/* Port Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">Choisissez votre port de départ</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {ports?.map((port) => (
            <button
              key={port?.value}
              type="button"
              onClick={() => setSelectedPort(port?.value)}
              className={`p-4 rounded-lg border-2 maritime-transition text-center ${
                selectedPort === port?.value
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon name="MapPin" size={18} />
                <span className="font-medium">{port?.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ferry Schedule List */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Vers l'Île d'Yeu depuis {ports?.find(p => p?.value === selectedPort)?.label}
        </label>
        
        {ferrySchedules?.[selectedPort]?.map((ferry) => (
          <div
            key={ferry?.id}
            onClick={() => onFerryChange(ferry)}
            className={`p-4 rounded-lg border-2 cursor-pointer maritime-transition ${
              selectedFerry?.id === ferry?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{formatTime(ferry?.departure)}</div>
                  <div className="text-xs text-muted-foreground">Départ</div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-px bg-border"></div>
                  <Icon name="Ship" size={16} color="var(--color-muted-foreground)" />
                  <div className="w-8 h-px bg-border"></div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-semibold text-foreground">{formatTime(ferry?.arrival)}</div>
                  <div className="text-xs text-muted-foreground">Arrivée</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={getStatusIcon(ferry?.status)} size={14} className={getStatusColor(ferry?.status)} />
                  <span className={`text-xs font-medium ${getStatusColor(ferry?.status)}`}>
                    {ferry?.status === 'confirmed' ? 'Confirmé' : 
                     ferry?.status === 'delayed' ? 'Retardé' : 'Annulé'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">{ferry?.company}</div>
                <div className="text-sm text-muted-foreground">{ferry?.vessel}</div>
                <div className="text-sm font-medium text-foreground">{ferry?.price} €</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} color="var(--color-error)" />
            <span className="text-sm text-error">{error}</span>
          </div>
        </div>
      )}

      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium mb-1">Informations importantes :</p>
            <ul className="space-y-1">
              <li>• Les horaires peuvent changer selon les conditions météorologiques</li>
              <li>• Arrivée recommandée 30 minutes avant le départ</li>
              <li>• Les prix affichés sont pour un passager adulte</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FerryScheduleSelector;