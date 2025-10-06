import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'L\'adresse email est requise';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide';
    }

    if (!formData?.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Mock authentication - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock credentials validation
      const validCredentials = [
        { email: 'marie.dupont@email.fr', password: 'motdepasse123' },
        { email: 'jean.martin@email.fr', password: 'password456' },
        { email: 'sophie.bernard@email.fr', password: 'monmotdepasse' }
      ];

      const isValidUser = validCredentials?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidUser) {
        // Store user session (mock)
        localStorage.setItem('userToken', 'mock-jwt-token-' + Date.now());
        localStorage.setItem('userEmail', formData?.email);
        
        // Navigate to ferry schedule search
        navigate('/ferry-schedule-search');
      } else {
        setErrors({
          general: 'Email ou mot de passe incorrect. Veuillez réessayer.'
        });
      }
    } catch (error) {
      setErrors({
        general: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={20} color="var(--color-error)" />
              <p className="text-sm text-red-700">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Adresse email"
          type="email"
          name="email"
          placeholder="votre.email@exemple.fr"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        {/* Password Field */}
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="Saisissez votre mot de passe"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          disabled={isLoading}
        />

        {/* Forgot Password Link */}
        <div className="text-right">
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 maritime-transition"
            onClick={() => navigate('/forgot-password')}
          >
            Mot de passe oublié ?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          disabled={isLoading}
          iconName="LogIn"
          iconPosition="left"
          iconSize={18}
        >
          {isLoading ? 'Connexion en cours...' : 'Se connecter'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;