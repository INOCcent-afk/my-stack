import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "../ui/navbar/Navbar";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <div className="max-w-screen-lg mx-auto my-10 px-10 lg:px-0 flex flex-col gap-6">
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
export default MyApp;
