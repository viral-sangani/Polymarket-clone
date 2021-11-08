import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { DataProvider } from "../contexts/DataContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
export default MyApp;
