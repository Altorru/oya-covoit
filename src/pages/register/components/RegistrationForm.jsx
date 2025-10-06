import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    preferredCity: '',
    profilePhoto: null,
    agreeTerms: false,
    agreePrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const preferredCities = [
    { value: 'la-roche-sur-yon', label: 'La Roche-sur-Yon' },
    { value: 'nantes', label: 'Nantes' },
    { value: 'saint-nazaire', label: 'Saint-Nazaire' },
    { value: 'pornic', label: 'Pornic' },
    { value: 'noirmoutier', label: 'Noirmoutier-en-l\'Île' },
    { value: 'les-sables', label: 'Les Sables-d\'Olonne' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Le numéro de téléphone est requis';
    } else if (!/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/?.test(formData?.phone)) {
      newErrors.phone = 'Format de téléphone français invalide';
    }

    if (!formData?.agreeTerms) {
      newErrors.agreeTerms = 'Vous devez accepter les conditions d\'utilisation';
    }

    if (!formData?.agreePrivacy) {
      newErrors.agreePrivacy = 'Vous devez accepter la politique de confidentialité';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profilePhoto: 'La taille du fichier ne doit pas dépasser 5 MB'
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e?.target?.result);
      };
      reader?.readAsDataURL(file);

      setFormData(prev => ({
        ...prev,
        profilePhoto: file
      }));

      setErrors(prev => ({
        ...prev,
        profilePhoto: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Mock registration process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      console.log('Registration successful:', formData);
      navigate('/ferry-schedule-search');
    } catch (error) {
      setErrors({
        submit: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2 text-primary" />
            Informations personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom *"
              type="text"
              name="firstName"
              value={formData?.firstName}
              onChange={handleInputChange}
              placeholder="Votre prénom"
              error={errors?.firstName}
              required
            />
            
            <Input
              label="Nom *"
              type="text"
              name="lastName"
              value={formData?.lastName}
              onChange={handleInputChange}
              placeholder="Votre nom"
              error={errors?.lastName}
              required
            />
          </div>

          <Input
            label="Adresse email *"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            placeholder="votre.email@exemple.fr"
            error={errors?.email}
            description="Utilisée pour les notifications de trajet"
            required
            className="mt-4"
          />

          <Input
            label="Numéro de téléphone *"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            placeholder="06 12 34 56 78"
            error={errors?.phone}
            description="Pour la coordination des trajets"
            required
            className="mt-4"
          />
        </div>

        {/* Security */}
        <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Lock" size={20} className="mr-2 text-primary" />
            Sécurité
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Mot de passe *"
              type="password"
              name="password"
              value={formData?.password}
              onChange={handleInputChange}
              placeholder="Minimum 8 caractères"
              error={errors?.password}
              required
            />
            
            <Input
              label="Confirmer le mot de passe *"
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              placeholder="Répétez votre mot de passe"
              error={errors?.confirmPassword}
              required
            />
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="MapPin" size={20} className="mr-2 text-primary" />
            Préférences de trajet
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Ville de départ préférée
              </label>
              <select
                name="preferredCity"
                value={formData?.preferredCity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent maritime-transition"
              >
                <option value="">Sélectionner une ville</option>
                {preferredCities?.map(city => (
                  <option key={city?.value} value={city?.value}>
                    {city?.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                Nous vous proposerons en priorité des trajets depuis cette ville
              </p>
            </div>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Camera" size={20} className="mr-2 text-primary" />
            Photo de profil (optionnel)
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Aperçu photo de profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={32} className="text-muted-foreground" />
              )}
            </div>
            
            <div className="flex-1">
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('profilePhoto')?.click()}
                iconName="Upload"
                iconPosition="left"
              >
                Choisir une photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                JPG, PNG ou GIF. Maximum 5 MB.
              </p>
              {errors?.profilePhoto && (
                <p className="text-xs text-error mt-1">{errors?.profilePhoto}</p>
              )}
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={20} className="mr-2 text-primary" />
            Conditions d'utilisation
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label="J'accepte les conditions d'utilisation *"
              description="Incluant les réglementations maritimes françaises"
              checked={formData?.agreeTerms}
              onChange={(e) => handleInputChange({
                target: { name: 'agreeTerms', type: 'checkbox', checked: e?.target?.checked }
              })}
              error={errors?.agreeTerms}
              required
            />
            
            <Checkbox
              label="J'accepte la politique de confidentialité *"
              description="Conforme au RGPD européen"
              checked={formData?.agreePrivacy}
              onChange={(e) => handleInputChange({
                target: { name: 'agreePrivacy', type: 'checkbox', checked: e?.target?.checked }
              })}
              error={errors?.agreePrivacy}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="space-y-4">
          {errors?.submit && (
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <p className="text-error text-sm">{errors?.submit}</p>
            </div>
          )}
          
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            {isLoading ? 'Création du compte...' : 'Créer mon compte'}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="text-primary hover:underline font-medium"
              >
                Se connecter
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm; 