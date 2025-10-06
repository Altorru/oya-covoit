import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Rechercher',
      path: '/ferry-schedule-search',
      icon: 'Search',
      tooltip: 'Rechercher des trajets disponibles'
    },
    {
      label: 'Créer un trajet',
      path: '/create-trip',
      icon: 'Plus',
      tooltip: 'Créer un nouveau trajet'
    },
    {
      label: 'Mon profil',
      path: '/user-profile',
      icon: 'User',
      tooltip: 'Gérer mon profil'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleAuthAction = (action) => {
    navigate(`/${action}`);
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-100 bg-background border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              className="flex items-center space-x-3 cursor-pointer maritime-transition hover:opacity-80"
              onClick={() => navigate('/ferry-schedule-search')}
            >
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Waves" size={24} color="white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-foreground">Oya Covoit</h1>
                <p className="text-xs text-muted-foreground">Ferry Carpooling</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg maritime-transition ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted hover:text-foreground'
                }`}
                aria-current={isActive(item?.path) ? 'page' : undefined}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => handleAuthAction('login')}
              iconName="LogIn"
              iconPosition="left"
              iconSize={16}
            >
              Connexion
            </Button>
            <Button
              variant="default"
              onClick={() => handleAuthAction('register')}
              iconName="UserPlus"
              iconPosition="left"
              iconSize={16}
            >
              S'inscrire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted maritime-transition"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border maritime-shadow-md">
            <nav className="px-6 py-4 space-y-2" role="navigation">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg maritime-transition text-left ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  aria-current={isActive(item?.path) ? 'page' : undefined}
                >
                  <Icon name={item?.icon} size={20} />
                  <span className="font-medium">{item?.label}</span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => handleAuthAction('login')}
                  iconName="LogIn"
                  iconPosition="left"
                  iconSize={16}
                >
                  Connexion
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => handleAuthAction('register')}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}
                >
                  S'inscrire
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-100 bg-background border-t border-border">
        <nav className="flex items-center justify-around h-18 px-2" role="navigation">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg maritime-transition ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
              aria-current={isActive(item?.path) ? 'page' : undefined}
              title={item?.tooltip}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                color={isActive(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
              />
              <span className="text-xs font-medium mt-1">{item?.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;