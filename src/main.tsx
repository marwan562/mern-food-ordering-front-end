import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter.tsx";
import Auth0Provider from "./providers/Auth0Provider.tsx";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={client}>
        <Auth0Provider>
          <AppRouter />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </Auth0Provider>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
