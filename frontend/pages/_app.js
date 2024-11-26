import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import AppContext from "../AppContext";
import Layout from '@/component/layout/layout';

function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({user:null, loggedIn:false});
  return (
    <AppContext.Provider value={{userInfo: userInfo, setUserInfo: setUserInfo}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;