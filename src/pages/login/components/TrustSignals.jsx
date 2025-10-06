import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      icon: 'Shield',
      title: 'Sécurité Maritime',
      description: 'Certifié par les Affaires Maritimes'
    },
    {
      icon: 'Users',
      title: 'Communauté Vérifiée',
      description: 'Plus de 5 000 utilisateurs actifs'
    },
    {
      icon: 'Star',
      title: 'Note Excellente',
      description: '4.8/5 sur les avis clients'
    }
  ];

  const testimonials = [
    {
      name: 'Marie L.',
      location: 'La Roche-sur-Yon',
      comment: `Excellent service ! J'ai trouvé un covoiturage pour le ferry de 14h30 en quelques minutes. Le conducteur était ponctuel et très sympa.`,
      rating: 5
    },
    {
      name: 'Pierre M.',location: 'Nantes',comment: `Parfait pour les trajets vers l'île d'Yeu. L'application synchronise parfaitement avec les horaires des ferries.`,
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {certifications?.map((cert, index) => (
          <div key={index} className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="flex justify-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name={cert?.icon} size={20} color="var(--color-primary)" />
              </div>
            </div>
            <h4 className="font-semibold text-sm text-foreground mb-1">
              {cert?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {cert?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">
          Ce que disent nos utilisateurs
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="flex space-x-1">
                  {[...Array(testimonial?.rating)]?.map((_, i) => (
                    <Icon key={i} name="Star" size={14} color="var(--color-accent)" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 italic">
                "{testimonial?.comment}"
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={14} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial?.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;