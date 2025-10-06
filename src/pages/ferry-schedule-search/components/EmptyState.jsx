import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ onCreateTrip }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Aucun trajet trouvé
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Aucun conducteur n'a encore créé de trajet pour ces horaires de ferry. 
        Soyez le premier à proposer un covoiturage !
      </p>
      <Button
        variant="default"
        onClick={onCreateTrip}
        iconName="Plus"
        iconPosition="left"
      >
        Créer un trajet
      </Button>
    </div>
  );
};

export default EmptyState;