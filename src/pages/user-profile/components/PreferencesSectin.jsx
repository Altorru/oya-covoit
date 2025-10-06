import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PreferencesSection = ({ preferences, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(preferences);

  const departureOptions = [
    { value: 'la-roche-sur-yon', label: 'La Roche-sur-Yon' },
    { value: 'nantes', label: 'Nantes' },
    { value: 'saint-nazaire', label: 'Saint-Nazaire' },
    { value: 'les-sables-dolonne', label: 'Les Sables-d\'Olonne' },
    { value: 'challans', label: 'Challans' }
  ];

  const ferryCompanyOptions = [
    { value: 'yeu-continent', label: 'Yeu Continent' },
    { value: 'compagnie-vendeenne', label: 'Compagnie Vendéenne' }
  ];

  const luggageOptions = [
    { value: 'light', label: 'Léger (sac à dos)' },
    { value: 'medium', label: 'Moyen (valise cabine)' },
    { value: 'heavy', label: 'Lourd (plusieurs valises)' }
  ];

  const communicationOptions = [
    { value: 'phone', label: 'Téléphone' },
    { value: 'sms', label: 'SMS' },
    { value: 'email', label: 'Email' },
    { value: 'app', label: 'Application' }
  ];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(preferences);
    setIsEditing(false);
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Préférences</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Settings"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Travel Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
            <span>Préférences de voyage</span>
          </h3>

          <Select
            label="Ville de départ par défaut"
            options={departureOptions}
            value={formData?.defaultDepartureCity}
            onChange={(value) => handleSelectChange('defaultDepartureCity', value)}
            disabled={!isEditing}
            placeholder="Sélectionnez une ville"
          />

          <Select
            label="Compagnies de ferry préférées"
            options={ferryCompanyOptions}
            value={formData?.preferredFerryCompanies}
            onChange={(value) => handleSelectChange('preferredFerryCompanies', value)}
            disabled={!isEditing}
            multiple
            placeholder="Sélectionnez les compagnies"
          />

          <Select
            label="Type de bagages habituel"
            options={luggageOptions}
            value={formData?.luggageType}
            onChange={(value) => handleSelectChange('luggageType', value)}
            disabled={!isEditing}
            placeholder="Sélectionnez le type"
          />

          <Select
            label="Moyens de communication préférés"
            options={communicationOptions}
            value={formData?.communicationMethods}
            onChange={(value) => handleSelectChange('communicationMethods', value)}
            disabled={!isEditing}
            multiple
            placeholder="Sélectionnez les moyens"
          />
        </div>

        {/* Booking Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="Calendar" size={20} color="var(--color-primary)" />
            <span>Préférences de réservation</span>
          </h3>

          <div className="space-y-3">
            <Checkbox
              label="Réservation automatique"
              description="Accepter automatiquement les demandes de covoiturage"
              checked={formData?.autoBooking}
              onChange={(e) => handleCheckboxChange('autoBooking', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Notifications instantanées"
              description="Recevoir les notifications en temps réel"
              checked={formData?.instantNotifications}
              onChange={(e) => handleCheckboxChange('instantNotifications', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Partage de localisation"
              description="Permettre aux passagers de voir votre position"
              checked={formData?.locationSharing}
              onChange={(e) => handleCheckboxChange('locationSharing', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Rappels de ferry"
              description="Recevoir des rappels avant les départs de ferry"
              checked={formData?.ferryReminders}
              onChange={(e) => handleCheckboxChange('ferryReminders', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Suggestions de prix"
              description="Utiliser les suggestions automatiques de prix équitable"
              checked={formData?.priceSuggestions}
              onChange={(e) => handleCheckboxChange('priceSuggestions', e?.target?.checked)}
              disabled={!isEditing}
            />

            <Checkbox
              label="Profil visible"
              description="Rendre votre profil visible aux autres utilisateurs"
              checked={formData?.profileVisible}
              onChange={(e) => handleCheckboxChange('profileVisible', e?.target?.checked)}
              disabled={!isEditing}
            />
          </div>
        </div>
      </div>
      {/* Advanced Settings */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Sliders" size={20} color="var(--color-primary)" />
          <span>Paramètres avancés</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} color="var(--color-secondary)" />
              <span className="font-medium text-foreground">Délai de réponse</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Temps maximum pour répondre aux demandes
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">{formData?.responseTime} minutes</span>
              {isEditing && (
                <input
                  type="range"
                  min="5"
                  max="60"
                  step="5"
                  value={formData?.responseTime}
                  onChange={(e) => handleSelectChange('responseTime', parseInt(e?.target?.value))}
                  className="flex-1"
                />
              )}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Users" size={16} color="var(--color-secondary)" />
              <span className="font-medium text-foreground">Nombre max de passagers</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Nombre maximum de passagers par trajet
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">{formData?.maxPassengers} personnes</span>
              {isEditing && (
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={formData?.maxPassengers}
                  onChange={(e) => handleSelectChange('maxPassengers', parseInt(e?.target?.value))}
                  className="flex-1"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection;