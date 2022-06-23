import React from "react";
import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import Nav from "./App";
import store from "./reducer";

function App() {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
}

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
