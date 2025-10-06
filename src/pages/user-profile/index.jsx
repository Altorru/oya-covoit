import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import Input from '../../components/ui/Input';

import Button from '../../components/ui/Button';

const UserProfile = () => {
  const navigate = useNavigate();

  // Simplified user data like BlaBlaCar
  const [userInfo, setUserInfo] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: "marie.dubois@email.com",
    phone: "+33 6 12 34 56 78",
    birthDate: "1985-03-15",
    bio: "Conductrice expérimentée, ponctuelle et respectueuse de l'environnement.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    trustScore: 92,
    emailVerified: true,
    phoneVerified: true
  });

  // Simplified vehicle info like BlaBlaCar
  const [vehicleInfo, setVehicleInfo] = useState({
    brand: "Renault",
    model: "Clio",
    color: "Blanc",
    year: "2020",
    seats: 4,
    vehicleImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop"
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
            <button 
              onClick={() => navigate('/ferry-schedule-search')}
              className="hover:text-foreground maritime-transition"
            >
              Accueil
            </button>
            <Icon name="ChevronRight" size={16} />
            <span>Mon profil</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Mon profil</h1>
              <p className="text-muted-foreground mt-1">
                Gérez vos informations personnelles
              </p>
            </div>
            
            <div className="hidden md:flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-lg">
              <Icon name="Shield" size={16} />
              <span className="font-medium">Score: {userInfo?.trustScore}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Prénom"
                  type="text"
                  value={userInfo?.firstName}
                  onChange={(e) => setUserInfo(prev => ({...prev, firstName: e?.target?.value}))}
                  disabled={!isEditing}
                />

                <Input
                  label="Nom"
                  type="text"
                  value={userInfo?.lastName}
                  onChange={(e) => setUserInfo(prev => ({...prev, lastName: e?.target?.value}))}
                  disabled={!isEditing}
                />

                <Input
                  label="Email"
                  type="email"
                  value={userInfo?.email}
                  onChange={(e) => setUserInfo(prev => ({...prev, email: e?.target?.value}))}
                  disabled={!isEditing}
                />

                <Input
                  label="Téléphone"
                  type="tel"
                  value={userInfo?.phone}
                  onChange={(e) => setUserInfo(prev => ({...prev, phone: e?.target?.value}))}
                  disabled={!isEditing}
                />

                <Input
                  label="Date de naissance"
                  type="date"
                  value={userInfo?.birthDate}
                  onChange={(e) => setUserInfo(prev => ({...prev, birthDate: e?.target?.value}))}
                  disabled={!isEditing}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Présentation
                </label>
                <textarea
                  value={userInfo?.bio}
                  onChange={(e) => setUserInfo(prev => ({...prev, bio: e?.target?.value}))}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full p-3 border border-border rounded-lg resize-none disabled:opacity-50"
                  placeholder="Décrivez-vous en quelques mots..."
                />
              </div>
            </div>

            {/* Vehicle Info - Simplified */}
            <div className="bg-card rounded-lg border border-border p-6 mt-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Mon véhicule</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    label="Marque"
                    type="text"
                    value={vehicleInfo?.brand}
                    onChange={(e) => setVehicleInfo(prev => ({...prev, brand: e?.target?.value}))}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Input
                    label="Modèle"
                    type="text"
                    value={vehicleInfo?.model}
                    onChange={(e) => setVehicleInfo(prev => ({...prev, model: e?.target?.value}))}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Input
                    label="Couleur"
                    type="text"
                    value={vehicleInfo?.color}
                    onChange={(e) => setVehicleInfo(prev => ({...prev, color: e?.target?.value}))}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Input
                    label="Nombre de places"
                    type="number"
                    value={vehicleInfo?.seats}
                    onChange={(e) => setVehicleInfo(prev => ({...prev, seats: parseInt(e?.target?.value)}))}
                    disabled={!isEditing}
                    min="2"
                    max="8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
              <div className="text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-muted border-4 border-background shadow-lg">
                    <Image
                      src={userInfo?.profileImage}
                      alt="Photo de profil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 maritime-transition">
                      <Icon name="Camera" size={14} />
                      <input type="file" accept="image/*" className="hidden" />
                    </label>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h3>

                {/* Trust Score */}
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span className="text-success font-medium">
                      Score de confiance: {userInfo?.trustScore}%
                    </span>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="mt-4 space-y-2">
                  <div className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                    userInfo?.emailVerified 
                      ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                  }`}>
                    <Icon name={userInfo?.emailVerified ? "CheckCircle" : "AlertCircle"} size={16} />
                    <span>Email {userInfo?.emailVerified ? 'vérifié' : 'à vérifier'}</span>
                  </div>

                  <div className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                    userInfo?.phoneVerified 
                      ? 'bg-success/10 text-success border border-success/20' :'bg-warning/10 text-warning border border-warning/20'
                  }`}>
                    <Icon name={userInfo?.phoneVerified ? "CheckCircle" : "AlertCircle"} size={16} />
                    <span>Téléphone {userInfo?.phoneVerified ? 'vérifié' : 'à vérifier'}</span>
                  </div>
                </div>

                {/* Vehicle Summary */}
                <div className="mt-6 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Icon name="Car" size={16} />
                    <span className="font-medium text-foreground">Mon véhicule</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {vehicleInfo?.brand} {vehicleInfo?.model} {vehicleInfo?.color}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {vehicleInfo?.seats} places
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/create-trip')}
            className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-4 py-3 rounded-lg maritime-transition hover:bg-primary/90"
          >
            <Icon name="Plus" size={18} />
            <span className="font-medium">Créer un trajet</span>
          </button>
          
          <button
            onClick={() => navigate('/ferry-schedule-search')}
            className="flex items-center justify-center space-x-2 bg-secondary text-secondary-foreground px-4 py-3 rounded-lg maritime-transition hover:bg-secondary/90"
          >
            <Icon name="Search" size={18} />
            <span className="font-medium">Rechercher</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;