import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <Icon name="UserPlus" size={32} color="white" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Rejoignez Oya Covoit
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Créez votre compte pour accéder au covoiturage intelligent synchronisé avec les horaires de ferry
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Registration Form */}
          <div className="lg:col-span-2">
            <RegistrationForm />
          </div>

          {/* Trust Signals Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <TrustSignals />
            </div>
          </div>
        </div>

        {/* Bottom CTA for Mobile */}
        <div className="mt-12 text-center lg:hidden">
          <div className="bg-card rounded-lg p-6 maritime-shadow-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Déjà membre ?
            </h3>
            <p className="text-muted-foreground mb-4">
              Connectez-vous pour accéder à votre compte
            </p>
            <Button
              variant="outline"
              onClick={() => navigate('/login')}
              iconName="LogIn"
              iconPosition="left"
              fullWidth
            >
              Se connecter
            </Button>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Waves" size={24} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Oya Covoit</h3>
                  <p className="text-sm text-muted-foreground">Ferry Carpooling</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                La plateforme de covoiturage intelligente pour les passagers de ferry. 
                Synchronisée avec les horaires officiels des compagnies maritimes.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground">Sécurisé</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground">Certifié</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Liens rapides</h4>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => navigate('/ferry-schedule-search')}
                    className="text-sm text-muted-foreground hover:text-foreground maritime-transition"
                  >
                    Rechercher un trajet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/create-trip')}
                    className="text-sm text-muted-foreground hover:text-foreground maritime-transition"
                  >
                    Créer un trajet
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/login')}
                    className="text-sm text-muted-foreground hover:text-foreground maritime-transition"
                  >
                    Se connecter
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2">
                <li>
                  <span className="text-sm text-muted-foreground">Conditions d'utilisation</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Politique de confidentialité</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Centre d'aide</span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">Contact</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Oya Covoit. Tous droits réservés. 
              Conforme aux réglementations maritimes françaises.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;