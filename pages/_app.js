import "../styles/globals.css";
import { AuthProvider } from "../Contexts/AuthContext";
import { DataProvider } from "../Contexts/DataContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
