import "../styles/global.css";
import { ToastProvider } from "react-toast-notifications";

function MyApp({ Component, pageProps }) {
  return (
    <ToastProvider
      placement="bottom-center"
    >
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;
