import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NextSteps = ({ bookingReference }) => {
  const navigate = useNavigate();

  const nextSteps = [
    {
      icon: 'Clock',
      title: 'Arrivez à l\'heure',
      description: 'Soyez au point de rendez-vous 10 minutes avant l\'heure convenue',
      color: 'text-primary'
    },
    {
      icon: 'Phone',
      title: 'Contactez le conducteur',
      description: 'Présentez-vous et confirmez les détails du trajet',
      color: 'text-secondary'
    },
    {
      icon: 'Luggage',
      title: 'Préparez vos bagages',
      description: 'Respectez l\'espace bagages convenu avec le conducteur',
      color: 'text-accent'
    },
    {
      icon: 'MapPin',
      title: 'Suivez les instructions',
      description: 'Respectez les consignes de sécurité et les règles du ferry',
      color: 'text-success'
    }
  ];

  const quickActions = [
    {
      label: 'Voir mon profil',
      icon: 'User',
      variant: 'outline',
      action: () => navigate('/user-profile')
    },
    {
      label: 'Rechercher d\'autres trajets',
      icon: 'Search',
      variant: 'outline',
      action: () => navigate('/ferry-schedule-search')
    },
    {
      label: 'Créer un trajet',
      icon: 'Plus',
      variant: 'default',
      action: () => navigate('/create-trip')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Next Steps */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Icon name="CheckSquare" size={20} className="mr-2 text-primary" />
          Prochaines étapes
        </h2>

        <div className="space-y-4">
          {nextSteps?.map((step, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                  <Icon name={step?.icon} size={20} className={step?.color} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{step?.title}</h3>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2 text-primary" />
          Actions rapides
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {quickActions?.map((action, index) => (
            <Button
              key={index}
              variant={action?.variant}
              onClick={action?.action}
              iconName={action?.icon}
              iconPosition="left"
              className="justify-center"
            >
              {action?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Support */}
      <div className="bg-muted rounded-lg p-6">
        <div className="text-center">
          <Icon name="HelpCircle" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="font-semibold mb-2">Besoin d'aide ?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Notre équipe support est disponible pour vous accompagner
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              iconName="Phone"
              iconPosition="left"
            >
              02 51 XX XX XX
            </Button>
            <Button
              variant="outline"
              iconName="Mail"
              iconPosition="left"
            >
              support@oyacovoit.fr
            </Button>
          </div>
        </div>
      </div>
      {/* Booking Reference */}
      <div className="bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg p-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">
            Conservez votre référence de réservation
          </p>
          <p className="text-lg font-bold text-primary">{bookingReference}</p>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;