import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const testimonials = [
    {
      id: 1,
      name: "Marie Dubois",
      location: "La Roche-sur-Yon",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: `Grâce à Oya Covoit, j'ai trouvé des compagnons de voyage réguliers pour mes trajets vers l'île d'Yeu.\nLe système de correspondance avec les horaires de ferry est parfait !`,
      rating: 5,
      tripCount: 23
    },
    {
      id: 2,
      name: "Pierre Martin",
      location: "Nantes",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: `Service fiable et sécurisé. J'ai économisé plus de 300€ cette année en partageant mes trajets.\nLes profils vérifiés donnent confiance.`,
      rating: 5,
      tripCount: 31
    },
    {
      id: 3,
      name: "Sophie Leroy",
      location: "Les Sables-d\'Olonne",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: `Interface intuitive et correspondance parfaite avec les horaires de la Compagnie Vendéenne.\nIdéal pour les vacances en famille !`,
      rating: 5,
      tripCount: 18
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Sécurité Maritime",
      icon: "Shield",
      description: "Conforme aux réglementations françaises"
    },
    {
      id: 2,
      name: "RGPD",
      icon: "Lock",
      description: "Protection des données personnelles"
    },
    {
      id: 3,
      name: "SSL Sécurisé",
      icon: "CheckCircle",
      description: "Transactions et données cryptées"
    }
  ];

  const stats = [
    {
      id: 1,
      value: "2 847",
      label: "Trajets réalisés",
      icon: "Car"
    },
    {
      id: 2,
      value: "1 234",
      label: "Utilisateurs actifs",
      icon: "Users"
    },
    {
      id: 3,
      value: "4.8/5",
      label: "Note moyenne",
      icon: "Star"
    },
    {
      id: 4,
      value: "98%",
      label: "Taux de satisfaction",
      icon: "ThumbsUp"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Rejoignez notre communauté de confiance
        </h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map(stat => (
            <div key={stat?.id} className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
              <div className="text-sm text-muted-foreground">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6 flex items-center">
          <Icon name="MessageCircle" size={20} className="mr-2 text-primary" />
          Ce que disent nos utilisateurs
        </h3>
        
        <div className="space-y-6">
          {testimonials?.map(testimonial => (
            <div key={testimonial?.id} className="border-l-4 border-primary/20 pl-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial?.avatar}
                    alt={`Photo de ${testimonial?.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Icon name="MapPin" size={14} className="mr-1" />
                        {testimonial?.location}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial?.rating)]?.map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-accent fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {testimonial?.tripCount} trajets
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground whitespace-pre-line">
                    "{testimonial?.text}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Award" size={20} className="mr-2 text-primary" />
          Certifications et sécurité
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {certifications?.map(cert => (
            <div key={cert?.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name={cert?.icon} size={20} className="text-success" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{cert?.name}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Ferry Companies Partnership */}
      <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Anchor" size={20} className="mr-2 text-primary" />
          Partenaires officiels
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Ship" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Yeu Continent</h4>
              <p className="text-sm text-muted-foreground">
                Intégration temps réel des horaires
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 border border-border rounded-lg">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Waves" size={24} className="text-secondary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Compagnie Vendéenne</h4>
              <p className="text-sm text-muted-foreground">
                Synchronisation automatique
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;