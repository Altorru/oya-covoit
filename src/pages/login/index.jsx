import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import TrustSignals from './components/TrustSignals';
import RegistrationPrompt from './components/RegistrationPrompt';
import Icon from '../../components/AppIcon';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Connexion - Oya Covoit | Covoiturage Ferry</title>
        <meta name="description" content="Connectez-vous à votre compte Oya Covoit pour accéder au covoiturage basé sur les horaires de ferry. Trouvez des trajets vers l'île d'Yeu et autres destinations maritimes." />
        <meta name="keywords" content="connexion, covoiturage ferry, île d'Yeu, transport maritime, Oya Covoit" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center maritime-shadow-md">
                  <Icon name="Waves" size={32} color="white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Bon retour !
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connectez-vous pour accéder à votre compte et continuer votre voyage avec Oya Covoit
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Column - Login Form */}
              <div className="order-2 lg:order-1">
                <div className="bg-card rounded-2xl border border-border maritime-shadow-md p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      Se connecter
                    </h2>
                    <p className="text-muted-foreground">
                      Accédez à votre espace personnel pour gérer vos trajets
                    </p>
                  </div>

                  {/* Login Form */}
                  <LoginForm />

                  {/* Social Login */}
                  <div className="mt-8">
                    <SocialLogin />
                  </div>

                  {/* Registration Prompt */}
                  <div className="mt-8">
                    <RegistrationPrompt />
                  </div>
                </div>
              </div>

              {/* Right Column - Trust Signals */}
              <div className="order-1 lg:order-2">
                <div className="sticky top-24">
                  <TrustSignals />
                </div>
              </div>
            </div>

            {/* Mock Credentials Info */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} color="var(--color-warning)" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-2">
                      Comptes de démonstration
                    </h3>
                    <p className="text-sm text-amber-700 mb-3">
                      Utilisez l'un de ces comptes pour tester l'application :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-white rounded p-3 border border-amber-200">
                        <p className="font-medium text-amber-800">Conducteur</p>
                        <p className="text-amber-700">marie.dupont@email.fr</p>
                        <p className="text-amber-700">motdepasse123</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-amber-200">
                        <p className="font-medium text-amber-800">Passager</p>
                        <p className="text-amber-700">jean.martin@email.fr</p>
                        <p className="text-amber-700">password456</p>
                      </div>
                      <div className="bg-white rounded p-3 border border-amber-200">
                        <p className="font-medium text-amber-800">Utilisateur</p>
                        <p className="text-amber-700">sophie.bernard@email.fr</p>
                        <p className="text-amber-700">monmotdepasse</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;