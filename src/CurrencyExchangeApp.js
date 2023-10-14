import React, { useState, useEffect } from 'react';
import './App.css';

function CurrencyExchangeApp() {
  const [exchangeRates, setExchangeRates] = useState({});
  const [currencyData, setCurrencyData] = useState([]);
  const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

  useEffect(() => {
    async function fetchExchangeRates() {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        const data = await response.json();
        setExchangeRates(data.rates);
        
       
        const updatedCurrencyData = currencies.map((currency) => ({
          currency,
          exchangeRate: data.rates[currency],
          weBuy: data.rates[currency] * 1.05, 
          weSell: data.rates[currency] * 0.95, 
        }));
        setCurrencyData(updatedCurrencyData);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    }

    fetchExchangeRates();
  }, []);

  return (
    <div className="currency-exchange-app">
      <h1>Currency Exchange Rates (1 USD)</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencyData.map((data) => (
            <tr key={data.currency}>
              <td>{data.currency}</td>
              <td>{data.weBuy.toFixed(4)}</td>
              <td>{data.exchangeRate}</td>
              <td>{data.weSell.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyExchangeApp;
