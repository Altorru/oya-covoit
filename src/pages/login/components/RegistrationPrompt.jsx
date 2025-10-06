import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationPrompt = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'Search',
      title: 'Recherche Facile',
      description: 'Trouvez des covoiturages basés sur les horaires de ferry'
    },
    {
      icon: 'MapPin',
      title: 'Géolocalisation',
      description: 'Conducteurs proches de votre position'
    },
    {
      icon: 'Euro',
      title: 'Prix Équitables',
      description: 'Tarifs suggérés automatiquement'
    },
    {
      icon: 'Shield',
      title: 'Sécurisé',
      description: 'Profils vérifiés et évaluations'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Registration Prompt */}
      <div className="text-center p-6 bg-muted/30 rounded-lg border border-border">
        <div className="mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="UserPlus" size={24} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nouveau utilisateur ?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Rejoignez notre communauté de voyageurs et découvrez le covoiturage maritime
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/register')}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={16}
          fullWidth
        >
          Créer un compte
        </Button>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-2 gap-4">
        {benefits?.map((benefit, index) => (
          <div key={index} className="text-center p-3 bg-card rounded-lg border border-border">
            <div className="flex justify-center mb-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={benefit?.icon} size={16} color="var(--color-primary)" />
              </div>
            </div>
            <h4 className="font-medium text-xs text-foreground mb-1">
              {benefit?.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-tight">
              {benefit?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Additional Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          En vous inscrivant, vous acceptez nos{' '}
          <button className="text-primary hover:text-primary/80 maritime-transition">
            conditions d'utilisation
          </button>{' '}
          et notre{' '}
          <button className="text-primary hover:text-primary/80 maritime-transition">
            politique de confidentialité
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPrompt;