import App, { AppContext, AppProps } from 'next/app';
import GlobalStyle from '../styles/GlobalStyle';
import Header from '../components/Header';
import { wrapper } from '../store';
import 'react-datepicker/dist/react-datepicker.css';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const { store } = context.ctx;

  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
