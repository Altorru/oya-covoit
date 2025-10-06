import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const VehicleInfoSection = ({ vehicleInfo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(vehicleInfo);

  const carBrandOptions = [
    { value: 'renault', label: 'Renault' },
    { value: 'peugeot', label: 'Peugeot' },
    { value: 'citroen', label: 'Citroën' },
    { value: 'volkswagen', label: 'Volkswagen' },
    { value: 'ford', label: 'Ford' },
    { value: 'toyota', label: 'Toyota' },
    { value: 'bmw', label: 'BMW' },
    { value: 'mercedes', label: 'Mercedes-Benz' },
    { value: 'audi', label: 'Audi' },
    { value: 'other', label: 'Autre' }
  ];

  const carTypeOptions = [
    { value: 'compact', label: 'Compacte' },
    { value: 'sedan', label: 'Berline' },
    { value: 'suv', label: 'SUV' },
    { value: 'hatchback', label: 'Citadine' },
    { value: 'estate', label: 'Break' },
    { value: 'van', label: 'Monospace' }
  ];

  const trunkSizeOptions = [
    { value: 'small', label: 'Petit (1-2 valises)' },
    { value: 'medium', label: 'Moyen (3-4 valises)' },
    { value: 'large', label: 'Grand (5+ valises)' }
  ];

  const fuelTypeOptions = [
    { value: 'petrol', label: 'Essence' },
    { value: 'diesel', label: 'Diesel' },
    { value: 'hybrid', label: 'Hybride' },
    { value: 'electric', label: 'Électrique' }
  ];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(vehicleInfo);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
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

  const certifications = [
    { type: 'insurance', verified: formData?.insuranceVerified, label: 'Assurance vérifiée', icon: 'Shield' },
    { type: 'license', verified: formData?.licenseVerified, label: 'Permis vérifié', icon: 'CreditCard' },
    { type: 'maritime', verified: formData?.maritimeCompliance, label: 'Conformité maritime', icon: 'Anchor' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Informations véhicule</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Car"
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Image */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative">
              <div className="w-full h-48 rounded-lg overflow-hidden bg-muted border border-border">
                <Image
                  src={formData?.vehicleImage}
                  alt="Photo du véhicule"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 maritime-transition">
                  <Icon name="Camera" size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Certifications */}
            <div className="mt-4 space-y-2">
              {certifications?.map((cert) => (
                <div
                  key={cert?.type}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                    cert?.verified
                      ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                  }`}
                >
                  <Icon 
                    name={cert?.verified ? "CheckCircle" : "AlertCircle"} 
                    size={16} 
                  />
                  <span>{cert?.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Marque"
              options={carBrandOptions}
              value={formData?.brand}
              onChange={(value) => handleInputChange('brand', value)}
              disabled={!isEditing}
              placeholder="Sélectionnez la marque"
            />

            <Input
              label="Modèle"
              type="text"
              value={formData?.model}
              onChange={(e) => handleInputChange('model', e?.target?.value)}
              disabled={!isEditing}
              placeholder="ex: Clio, 308, C3..."
            />

            <Select
              label="Type de véhicule"
              options={carTypeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              disabled={!isEditing}
              placeholder="Sélectionnez le type"
            />

            <Input
              label="Année"
              type="number"
              value={formData?.year}
              onChange={(e) => handleInputChange('year', e?.target?.value)}
              disabled={!isEditing}
              min="1990"
              max="2024"
            />

            <Input
              label="Couleur"
              type="text"
              value={formData?.color}
              onChange={(e) => handleInputChange('color', e?.target?.value)}
              disabled={!isEditing}
              placeholder="ex: Blanc, Noir, Rouge..."
            />

            <Input
              label="Plaque d'immatriculation"
              type="text"
              value={formData?.licensePlate}
              onChange={(e) => handleInputChange('licensePlate', e?.target?.value)}
              disabled={!isEditing}
              placeholder="AB-123-CD"
            />

            <Select
              label="Carburant"
              options={fuelTypeOptions}
              value={formData?.fuelType}
              onChange={(value) => handleInputChange('fuelType', value)}
              disabled={!isEditing}
              placeholder="Type de carburant"
            />

            <Input
              label="Nombre de places"
              type="number"
              value={formData?.seats}
              onChange={(e) => handleInputChange('seats', e?.target?.value)}
              disabled={!isEditing}
              min="2"
              max="9"
            />
          </div>

          {/* Trunk and Features */}
          <div className="mt-6 space-y-4">
            <Select
              label="Taille du coffre"
              options={trunkSizeOptions}
              value={formData?.trunkSize}
              onChange={(value) => handleInputChange('trunkSize', value)}
              disabled={!isEditing}
              placeholder="Capacité du coffre"
              description="Important pour les passagers avec bagages"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Équipements</h4>
                <Checkbox
                  label="Climatisation"
                  checked={formData?.airConditioning}
                  onChange={(e) => handleCheckboxChange('airConditioning', e?.target?.checked)}
                  disabled={!isEditing}
                />
                <Checkbox
                  label="GPS intégré"
                  checked={formData?.gps}
                  onChange={(e) => handleCheckboxChange('gps', e?.target?.checked)}
                  disabled={!isEditing}
                />
                <Checkbox
                  label="Bluetooth"
                  checked={formData?.bluetooth}
                  onChange={(e) => handleCheckboxChange('bluetooth', e?.target?.checked)}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-foreground">Options</h4>
                <Checkbox
                  label="Animaux acceptés"
                  checked={formData?.petsAllowed}
                  onChange={(e) => handleCheckboxChange('petsAllowed', e?.target?.checked)}
                  disabled={!isEditing}
                />
                <Checkbox
                  label="Fumeur autorisé"
                  checked={formData?.smokingAllowed}
                  onChange={(e) => handleCheckboxChange('smokingAllowed', e?.target?.checked)}
                  disabled={!isEditing}
                />
                <Checkbox
                  label="Musique autorisée"
                  checked={formData?.musicAllowed}
                  onChange={(e) => handleCheckboxChange('musicAllowed', e?.target?.checked)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-primary)" />
              <span>Informations d'assurance</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Compagnie d'assurance"
                type="text"
                value={formData?.insuranceCompany}
                onChange={(e) => handleInputChange('insuranceCompany', e?.target?.value)}
                disabled={!isEditing}
                placeholder="ex: Maif, Macif, AXA..."
              />
              <Input
                label="Date d'expiration"
                type="date"
                value={formData?.insuranceExpiry}
                onChange={(e) => handleInputChange('insuranceExpiry', e?.target?.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInfoSection;