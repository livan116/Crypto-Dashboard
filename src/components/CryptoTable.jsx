import React from 'react';
import { useCrypto } from '../context/CryptoContext';

const CryptoTable = () => {
    const {
        cryptos,
        selectedCrypto,
        setSelectedCrypto,
        page,
        setPage,
        totalPages
    } = useCrypto();

    const formatNumber = (num) => {
        if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
        if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
        if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
        return `$${num.toFixed(2)}`;
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">All Cryptocurrencies</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="text-gray-400">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-right">Price</th>
                            <th className="px-4 py-2 text-right">24h Change</th>
                            <th className="px-4 py-2 text-right">Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cryptos.map((crypto) => (
                            <tr
                                key={crypto.id}
                                className={`hover:bg-gray-700 cursor-pointer ${selectedCrypto?.id === crypto.id ? 'bg-gray-700' : ''
                                    }`}
                                onClick={() => setSelectedCrypto(crypto)}
                            >
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-2" />
                                        <span>{crypto.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2 text-right">
                                    ${crypto.current_price.toFixed(2)}
                                </td>
                                <td className={`px-4 py-2 text-right ${crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {crypto.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className="px-4 py-2 text-right">
                                    {formatNumber(crypto.market_cap)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 space-x-2">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded ${page === 1
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Previous
                </button>
                <span className="text-gray-400">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded ${page === totalPages
                            ? 'bg-gray-700 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CryptoTable; 