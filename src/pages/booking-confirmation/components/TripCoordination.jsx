import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TripCoordination = ({ coordinationDetails }) => {
  const handleAddToCalendar = () => {
    const event = {
      title: `Covoiturage ferry - ${coordinationDetails?.destination}`,
      start: coordinationDetails?.departureTime,
      description: `Rendez-vous avec ${coordinationDetails?.driverName} à ${coordinationDetails?.pickupLocation}`
    };
    
    // Create calendar event URL (Google Calendar)
    const startDate = new Date(event.start)?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    const endDate = new Date(new Date(event.start).getTime() + 2 * 60 * 60 * 1000)?.toISOString()?.replace(/[-:]/g, '')?.split('.')?.[0] + 'Z';
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event?.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event?.description)}`;
    
    window.open(calendarUrl, '_blank');
  };

  const handleShareContact = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Contact conducteur',
        text: `Conducteur: ${coordinationDetails?.driverName}\nTéléphone: ${coordinationDetails?.driverPhone}`,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(`Conducteur: ${coordinationDetails?.driverName}\nTéléphone: ${coordinationDetails?.driverPhone}`);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon name="Users" size={20} className="mr-2 text-primary" />
        Coordination du trajet
      </h2>
      <div className="space-y-6">
        {/* Driver Contact */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-3">Contact conducteur</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Icon name="User" size={18} className="text-primary" />
              <span className="font-medium">{coordinationDetails?.driverName}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Phone" size={18} className="text-primary" />
              <span>{coordinationDetails?.driverPhone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Icon name="Mail" size={18} className="text-primary" />
              <span>{coordinationDetails?.driverEmail}</span>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-error bg-opacity-10 border border-error border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error mt-1" />
            <div>
              <h4 className="font-semibold text-error mb-2">Contact d'urgence</h4>
              <p className="text-sm text-foreground mb-2">
                En cas de problème pendant le trajet :
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Support Oya Covoit :</strong> 02 51 XX XX XX</p>
                <p><strong>Urgences :</strong> 15 (SAMU) - 18 (Pompiers)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold">Informations véhicule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Marque/Modèle</span>
                <span className="font-medium">{coordinationDetails?.vehicle?.model}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Couleur</span>
                <span className="font-medium">{coordinationDetails?.vehicle?.color}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Plaque</span>
                <span className="font-medium">{coordinationDetails?.vehicle?.licensePlate}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold">Assurance & Sécurité</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Assurance vérifiée</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Permis validé</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning" />
                <span>Conducteur certifié</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={handleAddToCalendar}
            iconName="Calendar"
            iconPosition="left"
          >
            Ajouter au calendrier
          </Button>
          <Button
            variant="outline"
            onClick={handleShareContact}
            iconName="Share"
            iconPosition="left"
          >
            Partager le contact
          </Button>
        </div>

        {/* Communication Preferences */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-semibold mb-3">Préférences de communication</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-border" />
              <span className="text-sm">Recevoir les mises à jour par SMS</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" defaultChecked className="rounded border-border" />
              <span className="text-sm">Notifications de changement d'horaire ferry</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="rounded border-border" />
              <span className="text-sm">Partager mon numéro avec le conducteur</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCoordination;