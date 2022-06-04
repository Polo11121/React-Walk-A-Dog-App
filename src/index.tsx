import React from "react";
import { render } from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./hooks/context/AuthContext";
import { WalksProvider } from "hooks/context/WalksContext";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorBoundary } from "react-error-boundary";
import App from "./App";
import "./index.css";
import ErrorFallback from "Components/ErrorFallback/ErrorFallback";

const queryClient = new QueryClient();

const root = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <WalksProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <App />
            </ErrorBoundary>
          </WalksProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
