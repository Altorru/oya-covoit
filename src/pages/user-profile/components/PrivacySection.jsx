import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const PrivacySection = ({ privacySettings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(privacySettings);

  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Visible par tous les utilisateurs' },
    { value: 'verified', label: 'Utilisateurs vérifiés', description: 'Visible uniquement par les utilisateurs vérifiés' },
    { value: 'private', label: 'Privé', description: 'Visible uniquement après acceptation' }
  ];

  const dataRetentionOptions = [
    { value: '1year', label: '1 an' },
    { value: '2years', label: '2 ans' },
    { value: '5years', label: '5 ans' },
    { value: 'indefinite', label: 'Indéfini' }
  ];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(privacySettings);
    setIsEditing(false);
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const privacyCategories = [
    {
      title: 'Visibilité du profil',
      icon: 'Eye',
      description: 'Contrôlez qui peut voir vos informations',
      settings: [
        { key: 'profilePhoto', label: 'Photo de profil', description: 'Qui peut voir votre photo de profil' },
        { key: 'fullName', label: 'Nom complet', description: 'Affichage de votre nom complet' },
        { key: 'phoneNumber', label: 'Numéro de téléphone', description: 'Partage de votre numéro de téléphone' },
        { key: 'email', label: 'Adresse email', description: 'Partage de votre adresse email' },
        { key: 'city', label: 'Ville', description: 'Affichage de votre ville de résidence' },
        { key: 'vehicleInfo', label: 'Informations véhicule', description: 'Détails de votre véhicule' }
      ]
    },
    {
      title: 'Historique des trajets',
      icon: 'MapPin',
      description: 'Gestion de l\'historique de vos trajets',
      settings: [
        { key: 'tripHistory', label: 'Historique des trajets', description: 'Conserver l\'historique de vos trajets' },
        { key: 'ratings', label: 'Évaluations', description: 'Afficher les évaluations reçues' },
        { key: 'statistics', label: 'Statistiques', description: 'Partager vos statistiques de covoiturage' }
      ]
    },
    {
      title: 'Communications',
      icon: 'MessageCircle',
      description: 'Paramètres de communication et contact',
      settings: [
        { key: 'directMessages', label: 'Messages directs', description: 'Autoriser les messages directs' },
        { key: 'phoneContact', label: 'Contact téléphonique', description: 'Autoriser les appels téléphoniques' },
        { key: 'locationSharing', label: 'Partage de position', description: 'Partager votre position en temps réel' }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Confidentialité et sécurité</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Shield"
            iconPosition="left"
            iconSize={16}
          >
            Modifier
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Annuler
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Sauvegarder
            </Button>
          </div>
        )}
      </div>
      {/* Global Privacy Settings */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Globe" size={16} color="var(--color-primary)" />
          <span>Paramètres généraux</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Visibilité par défaut"
            options={visibilityOptions}
            value={formData?.defaultVisibility}
            onChange={(value) => handleSelectChange('defaultVisibility', value)}
            disabled={!isEditing}
            description="Niveau de visibilité par défaut pour les nouvelles informations"
          />
          
          <Select
            label="Conservation des données"
            options={dataRetentionOptions}
            value={formData?.dataRetention}
            onChange={(value) => handleSelectChange('dataRetention', value)}
            disabled={!isEditing}
            description="Durée de conservation de vos données"
          />
        </div>

        <div className="mt-4 space-y-3">
          <Checkbox
            label="Indexation par les moteurs de recherche"
            description="Autoriser l'indexation de votre profil public par les moteurs de recherche"
            checked={formData?.searchEngineIndexing}
            onChange={(e) => handleCheckboxChange('searchEngineIndexing', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Analyse et amélioration"
            description="Autoriser l'utilisation de vos données pour améliorer le service"
            checked={formData?.analyticsOptIn}
            onChange={(e) => handleCheckboxChange('analyticsOptIn', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Partage avec des partenaires"
            description="Autoriser le partage de données anonymisées avec nos partenaires"
            checked={formData?.partnerDataSharing}
            onChange={(e) => handleCheckboxChange('partnerDataSharing', e?.target?.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Privacy Categories */}
      <div className="space-y-6">
        {privacyCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{category?.title}</h3>
                <p className="text-sm text-muted-foreground">{category?.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {category?.settings?.map((setting) => (
                <div key={setting?.key} className="flex items-start justify-between">
                  <div className="flex-1">
                    <label className="font-medium text-foreground">
                      {setting?.label}
                    </label>
                    <p className="text-sm text-muted-foreground">{setting?.description}</p>
                  </div>
                  <div className="ml-4">
                    <Select
                      options={visibilityOptions}
                      value={formData?.visibility?.[setting?.key] || 'private'}
                      onChange={(value) => handleSelectChange(`visibility.${setting?.key}`, value)}
                      disabled={!isEditing}
                      className="w-48"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Data Management */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Database" size={20} color="var(--color-primary)" />
          <span>Gestion des données</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Download" size={16} color="var(--color-secondary)" />
              <span className="font-medium text-foreground">Exporter mes données</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Téléchargez une copie de toutes vos données personnelles
            </p>
            <Button variant="outline" size="sm" fullWidth>
              Demander l'export
            </Button>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Trash2" size={16} color="var(--color-error)" />
              <span className="font-medium text-foreground">Supprimer mon compte</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Suppression définitive de votre compte et de toutes vos données
            </p>
            <Button variant="destructive" size="sm" fullWidth>
              Supprimer le compte
            </Button>
          </div>
        </div>
      </div>
      {/* GDPR Compliance */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">Conformité RGPD</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Vos données sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). 
              Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement, 
              de portabilité et d'opposition concernant vos données personnelles.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">
                Politique de confidentialité
              </Button>
              <Button variant="ghost" size="sm">
                Conditions d'utilisation
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Privacy Activity */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="Activity" size={20} color="var(--color-primary)" />
            <span>Activité récente</span>
          </h3>
        </div>
        
        <div className="space-y-2">
          {formData?.recentActivity?.slice(0, 3)?.map((activity) => (
            <div key={activity?.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Icon name={activity?.icon} size={16} color="var(--color-muted-foreground)" />
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity?.description}</p>
                <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          )) || (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Shield" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Aucune activité récente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacySection;