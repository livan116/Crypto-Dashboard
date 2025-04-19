import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import { Link } from 'react-router-dom';

const TopMovers = () => {
    const { topMovers } = useCrypto();

    if (!topMovers) return null;

    const formatNumber = (num) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num.toFixed(2)}`;
    };

    const renderMoverCard = (crypto, isGainer) => (
        <div
            key={crypto.id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors duration-200"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                    <div>
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-semibold">${crypto.current_price.toFixed(2)}</p>
                    <p className={`text-sm ${isGainer ? 'text-green-500' : 'text-red-500'}`}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </div>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
                <span>Market Cap</span>
                <span>{formatNumber(crypto.market_cap)}</span>
            </div>
        </div>
    );

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Gainers */}
                <div className="bg-gray-900 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Top Gainers</h2>
                        <Link
                            to="/top-gainers"
                            className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                        >
                            View More →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {topMovers.gainers.map((crypto) => renderMoverCard(crypto, true))}
                    </div>
                </div>

                {/* Top Losers */}
                <div className="bg-gray-900 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Top Losers</h2>
                        <Link
                            to="/top-losers"
                            className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                        >
                            View More →
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {topMovers.losers.map((crypto) => renderMoverCard(crypto, false))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopMovers; 