import { useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios
      .get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => setCurrencies(Object.keys(res.data.rates)))
      .catch((err) => console.error(err));
  }, []);

  const convert = () => {
    if (!amount || isNaN(amount)) return;

    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${from}`)
      .then((res) => {
        const rate = res.data.rates[to];
        const converted = (amount * rate).toFixed(2);
        setResult(converted);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="converter">
      <h2>Currency Converter</h2>

      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <div className="row">
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>

        <span>To</span>

        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
      </div>

      <button onClick={convert}>Convert</button>

      {result && (
        <h3>
          {amount} {from} = {result} {to}
        </h3>
      )}
    </div>
  );
};

export default CurrencyConverter;
