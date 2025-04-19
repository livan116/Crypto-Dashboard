import React, { useState, useRef, useEffect } from 'react';
import { useCrypto } from '../context/CryptoContext';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { cryptos, setSelectedCrypto } = useCrypto();
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setIsOpen(term.length > 0);
    };

    const handleSelect = (crypto) => {
        setSelectedCrypto(crypto);
        setSearchTerm('');
        setIsOpen(false);
    };

    const filteredCryptos = cryptos
        .filter(crypto =>
            crypto.name.toLowerCase().includes(searchTerm) ||
            crypto.symbol.toLowerCase().includes(searchTerm)
        )
        .slice(0, 10); // Limit to top 10 results

    return (
        <div className="relative w-96" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search cryptocurrencies..."
                    className="w-full px-4 py-2 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    value={searchTerm}
                    onChange={handleSearch}
                    onFocus={() => setIsOpen(searchTerm.length > 0)}
                />
                <svg
                    className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {filteredCryptos.length > 0 ? (
                        filteredCryptos.map(crypto => (
                            <div
                                key={crypto.id}
                                className="flex items-center p-3 hover:bg-gray-700 cursor-pointer transition-colors"
                                onClick={() => handleSelect(crypto)}
                            >
                                <img src={crypto.image} alt={crypto.name} className="w-8 h-8 mr-3" />
                                <div className="flex-1">
                                    <div className="flex items-center">
                                        <span className="font-medium">{crypto.name}</span>
                                        <span className="text-sm text-gray-400 ml-2">
                                            {crypto.symbol.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        Rank #{crypto.market_cap_rank}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-medium">
                                        ${crypto.current_price.toLocaleString()}
                                    </div>
                                    <div className={`text-sm ${crypto.price_change_percentage_24h >= 0
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                        }`}>
                                        {crypto.price_change_percentage_24h >= 0 ? '+' : ''}
                                        {crypto.price_change_percentage_24h.toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-400">
                            No cryptocurrencies found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar; 