import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FerryScheduleCard = ({ schedule, onSelectFerry, availableDrivers = 0 }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'limited':
        return 'text-warning bg-warning/10';
      case 'full':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'limited':
        return 'Places limitées';
      case 'full':
        return 'Complet';
      default:
        return 'Inconnu';
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 maritime-shadow-sm border border-border hover:maritime-shadow-md maritime-transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Ship" size={24} color="var(--color-primary)" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{schedule?.departure}</h4>
            <p className="text-sm text-muted-foreground">
              Arrivée: {schedule?.arrival}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule?.status)}`}>
          {getStatusText(schedule?.status)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{schedule?.price}€</p>
          <p className="text-xs text-muted-foreground">Prix ferry</p>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <p className="text-2xl font-bold text-primary">{availableDrivers}</p>
          <p className="text-xs text-muted-foreground">Conducteurs</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            Durée: {schedule?.duration}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="Users" size={16} color="var(--color-muted-foreground)" />
          <span className="text-sm text-muted-foreground">
            {schedule?.capacity} places
          </span>
        </div>
      </div>
      <Button
        variant="default"
        fullWidth
        onClick={() => onSelectFerry(schedule)}
        disabled={schedule?.status === 'full'}
        iconName="Search"
        iconPosition="left"
      >
        {availableDrivers > 0 ? 'Voir les conducteurs' : 'Rechercher conducteurs'}
      </Button>
    </div>
  );
};

export default FerryScheduleCard;