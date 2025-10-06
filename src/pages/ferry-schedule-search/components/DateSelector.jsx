import React from 'react';
import Input from '../../../components/ui/Input';

const DateSelector = ({ departureDate, onDepartureDateChange }) => {
  const today = new Date()?.toISOString()?.split('T')?.[0];
  
  return (
    <div className="bg-card rounded-lg p-4 maritime-shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground">Date de voyage</h3>
      <Input
        type="date"
        value={departureDate}
        onChange={(e) => onDepartureDateChange(e?.target?.value)}
        min={today}
        required
      />
    </div>
  );
};

export default DateSelector;