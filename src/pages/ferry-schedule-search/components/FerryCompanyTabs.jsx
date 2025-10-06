import React from 'react';
import Button from '../../../components/ui/Button';

const FerryCompanyTabs = ({ activeCompany, onCompanyChange, companies }) => {
  return (
    <div className="bg-card rounded-lg p-4 maritime-shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Compagnie maritime</h3>
      <div className="flex flex-wrap gap-2">
        {companies?.map((company) => (
          <Button
            key={company?.id}
            variant={activeCompany === company?.id ? "default" : "outline"}
            onClick={() => onCompanyChange(company?.id)}
            className="flex-1 min-w-0"
          >
            {company?.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FerryCompanyTabs;