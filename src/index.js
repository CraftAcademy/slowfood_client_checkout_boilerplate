import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { StripeProvider } from "react-stripe-elements";

axios.defaults.baseURL = "http://localhost:3000/api/";

ReactDOM.render(
  <StripeProvider apiKey="pk_test_51HRXbsLRsHijJIX0zutPae262FCx438btFduSWoETwJ2HCC2vqSjG6sd4PA7RoddpyAvRwnLXUe1ujrUmsB4Gkn500iicqAMK9">
    <App />
  </StripeProvider>,

  document.getElementById("root")
);

serviceWorker.unregister();
