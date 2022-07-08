import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { Header } from "./Header";
import { Layout } from "./Layout";
import { Main } from "./Main";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header />
        <Main />
      </Layout>
    </Provider>
  );
}

export default App;
