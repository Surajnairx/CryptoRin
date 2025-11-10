import { createContext, useState } from "react";

export const CryptoContext = createContext({});

export default function CryptoContextProvider({ children }) {
  const [test, setTest] = useState("this is test state");
  return (
    <CryptoContext.Provider value={test}>{children}</CryptoContext.Provider>
  );
}
