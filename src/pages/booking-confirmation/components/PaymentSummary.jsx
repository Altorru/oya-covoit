import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSummary = ({ paymentDetails, onPaymentComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentComplete();
    }, 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
        Récapitulatif de paiement
      </h2>
      <div className="space-y-4">
        {/* Payment Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Covoiturage ({paymentDetails?.passengerCount} passager{paymentDetails?.passengerCount > 1 ? 's' : ''})
            </span>
            <span className="font-medium">
              {formatPrice(paymentDetails?.basePrice)}
            </span>
          </div>
          
          {paymentDetails?.fees > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Frais de service</span>
              <span className="font-medium">{formatPrice(paymentDetails?.fees)}</span>
            </div>
          )}

          <div className="border-t border-border pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-primary">
                {formatPrice(paymentDetails?.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-3">Méthode de paiement</h3>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-8 bg-primary rounded flex items-center justify-center">
              <Icon name="CreditCard" size={16} color="white" />
            </div>
            <div>
              <p className="font-medium">Carte bancaire</p>
              <p className="text-sm text-muted-foreground">
                Paiement sécurisé par notre partenaire bancaire français
              </p>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-success bg-opacity-10 border border-success border-opacity-20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-1" />
            <div>
              <h4 className="font-semibold text-success mb-1">Paiement sécurisé</h4>
              <p className="text-sm text-foreground">
                Vos données bancaires sont protégées par un cryptage SSL 256 bits. 
                Le paiement n'est débité qu'après confirmation du trajet.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <Button
          variant="default"
          fullWidth
          loading={isProcessing}
          onClick={handlePayment}
          iconName="Lock"
          iconPosition="left"
          className="mt-6"
        >
          {isProcessing ? 'Traitement en cours...' : `Payer ${formatPrice(paymentDetails?.total)}`}
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          En confirmant le paiement, vous acceptez nos{' '}
          <button className="text-primary hover:underline">conditions générales</button>
          {' '}et notre{' '}
          <button className="text-primary hover:underline">politique d'annulation</button>.
        </p>
      </div>
    </div>
  );
};

export default PaymentSummary;