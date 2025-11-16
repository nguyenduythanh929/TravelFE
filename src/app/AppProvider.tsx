"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default function AppProvider({
  children,
  inittialValue,
}: {
  children: React.ReactNode;
  inittialValue: string | undefined;
}) {
  const [sessionToken, setSessionToken] = useState(inittialValue || "");
  const [tourid, setTourid] = useState({
    id: 0,
    name: "",
    imageUrl: "",
    originalPrice: 0,
  });
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}
