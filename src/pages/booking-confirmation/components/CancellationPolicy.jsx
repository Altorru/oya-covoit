import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CancellationPolicy = ({ policyDetails, onCancelBooking }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(price);
  };

  const handleCancelConfirm = () => {
    onCancelBooking(cancelReason);
    setShowCancelModal(false);
  };

  const getRefundAmount = (hoursBeforeTrip) => {
    if (hoursBeforeTrip >= 24) return policyDetails?.totalAmount;
    if (hoursBeforeTrip >= 12) return policyDetails?.totalAmount * 0.75;
    if (hoursBeforeTrip >= 2) return policyDetails?.totalAmount * 0.50;
    return 0;
  };

  const hoursUntilTrip = Math.floor((new Date(policyDetails.tripDate) - new Date()) / (1000 * 60 * 60));

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Icon name="XCircle" size={20} className="mr-2 text-error" />
          Politique d'annulation
        </h2>

        <div className="space-y-4">
          {/* Current Refund Status */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Remboursement actuel</h3>
              <span className="text-lg font-bold text-primary">
                {formatPrice(getRefundAmount(hoursUntilTrip))}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Temps restant avant le départ : {hoursUntilTrip}h
            </p>
          </div>

          {/* Refund Timeline */}
          <div className="space-y-3">
            <h4 className="font-semibold">Barème de remboursement</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-success bg-opacity-10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-sm">Plus de 24h avant</span>
                </div>
                <span className="font-semibold text-success">100% remboursé</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning bg-opacity-10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm">12h à 24h avant</span>
                </div>
                <span className="font-semibold text-warning">75% remboursé</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-error bg-opacity-10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-error" />
                  <span className="text-sm">2h à 12h avant</span>
                </div>
                <span className="font-semibold text-error">50% remboursé</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={16} className="text-gray-500" />
                  <span className="text-sm">Moins de 2h avant</span>
                </div>
                <span className="font-semibold text-gray-500">Aucun remboursement</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold mb-2">Conditions d'annulation</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Le remboursement est traité sous 3-5 jours ouvrés</li>
              <li>• Les frais de service ne sont pas remboursables</li>
              <li>• En cas d'annulation par le conducteur, remboursement intégral</li>
              <li>• Conditions météorologiques extrêmes : remboursement intégral</li>
              <li>• Annulation ferry : remboursement automatique</li>
            </ul>
          </div>

          {/* Cancel Button */}
          {hoursUntilTrip > 2 && (
            <Button
              variant="destructive"
              onClick={() => setShowCancelModal(true)}
              iconName="XCircle"
              iconPosition="left"
              className="w-full"
            >
              Annuler ma réservation
            </Button>
          )}

          {hoursUntilTrip <= 2 && (
            <div className="bg-error bg-opacity-10 border border-error border-opacity-20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-error mt-1" />
                <div>
                  <h4 className="font-semibold text-error mb-1">Annulation non remboursable</h4>
                  <p className="text-sm text-foreground">
                    Il est trop tard pour annuler avec remboursement. 
                    Contactez le support pour des circonstances exceptionnelles.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirmer l'annulation</h3>
            
            <div className="space-y-4">
              <div className="bg-warning bg-opacity-10 border border-warning border-opacity-20 rounded-lg p-3">
                <p className="text-sm">
                  Vous recevrez un remboursement de{' '}
                  <strong>{formatPrice(getRefundAmount(hoursUntilTrip))}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Raison de l'annulation (optionnel)
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e?.target?.value)}
                  className="w-full p-3 border border-border rounded-lg resize-none"
                  rows={3}
                  placeholder="Expliquez brièvement pourquoi vous annulez..."
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1"
                >
                  Garder ma réservation
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancelConfirm}
                  className="flex-1"
                >
                  Confirmer l'annulation
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CancellationPolicy;