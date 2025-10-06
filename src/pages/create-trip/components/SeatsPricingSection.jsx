import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SeatsPricingSection = ({ 
  availableSeats, 
  onSeatsChange, 
  passengerPrice, 
  onPriceChange, 
  selectedFerry,
  seatsError,
  priceError 
}) => {
  const [suggestedPrice, setSuggestedPrice] = useState(0);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);

  // Calculate suggested fair price based on ferry cost and distance
  useEffect(() => {
    if (selectedFerry) {
      const ferryPrice = parseFloat(selectedFerry?.price) || 0;
      const fuelCost = 15; // Estimated fuel cost
      const tollCost = 0; // No tolls for local routes
      const wearCost = 8; // Vehicle wear and tear
      
      const totalCost = ferryPrice + fuelCost + tollCost + wearCost;
      const suggested = Math.ceil((totalCost / (availableSeats + 1)) * 0.8); // 80% of proportional cost
      setSuggestedPrice(suggested);
      
      if (!passengerPrice) {
        onPriceChange(suggested?.toString());
      }
    }
  }, [selectedFerry, availableSeats]);

  const seatOptions = [1, 2, 3, 4, 5, 6, 7];

  const handleSeatClick = (seatNumber) => {
    onSeatsChange(seatNumber);
  };

  const handlePriceInput = (e) => {
    const value = e?.target?.value?.replace(/[^\d]/g, '');
    onPriceChange(value);
  };

  const applySuggestedPrice = () => {
    onPriceChange(suggestedPrice?.toString());
  };

  const getPriceRecommendation = () => {
    const currentPrice = parseInt(passengerPrice) || 0;
    const difference = currentPrice - suggestedPrice;
    
    if (difference > 5) {
      return { type: 'warning', message: 'Prix élevé - peut réduire les demandes' };
    } else if (difference < -5) {
      return { type: 'info', message: 'Prix attractif - plus de demandes attendues' };
    } else {
      return { type: 'success', message: 'Prix équitable et compétitif' };
    }
  };

  const recommendation = getPriceRecommendation();

  return (
    <div className="bg-card rounded-lg p-6 maritime-shadow-sm border border-border">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Users" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Places et tarification</h3>
          <p className="text-sm text-muted-foreground">Définissez le nombre de places et le prix par passager</p>
        </div>
      </div>
      {/* Seat Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Nombre de places disponibles
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
          {seatOptions?.map((seatNumber) => (
            <button
              key={seatNumber}
              type="button"
              onClick={() => handleSeatClick(seatNumber)}
              className={`aspect-square rounded-lg border-2 maritime-transition flex flex-col items-center justify-center p-2 ${
                availableSeats === seatNumber
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary/50 text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="User" size={16} />
              <span className="text-xs font-medium mt-1">{seatNumber}</span>
            </button>
          ))}
        </div>
        {seatsError && (
          <div className="mt-2 flex items-center space-x-2">
            <Icon name="AlertCircle" size={14} color="var(--color-error)" />
            <span className="text-sm text-error">{seatsError}</span>
          </div>
        )}
      </div>
      {/* Pricing Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-foreground">
            Prix par passager
          </label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPriceBreakdown(!showPriceBreakdown)}
            iconName={showPriceBreakdown ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            iconSize={16}
          >
            Calcul suggéré
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              label="Prix (€)"
              placeholder="0"
              value={passengerPrice}
              onChange={handlePriceInput}
              error={priceError}
              description="Prix demandé par passager"
            />
          </div>
          
          <div className="flex flex-col justify-end">
            <Button
              variant="outline"
              onClick={applySuggestedPrice}
              iconName="Calculator"
              iconPosition="left"
              iconSize={16}
              className="h-10"
            >
              Utiliser le prix suggéré ({suggestedPrice} €)
            </Button>
          </div>
        </div>

        {/* Price Recommendation */}
        {passengerPrice && (
          <div className={`p-3 rounded-lg border ${
            recommendation?.type === 'success' ? 'bg-success/10 border-success/20' :
            recommendation?.type === 'warning'? 'bg-warning/10 border-warning/20' : 'bg-primary/10 border-primary/20'
          }`}>
            <div className="flex items-center space-x-2">
              <Icon 
                name={
                  recommendation?.type === 'success' ? 'CheckCircle' :
                  recommendation?.type === 'warning' ? 'AlertTriangle' : 'Info'
                } 
                size={16} 
                color={
                  recommendation?.type === 'success' ? 'var(--color-success)' :
                  recommendation?.type === 'warning' ? 'var(--color-warning)' :
                  'var(--color-primary)'
                }
              />
              <span className={`text-sm font-medium ${
                recommendation?.type === 'success' ? 'text-success' :
                recommendation?.type === 'warning'? 'text-warning' : 'text-primary'
              }`}>
                {recommendation?.message}
              </span>
            </div>
          </div>
        )}

        {/* Price Breakdown */}
        {showPriceBreakdown && selectedFerry && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium text-foreground mb-3">Calcul du prix suggéré</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ferry ({selectedFerry?.company})</span>
                <span className="text-foreground">{selectedFerry?.price} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Carburant estimé</span>
                <span className="text-foreground">15 €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Usure véhicule</span>
                <span className="text-foreground">8 €</span>
              </div>
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Coût total</span>
                  <span className="text-foreground">
                    {(parseFloat(selectedFerry?.price) + 15 + 8)?.toFixed(2)} €
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Réparti sur {availableSeats + 1} personnes (80%)</span>
                  <span>{suggestedPrice} € par passager</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Revenue Preview */}
        {passengerPrice && availableSeats && (
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Revenus estimés</div>
                <div className="text-lg font-semibold text-primary">
                  {(parseInt(passengerPrice) * availableSeats)?.toFixed(2)} €
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Pour {availableSeats} passager{availableSeats > 1 ? 's' : ''}</div>
                <div className="text-sm text-foreground">{passengerPrice} € × {availableSeats}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatsPricingSection;