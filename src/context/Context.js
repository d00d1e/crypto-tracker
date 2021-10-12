import { createContext, useContext, useEffect, useState } from "react";

const CryptoContext = createContext();

export const CryptoState = () => {
  return useContext(CryptoContext);
};

export const Context = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
  }, [currency]);

  return (
    <CryptoContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};
