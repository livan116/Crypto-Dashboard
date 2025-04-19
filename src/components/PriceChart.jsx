import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const TimeframeButton = ({ days, active, onClick }) => (
    <button
        onClick={() => onClick(days)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${active
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
    >
        {days === 1 ? '24H' : days === 7 ? '7D' : days === 14 ? '14D' : days === 30 ? '1M' : days === 90 ? '3M' : '1Y'}
    </button>
);

const formatTooltipValue = (value, name) => {
    if (name === 'Price') {
        return [`$${parseFloat(value).toLocaleString()}`, 'Price'];
    }
    return [value, name];
};

const PriceChart = () => {
    const { historicalData, loading, timeframe, setTimeframe, selectedCrypto } = useCrypto();
    const timeframes = [1, 7, 14, 30, 90, 365];

    if (loading) {
        return (
            <div className="h-[500px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    // Calculate price statistics
    const currentPrice = historicalData[historicalData.length - 1]?.price;
    const startPrice = historicalData[0]?.price;
    const priceChange = currentPrice - startPrice;
    const priceChangePercentage = ((priceChange / startPrice) * 100).toFixed(2);
    const isPositive = priceChange >= 0;

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
                <img src={selectedCrypto.image} alt={selectedCrypto.name} className="w-10 h-10" />
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {selectedCrypto.name}
                        <span className="text-gray-400 text-lg font-normal">
                            {selectedCrypto.symbol.toUpperCase()}
                        </span>
                    </h2>
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">${parseFloat(currentPrice).toLocaleString()}</span>
                        <span className={`px-2 py-1 rounded text-sm ${isPositive ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                            }`}>
                            {isPositive ? '+' : ''}{priceChangePercentage}%
                        </span>
                    </div>
                </div>
                <div className="ml-auto">
                    <div className="flex flex-wrap gap-2">
                        {timeframes.map((days) => (
                            <TimeframeButton
                                key={days}
                                days={days}
                                active={timeframe === days}
                                onClick={setTimeframe}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis
                            dataKey="timestamp"
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return timeframe === 1
                                    ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                    : date.toLocaleDateString([], { month: 'short', day: 'numeric' });
                            }}
                        />
                        <YAxis
                            stroke="#9CA3AF"
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `$${value.toLocaleString()}`}
                            domain={['dataMin', 'dataMax']}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1F2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                padding: '12px'
                            }}
                            formatter={formatTooltipValue}
                            labelFormatter={(label) => {
                                const date = new Date(label);
                                return timeframe === 1
                                    ? date.toLocaleString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        month: 'short',
                                        day: 'numeric'
                                    })
                                    : date.toLocaleDateString([], {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric'
                                    });
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={false}
                            name="Price"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Market Cap Rank</div>
                    <div className="font-bold">#{selectedCrypto.market_cap_rank}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Market Cap</div>
                    <div className="font-bold">${selectedCrypto.market_cap.toLocaleString()}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">24h Volume</div>
                    <div className="font-bold">${selectedCrypto.total_volume.toLocaleString()}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Circulating Supply</div>
                    <div className="font-bold">{selectedCrypto.circulating_supply.toLocaleString()} {selectedCrypto.symbol.toUpperCase()}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">24h High</div>
                    <div className="font-bold">${selectedCrypto.high_24h.toLocaleString()}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">24h Low</div>
                    <div className="font-bold">${selectedCrypto.low_24h.toLocaleString()}</div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">24h Change</div>
                    <div className={`font-bold ${selectedCrypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                    </div>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">All Time High</div>
                    <div className="font-bold">${selectedCrypto.ath.toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
};

export default PriceChart; 