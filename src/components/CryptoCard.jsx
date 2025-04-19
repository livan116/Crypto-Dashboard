import React from 'react';
import { useCrypto } from '../context/CryptoContext';

const CryptoCard = ({ crypto }) => {
  const { setSelectedCrypto, selectedCrypto } = useCrypto();
  const isSelected = selectedCrypto?.id === crypto.id;

  return (
    <div
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-blue-600 text-white'
          : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
      }`}
      onClick={() => setSelectedCrypto(crypto)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{crypto.name}</h3>
            <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-semibold">${crypto.current_price.toLocaleString()}</p>
          <p
            className={`text-sm ${
              crypto.price_change_percentage_24h >= 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {crypto.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard; 