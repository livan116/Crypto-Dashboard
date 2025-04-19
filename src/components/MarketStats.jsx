import React from 'react';
import { useCrypto } from '../context/CryptoContext';

const MarketStats = () => {
    const { marketStats } = useCrypto();

    const formatNumber = (num) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num.toFixed(2)}`;
    };

    if (!marketStats) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-2">Total Market Cap</h3>
                <p className="text-2xl font-bold">
                    {formatNumber(marketStats.total_market_cap.usd)}
                </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-2">24h Volume</h3>
                <p className="text-2xl font-bold">
                    {formatNumber(marketStats.total_volume.usd)}
                </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-400 mb-2">Market Cap Change 24h</h3>
                <p className={`text-2xl font-bold ${marketStats.market_cap_change_percentage_24h_usd >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {marketStats.market_cap_change_percentage_24h_usd.toFixed(2)}%
                </p>
            </div>
        </div>
    );
};

export default MarketStats; 