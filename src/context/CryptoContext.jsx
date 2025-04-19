import React, { createContext, useState, useContext, useEffect } from 'react';
import cryptoService from '../services/cryptoService';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
    const [cryptos, setCryptos] = useState([]);
    const [marketStats, setMarketStats] = useState(null);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [timeframe, setTimeframe] = useState(7);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [topMovers, setTopMovers] = useState({ gainers: [], losers: [] });

    // Fetch market stats
    useEffect(() => {
        const fetchMarketStats = async () => {
            try {
                const stats = await cryptoService.getMarketStats();
                setMarketStats(stats);
            } catch (err) {
                console.error('Error fetching market stats:', err);
            }
        };

        fetchMarketStats();
        const interval = setInterval(fetchMarketStats, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Fetch cryptocurrencies with pagination
    useEffect(() => {
        const fetchCryptos = async () => {
            try {
                setLoading(true);
                const data = await cryptoService.getCryptos(page, 50);
                setCryptos(data);
                setTotalPages(Math.ceil(5000 / 50)); // CoinGecko typically limits to 5000 coins
                if (!selectedCrypto && data.length > 0) {
                    setSelectedCrypto(data[0]);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCryptos();
    }, [page]);

    // Fetch top movers
    useEffect(() => {
        const fetchTopMovers = async () => {
            try {
                const data = await cryptoService.getTopMovers();
                setTopMovers(data);
            } catch (err) {
                console.error('Error fetching top movers:', err);
            }
        };

        fetchTopMovers();
        const interval = setInterval(fetchTopMovers, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Fetch historical data for selected crypto
    useEffect(() => {
        const fetchHistoricalData = async () => {
            if (!selectedCrypto) return;

            try {
                setLoading(true);
                const data = await cryptoService.getHistoricalData(selectedCrypto.id, timeframe);
                setHistoricalData(data.prices.map(([timestamp, price]) => ({
                    timestamp: new Date(timestamp).toLocaleDateString(),
                    price: price.toFixed(2)
                })));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistoricalData();
    }, [selectedCrypto, timeframe]);

    const value = {
        cryptos,
        marketStats,
        selectedCrypto,
        setSelectedCrypto,
        historicalData,
        timeframe,
        setTimeframe,
        loading,
        error,
        page,
        setPage,
        totalPages,
        topMovers
    };

    return (
        <CryptoContext.Provider value={value}>
            {children}
        </CryptoContext.Provider>
    );
};

export const useCrypto = () => {
    const context = useContext(CryptoContext);
    if (!context) {
        throw new Error('useCrypto must be used within a CryptoProvider');
    }
    return context;
}; 