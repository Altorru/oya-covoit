import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const PersonalInfoSection = ({ userInfo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userInfo);
  const [profileImage, setProfileImage] = useState(userInfo?.profileImage);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userInfo);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e?.target?.result);
        setFormData(prev => ({
          ...prev,
          profileImage: e?.target?.result
        }));
      };
      reader?.readAsDataURL(file);
    }
  };

  const verificationBadges = [
    { type: 'email', verified: formData?.emailVerified, label: 'Email vérifié' },
    { type: 'phone', verified: formData?.phoneVerified, label: 'Téléphone vérifié' },
    { type: 'identity', verified: formData?.identityVerified, label: 'Identité vérifiée' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Informations personnelles</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="Edit"
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
        {/* Profile Image Section */}
        <div className="lg:col-span-1">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-background shadow-lg">
                <Image
                  src={profileImage}
                  alt="Photo de profil"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 maritime-transition">
                  <Icon name="Camera" size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {/* Trust Score */}
            <div className="mt-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-sm font-medium text-success">Score de confiance: {formData?.trustScore}%</span>
              </div>
              
              {/* Verification Badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {verificationBadges?.map((badge) => (
                  <div
                    key={badge?.type}
                    className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                      badge?.verified
                        ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                    }`}
                  >
                    <Icon 
                      name={badge?.verified ? "CheckCircle" : "Clock"} 
                      size={12} 
                    />
                    <span>{badge?.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              type="text"
              value={formData?.firstName}
              onChange={(e) => handleInputChange('firstName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Nom"
              type="text"
              value={formData?.lastName}
              onChange={(e) => handleInputChange('lastName', e?.target?.value)}
              disabled={!isEditing}
              required
            />
            
            <Input
              label="Email"
              type="email"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={!isEditing}
              required
              description={formData?.emailVerified ? "Email vérifié" : "Vérification requise"}
            />
            
            <Input
              label="Téléphone"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              disabled={!isEditing}
              required
              description={formData?.phoneVerified ? "Téléphone vérifié" : "Vérification requise"}
            />
            
            <Input
              label="Date de naissance"
              type="date"
              value={formData?.birthDate}
              onChange={(e) => handleInputChange('birthDate', e?.target?.value)}
              disabled={!isEditing}
            />
            
            <Input
              label="Ville"
              type="text"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              disabled={!isEditing}
              placeholder="La Roche-sur-Yon"
            />
          </div>

          {/* Bio Section */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Présentation
            </label>
            <textarea
              value={formData?.bio}
              onChange={(e) => handleInputChange('bio', e?.target?.value)}
              disabled={!isEditing}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Parlez-nous de vous..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Une courte présentation pour les autres utilisateurs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;