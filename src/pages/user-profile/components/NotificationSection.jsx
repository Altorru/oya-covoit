import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const NotificationSection = ({ notificationSettings, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(notificationSettings);

  const frequencyOptions = [
    { value: 'immediate', label: 'Immédiat' },
    { value: 'hourly', label: 'Toutes les heures' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' }
  ];

  const timeOptions = [
    { value: '08:00', label: '08:00' },
    { value: '12:00', label: '12:00' },
    { value: '18:00', label: '18:00' },
    { value: '20:00', label: '20:00' }
  ];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(notificationSettings);
    setIsEditing(false);
  };

  const handleCheckboxChange = (category, field, checked) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev?.[category],
        [field]: checked
      }
    }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const notificationCategories = [
    {
      key: 'bookings',
      title: 'Réservations',
      icon: 'Calendar',
      description: 'Notifications liées aux réservations de covoiturage',
      settings: [
        { key: 'newBooking', label: 'Nouvelle réservation reçue', description: 'Quand quelqu\'un réserve votre trajet' },
        { key: 'bookingConfirmed', label: 'Réservation confirmée', description: 'Confirmation de votre réservation' },
        { key: 'bookingCancelled', label: 'Réservation annulée', description: 'Annulation d\'une réservation' },
        { key: 'bookingReminder', label: 'Rappel de réservation', description: '24h avant le départ' }
      ]
    },
    {
      key: 'ferry',
      title: 'Horaires de ferry',
      icon: 'Ship',
      description: 'Mises à jour des horaires et changements de ferry',
      settings: [
        { key: 'scheduleUpdate', label: 'Mise à jour des horaires', description: 'Changements dans les horaires de ferry' },
        { key: 'ferryDelay', label: 'Retards de ferry', description: 'Notifications de retards ou annulations' },
        { key: 'weatherAlert', label: 'Alertes météo', description: 'Conditions météo affectant les traversées' },
        { key: 'ferryReminder', label: 'Rappel de ferry', description: '2h avant le départ du ferry' }
      ]
    },
    {
      key: 'messages',
      title: 'Messages',
      icon: 'MessageCircle',
      description: 'Communications avec les autres utilisateurs',
      settings: [
        { key: 'newMessage', label: 'Nouveau message', description: 'Messages de conducteurs ou passagers' },
        { key: 'tripChat', label: 'Chat de trajet', description: 'Messages dans le chat du trajet' },
        { key: 'emergencyContact', label: 'Contact d\'urgence', description: 'Messages urgents pendant le trajet' }
      ]
    },
    {
      key: 'account',
      title: 'Compte',
      icon: 'User',
      description: 'Activité et sécurité du compte',
      settings: [
        { key: 'profileUpdate', label: 'Mise à jour du profil', description: 'Modifications de votre profil' },
        { key: 'securityAlert', label: 'Alertes de sécurité', description: 'Connexions suspectes ou changements' },
        { key: 'paymentUpdate', label: 'Paiements', description: 'Transactions et remboursements' },
        { key: 'verification', label: 'Vérifications', description: 'Statut des vérifications de compte' }
      ]
    },
    {
      key: 'marketing',
      title: 'Marketing',
      icon: 'Megaphone',
      description: 'Offres spéciales et nouveautés',
      settings: [
        { key: 'promotions', label: 'Promotions', description: 'Offres spéciales et réductions' },
        { key: 'newsletter', label: 'Newsletter', description: 'Actualités et conseils de covoiturage' },
        { key: 'surveys', label: 'Enquêtes', description: 'Sondages pour améliorer le service' }
      ]
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Bell"
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
      {/* Global Settings */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium text-foreground mb-4 flex items-center space-x-2">
          <Icon name="Settings" size={16} color="var(--color-primary)" />
          <span>Paramètres généraux</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Fréquence des notifications"
            options={frequencyOptions}
            value={formData?.frequency}
            onChange={(value) => handleSelectChange('frequency', value)}
            disabled={!isEditing}
            description="Fréquence de regroupement des notifications"
          />
          
          <Select
            label="Heure de résumé quotidien"
            options={timeOptions}
            value={formData?.dailySummaryTime}
            onChange={(value) => handleSelectChange('dailySummaryTime', value)}
            disabled={!isEditing}
            description="Heure d'envoi du résumé quotidien"
          />
        </div>

        <div className="mt-4 space-y-3">
          <Checkbox
            label="Mode silencieux"
            description="Désactiver toutes les notifications entre 22h et 8h"
            checked={formData?.quietHours}
            onChange={(e) => handleSelectChange('quietHours', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Notifications push"
            description="Recevoir les notifications sur votre appareil"
            checked={formData?.pushNotifications}
            onChange={(e) => handleSelectChange('pushNotifications', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Notifications par email"
            description="Recevoir les notifications par email"
            checked={formData?.emailNotifications}
            onChange={(e) => handleSelectChange('emailNotifications', e?.target?.checked)}
            disabled={!isEditing}
          />
          
          <Checkbox
            label="Notifications SMS"
            description="Recevoir les notifications importantes par SMS"
            checked={formData?.smsNotifications}
            onChange={(e) => handleSelectChange('smsNotifications', e?.target?.checked)}
            disabled={!isEditing}
          />
        </div>
      </div>
      {/* Notification Categories */}
      <div className="space-y-6">
        {notificationCategories?.map((category) => (
          <div key={category?.key} className="border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={category?.icon} size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{category?.title}</h3>
                <p className="text-sm text-muted-foreground">{category?.description}</p>
              </div>
            </div>

            <div className="space-y-3">
              {category?.settings?.map((setting) => (
                <div key={setting?.key} className="flex items-start space-x-3">
                  <Checkbox
                    checked={formData?.[category?.key]?.[setting?.key] || false}
                    onChange={(e) => handleCheckboxChange(category?.key, setting?.key, e?.target?.checked)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label className="font-medium text-foreground cursor-pointer">
                      {setting?.label}
                    </label>
                    <p className="text-sm text-muted-foreground">{setting?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Notification History Preview */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="History" size={20} color="var(--color-primary)" />
            <span>Notifications récentes</span>
          </h3>
          <Button variant="ghost" size="sm">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {formData?.recentNotifications?.slice(0, 3)?.map((notification) => (
            <div key={notification?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                notification?.read ? 'bg-muted-foreground' : 'bg-primary'
              }`} />
              <div className="flex-1">
                <p className="font-medium text-foreground">{notification?.title}</p>
                <p className="text-sm text-muted-foreground">{notification?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
              </div>
              {!notification?.read && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>
          )) || (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Bell" size={48} className="mx-auto mb-2 opacity-50" />
              <p>Aucune notification récente</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;