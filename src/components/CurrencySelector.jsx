import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSupportedCurrencies } from '../utils/formatCurrency';

const CurrencySelector = ({ selectedCurrency, setSelectedCurrency }) => {
  const supportedCurrencies = getSupportedCurrencies();

  return (
    <div className="w-full max-w-xs">
      <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
        <SelectTrigger>
          <SelectValue placeholder="Select currency" />
        </SelectTrigger>
        <SelectContent>
          {supportedCurrencies.map((currency) => (
            <SelectItem key={currency.code} value={currency.code}>
              {currency.displayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CurrencySelector;