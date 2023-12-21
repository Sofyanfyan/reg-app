"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <Provider store={store}>{children}</Provider>
    </PrimeReactProvider>
  );
}
