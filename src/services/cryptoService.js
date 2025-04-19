import axios from 'axios';
const API_KEY = import.meta.env.VITE_SECRET_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL;

const cryptoService = {
  // Get market stats
  getMarketStats: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/global`, {
        params: {
          x_cg_demo_api_key: API_KEY
        }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching market stats:', error);
      throw error;
    }
  },

  // Get cryptocurrencies with pagination
  getCryptos: async (page = 1, perPage = 50) => {
    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: perPage,
          page: page,
          sparkline: true,
          price_change_percentage: '1h,24h,7d',
          x_cg_demo_api_key: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching cryptos:', error);
      throw error;
    }
  },

  // Get historical data for a specific crypto
  getHistoricalData: async (id, days = 7) => {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: days,
          x_cg_demo_api_key: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },

  // Get top gainers and losers
  getTopMovers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency: 'usd',
          order: 'price_change_percentage_24h_desc',
          per_page: 100,
          sparkline: false,
          x_cg_demo_api_key: API_KEY
        }
      });
      const data = response.data;
      return {
        gainers: data.slice(0, 5),
        losers: data.slice(-5).reverse()
      };
    } catch (error) {
      console.error('Error fetching top movers:', error);
      throw error;
    }
  },

  // Get detailed information about a specific crypto
  getCryptoDetails: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}`, {
        params: {
          x_cg_demo_api_key: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching crypto details:', error);
      throw error;
    }
  }
};

export default cryptoService; 