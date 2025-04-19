import React from 'react';
import { useCrypto } from '../context/CryptoContext';
import SearchBar from './SearchBar';
import PriceChart from './PriceChart';
import MarketStats from './MarketStats';
import TopMovers from './TopMovers';
import CryptoTable from './CryptoTable';
import Header from './Header';

const AppContent = () => {
    const { error } = useCrypto();

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {error && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
                    {error}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <Header />
                <MarketStats />
                <div className="mb-8">
                    <SearchBar />
                </div>
                <div className="mb-8">
                    <PriceChart />
                </div>
                <TopMovers />
                <CryptoTable />
            </div>
        </div>
    );
};

export default AppContent; 