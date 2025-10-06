import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';


const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Mock social authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful social login
      localStorage.setItem('userToken', `mock-${provider}-token-` + Date.now());
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      navigate('/ferry-schedule-search');
    } catch (error) {
      console.error(`Erreur de connexion ${provider}:`, error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-white'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Ou continuer avec
          </span>
        </div>
      </div>
      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.name}
            variant="outline"
            onClick={() => handleSocialLogin(provider?.name?.toLowerCase())}
            loading={loadingProvider === provider?.name?.toLowerCase()}
            disabled={loadingProvider !== null}
            iconName={provider?.icon}
            iconPosition="left"
            iconSize={18}
            className="justify-center"
          >
            {provider?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;