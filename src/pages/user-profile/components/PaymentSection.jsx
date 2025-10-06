import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const PaymentSection = ({ paymentInfo, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(paymentInfo);
  const [showAddCard, setShowAddCard] = useState(false);

  const bankOptions = [
    { value: 'credit-agricole', label: 'Crédit Agricole' },
    { value: 'bnp-paribas', label: 'BNP Paribas' },
    { value: 'societe-generale', label: 'Société Générale' },
    { value: 'lcl', label: 'LCL' },
    { value: 'caisse-epargne', label: 'Caisse d\'Épargne' },
    { value: 'banque-postale', label: 'La Banque Postale' },
    { value: 'credit-mutuel', label: 'Crédit Mutuel' },
    { value: 'other', label: 'Autre' }
  ];

  const cardTypeOptions = [
    { value: 'visa', label: 'Visa' },
    { value: 'mastercard', label: 'Mastercard' },
    { value: 'american-express', label: 'American Express' }
  ];

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    setShowAddCard(false);
  };

  const handleCancel = () => {
    setFormData(paymentInfo);
    setIsEditing(false);
    setShowAddCard(false);
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

  const handleRemoveCard = (cardId) => {
    setFormData(prev => ({
      ...prev,
      savedCards: prev?.savedCards?.filter(card => card?.id !== cardId)
    }));
  };

  const handleSetDefaultCard = (cardId) => {
    setFormData(prev => ({
      ...prev,
      defaultCardId: cardId
    }));
  };

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa': return 'CreditCard';
      case 'mastercard': return 'CreditCard';
      case 'american-express': return 'CreditCard';
      default: return 'CreditCard';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Paiement et facturation</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            iconName="CreditCard"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="Wallet" size={20} color="var(--color-primary)" />
              <span>Moyens de paiement</span>
            </h3>
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddCard(!showAddCard)}
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
              >
                Ajouter
              </Button>
            )}
          </div>

          {/* Saved Cards */}
          <div className="space-y-3">
            {formData?.savedCards?.map((card) => (
              <div
                key={card?.id}
                className={`p-4 rounded-lg border ${
                  card?.id === formData?.defaultCardId
                    ? 'border-primary bg-primary/5' :'border-border bg-background'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name={getCardIcon(card?.type)} size={20} />
                    <div>
                      <p className="font-medium text-foreground">
                        **** **** **** {card?.lastFour}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {card?.type?.toUpperCase()} • Expire {card?.expiry}
                      </p>
                    </div>
                  </div>
                  
                  {isEditing && (
                    <div className="flex items-center space-x-2">
                      {card?.id !== formData?.defaultCardId && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleSetDefaultCard(card?.id)}
                        >
                          Défaut
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCard(card?.id)}
                        iconName="Trash2"
                        iconSize={14}
                      />
                    </div>
                  )}
                </div>
                
                {card?.id === formData?.defaultCardId && (
                  <div className="mt-2 flex items-center space-x-1 text-sm text-primary">
                    <Icon name="CheckCircle" size={14} />
                    <span>Carte par défaut</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add New Card Form */}
          {showAddCard && isEditing && (
            <div className="p-4 border border-dashed border-border rounded-lg space-y-4">
              <h4 className="font-medium text-foreground">Ajouter une nouvelle carte</h4>
              
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Numéro de carte"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Date d'expiration"
                    type="text"
                    placeholder="MM/AA"
                    maxLength="5"
                  />
                  <Input
                    label="CVV"
                    type="text"
                    placeholder="123"
                    maxLength="4"
                  />
                </div>
                
                <Input
                  label="Nom sur la carte"
                  type="text"
                  placeholder="Jean Dupont"
                />
                
                <Select
                  label="Type de carte"
                  options={cardTypeOptions}
                  placeholder="Sélectionnez le type"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setShowAddCard(false)}>
                  Annuler
                </Button>
                <Button variant="default" size="sm">
                  Ajouter la carte
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Banking and Billing */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="Building2" size={20} color="var(--color-primary)" />
            <span>Informations bancaires</span>
          </h3>

          <Select
            label="Banque principale"
            options={bankOptions}
            value={formData?.primaryBank}
            onChange={(value) => handleInputChange('primaryBank', value)}
            disabled={!isEditing}
            placeholder="Sélectionnez votre banque"
          />

          <Input
            label="IBAN"
            type="text"
            value={formData?.iban}
            onChange={(e) => handleInputChange('iban', e?.target?.value)}
            disabled={!isEditing}
            placeholder="FR76 1234 5678 9012 3456 7890 123"
            description="Pour les remboursements automatiques"
          />

          {/* Billing Address */}
          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-3">Adresse de facturation</h4>
            <div className="space-y-4">
              <Input
                label="Adresse"
                type="text"
                value={formData?.billingAddress?.street}
                onChange={(e) => handleInputChange('billingAddress', {
                  ...formData?.billingAddress,
                  street: e?.target?.value
                })}
                disabled={!isEditing}
                placeholder="123 Rue de la République"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Code postal"
                  type="text"
                  value={formData?.billingAddress?.zipCode}
                  onChange={(e) => handleInputChange('billingAddress', {
                    ...formData?.billingAddress,
                    zipCode: e?.target?.value
                  })}
                  disabled={!isEditing}
                  placeholder="85000"
                />
                <Input
                  label="Ville"
                  type="text"
                  value={formData?.billingAddress?.city}
                  onChange={(e) => handleInputChange('billingAddress', {
                    ...formData?.billingAddress,
                    city: e?.target?.value
                  })}
                  disabled={!isEditing}
                  placeholder="La Roche-sur-Yon"
                />
              </div>
            </div>
          </div>

          {/* Pricing Preferences */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Euro" size={16} color="var(--color-secondary)" />
              <span>Préférences de tarification</span>
            </h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Suggestions de prix automatiques"
                description="Utiliser l'algorithme de prix équitable"
                checked={formData?.autoPricing}
                onChange={(e) => handleCheckboxChange('autoPricing', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Paiement automatique"
                description="Débiter automatiquement après le trajet"
                checked={formData?.autoPayment}
                onChange={(e) => handleCheckboxChange('autoPayment', e?.target?.checked)}
                disabled={!isEditing}
              />
              
              <Checkbox
                label="Remboursement automatique"
                description="Remboursement automatique en cas d'annulation"
                checked={formData?.autoRefund}
                onChange={(e) => handleCheckboxChange('autoRefund', e?.target?.checked)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Transaction History Preview */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
            <Icon name="Receipt" size={20} color="var(--color-primary)" />
            <span>Dernières transactions</span>
          </h3>
          <Button variant="ghost" size="sm">
            Voir tout
          </Button>
        </div>
        
        <div className="space-y-2">
          {formData?.recentTransactions?.slice(0, 3)?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  transaction?.type === 'payment' ? 'bg-error' : 'bg-success'
                }`} />
                <div>
                  <p className="font-medium text-foreground">{transaction?.description}</p>
                  <p className="text-sm text-muted-foreground">{transaction?.date}</p>
                </div>
              </div>
              <span className={`font-medium ${
                transaction?.type === 'payment' ? 'text-error' : 'text-success'
              }`}>
                {transaction?.type === 'payment' ? '-' : '+'}{transaction?.amount}€
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;