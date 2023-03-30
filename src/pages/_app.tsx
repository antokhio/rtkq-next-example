import { wrapper } from "@/store";
import "@/styles/globals.css";
import { theme } from "@/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import NextApp, {
  AppInitialProps as NextAppInitialProps,
  AppProps as NextAppProps,
} from "next/app";
import { Provider } from "react-redux";

const App = ({ Component, ...pageProps }: Omit<NextAppProps, "pageProps">) => {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async (ctx): Promise<NextAppInitialProps> => {
      const childrenGip = await NextApp.getInitialProps(ctx);
      return {
        pageProps: {
          ...childrenGip,
        },
      };
    }
);

export default App;
