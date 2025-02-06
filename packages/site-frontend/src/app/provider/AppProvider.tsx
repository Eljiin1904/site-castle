import { Provider as StoreProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { IntercomProvider } from "react-use-intercom";
import config from "#app/config";
import { store } from "../../store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const AppProvider = ({ children }: { children: any }) => {
  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <IntercomProvider
            appId={config.intercomAppId}
            autoBoot={false}
          >
            {children}
          </IntercomProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </StoreProvider>
  );
};
