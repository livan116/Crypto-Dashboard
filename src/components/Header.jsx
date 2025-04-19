import React from 'react';
import { useCrypto } from '../context/CryptoContext';

const Header = () => {
    const { refreshData } = useCrypto();

    return (
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">KryPto</h1>
            <button
                onClick={refreshData}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
                Refresh Data
            </button>
        </div>
    );
};

export default Header; 