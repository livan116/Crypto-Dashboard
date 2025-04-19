import React, { useState, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';
import PriceChart from '../components/PriceChart';
import { Link } from 'react-router-dom';
import { FaArrowDown, FaArrowUp, FaChartLine, FaWallet, FaExchangeAlt, FaClock, FaChartBar } from 'react-icons/fa';

const TopLosers = () => {
    const { topMovers, setSelectedCrypto } = useCrypto();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [selectedTimeframe, setSelectedTimeframe] = useState('24H');
    const itemsPerPage = 5;

    useEffect(() => {
        if (topMovers?.losers?.length > 0 && !selectedCoin) {
            handleCoinSelect(topMovers.losers[0]);
        }
    }, [topMovers]);

    if (!topMovers) return null;

    const formatNumber = (num) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num.toFixed(2)}`;
    };

    const formatPercentage = (value) => {
        if (typeof value !== 'number') return '0.00%';
        return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
    };

    const handleCoinSelect = (coin) => {
        setSelectedCoin(coin);
        setSelectedCrypto(coin);
    };

    const timeframes = ['24H', '7D', '14D', '1M', '3M', '1Y'];
    const totalPages = Math.ceil(topMovers.losers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLosers = topMovers.losers.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen w-full bg-[#0F172A] fixed inset-0 overflow-y-auto text-white">
            <div className="min-h-screen w-full bg-gradient-to-br from-red-500/5 via-gray-900 to-gray-900">
                <div className="max-w-[1400px] mx-auto px-4 py-8 pb-16">
                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <div>
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent">
                                    Top Losers
                                </h1>
                                <p className="text-gray-400 mt-2">
                                    Monitor the market's biggest price declines
                                </p>
                            </div>
                            <Link
                                to="/"
                                className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-lg transition-all duration-200 backdrop-blur-sm border border-gray-700/50 group"
                            >
                                <span className="mr-2 group-hover:-translate-x-1 transition-transform duration-200">←</span>
                                Back to Dashboard
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center">
                                    <div className="p-3 bg-red-500/10 rounded-lg mr-4">
                                        <FaChartLine className="text-red-400 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Total Losers</p>
                                        <p className="text-2xl font-bold text-white">{topMovers.losers.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center">
                                    <div className="p-3 bg-red-500/10 rounded-lg mr-4">
                                        <FaWallet className="text-red-400 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Biggest Drop</p>
                                        <p className="text-2xl font-bold text-white">{topMovers.losers[0]?.price_change_percentage_24h.toFixed(2)}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center">
                                    <div className="p-3 bg-red-500/10 rounded-lg mr-4">
                                        <FaExchangeAlt className="text-red-400 text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Average Loss</p>
                                        <p className="text-2xl font-bold text-white">
                                            {(topMovers.losers.reduce((acc, curr) => acc + curr.price_change_percentage_24h, 0) / topMovers.losers.length).toFixed(2)}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* List Section */}
                        <div className="space-y-4">
                            <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Biggest Declines</h2>
                                        <p className="text-sm text-gray-400">Updated every 60 seconds</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {timeframes.map((timeframe) => (
                                            <button
                                                key={timeframe}
                                                onClick={() => setSelectedTimeframe(timeframe)}
                                                className={`px-3 py-1 rounded-lg text-xs transition-all duration-200 
                                                    ${selectedTimeframe === timeframe
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-900/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50'
                                                    }`}
                                            >
                                                {timeframe}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {currentLosers.map((crypto, index) => (
                                        <div
                                            key={crypto.id}
                                            onClick={() => handleCoinSelect(crypto)}
                                            className={`relative group cursor-pointer rounded-lg p-4 transition-all duration-200 
                                                ${selectedCoin?.id === crypto.id
                                                    ? 'bg-red-500/10 border border-red-500/50'
                                                    : 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-700/40'}`}
                                        >
                                            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500 rounded-r-full 
                                                transition-all duration-200 opacity-0 group-hover:opacity-100 
                                                ${selectedCoin?.id === crypto.id ? 'opacity-100' : ''}"
                                            />
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="relative">
                                                        <img src={crypto.image} alt={crypto.name} className="w-10 h-10 rounded-lg" />
                                                        <div className="absolute -top-2 -right-2 bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm border border-red-500/50">
                                                            #{startIndex + index + 1}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-white">{crypto.name}</h3>
                                                        <span className="text-gray-400 text-sm">{crypto.symbol.toUpperCase()}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-white">${crypto.current_price.toFixed(2)}</p>
                                                    <div className="flex items-center justify-end text-red-400 font-medium">
                                                        <FaArrowDown className="mr-1" />
                                                        <span>{crypto.price_change_percentage_24h.toFixed(2)}%</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="flex justify-center items-center mt-6 space-x-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 
                                                ${currentPage === page
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 backdrop-blur-sm border border-gray-700/50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Detailed View */}
                        {selectedCoin && (
                            <div className="lg:col-span-2 space-y-6">
                                {/* Header Card */}
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <img src={selectedCoin.image} alt={selectedCoin.name} className="w-16 h-16 rounded-xl" />
                                            <div>
                                                <h2 className="text-3xl font-bold text-white mb-1">{selectedCoin.name}</h2>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-gray-400">{selectedCoin.symbol.toUpperCase()}/USD</span>
                                                    <span className="inline-flex items-center bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-red-500/50">
                                                        <FaArrowDown className="mr-1" />
                                                        {selectedCoin.price_change_percentage_24h.toFixed(2)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-4xl font-bold text-white">${selectedCoin.current_price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-400 mt-1">Last Updated: {new Date().toLocaleTimeString()}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                            <div className="flex items-center mb-2">
                                                <FaChartLine className="text-red-400 mr-2" />
                                                <p className="text-gray-400 text-sm">Market Cap</p>
                                            </div>
                                            <p className="text-xl font-bold text-white">{formatNumber(selectedCoin.market_cap)}</p>
                                            <p className="text-sm text-gray-400 mt-1">Rank #{selectedCoin.market_cap_rank}</p>
                                        </div>
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                            <div className="flex items-center mb-2">
                                                <FaChartBar className="text-red-400 mr-2" />
                                                <p className="text-gray-400 text-sm">24h Volume</p>
                                            </div>
                                            <p className="text-xl font-bold text-white">{formatNumber(selectedCoin.total_volume)}</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                Vol/MCap: {(selectedCoin.total_volume / selectedCoin.market_cap).toFixed(3)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                                            <div className="flex items-center mb-2">
                                                <FaClock className="text-red-400 mr-2" />
                                                <p className="text-gray-400 text-sm">Price History</p>
                                            </div>
                                            <p className="text-xl font-bold text-white">${selectedCoin.ath.toFixed(2)}</p>
                                            <p className="text-sm text-gray-400 mt-1">
                                                ATH Change: {formatPercentage(selectedCoin.ath_change_percentage)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Card */}
                                <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white">Price Chart</h3>
                                            <p className="text-sm text-gray-400">
                                                {selectedTimeframe} Price Movement
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center text-green-400">
                                                <FaArrowUp className="mr-1" />
                                                <span className="font-medium">High: ${selectedCoin.high_24h.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center text-red-400 mt-1">
                                                <FaArrowDown className="mr-1" />
                                                <span className="font-medium">Low: ${selectedCoin.low_24h.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[400px] w-full text-gray-300">
                                        <PriceChart timeframe={selectedTimeframe} />
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                                            <p className="text-gray-400 text-sm">24h Change</p>
                                            <p className={`text-lg font-bold ${selectedCoin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {formatPercentage(selectedCoin.price_change_percentage_24h)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                                            <p className="text-gray-400 text-sm">7d Change</p>
                                            <p className={`text-lg font-bold ${selectedCoin.price_change_percentage_7d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {formatPercentage(selectedCoin.price_change_percentage_7d)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-3">
                                            <p className="text-gray-400 text-sm">30d Change</p>
                                            <p className={`text-lg font-bold ${selectedCoin.price_change_percentage_30d >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                {formatPercentage(selectedCoin.price_change_percentage_30d)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopLosers; 