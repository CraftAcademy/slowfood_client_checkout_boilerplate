import React, { Component } from "react";
import DisplayProductData from "./components/DisplayProductData";
import Login from "./components/Login";
import OrderDetails from "./components/OrderDetails";
import axios from "axios";
import BecomeSubscriber from "./components/BecomeSubscriber";
import { Elements } from "react-stripe-elements";

class App extends Component {
  state = {
    authenticated: false,
    message: null,
    orderItemsCount: null,
    order: {},
    viewOrderDetails: false,
  };

  toggleAuthenticatedState() {
    this.setState({ authenticated: !this.state.authenticated });
  }

  async addToOrder(event) {
    let productID = parseInt(event.target.dataset.product);
    let headers = JSON.parse(localStorage.getItem("credentials")); // RED FLAG
    let response;
    if (this.state.order.hasOwnProperty("id")) {
      response = await axios.put(
        `http://localhost:3000/api/orders/${this.state.order.id}`,
        { product_id: productID },
        { headers: headers }
      );
    } else {
      response = await axios.post(
        "http://localhost:3000/api/orders",
        { product_id: productID },
        { headers: headers }
      );
    }
    this.setState({ message: response.data.message });
    let count = response.data.order.items.length;
    this.setState({ orderItemsCount: count, order: response.data.order });
  }

  render() {
    return (
      <>
        {this.state.authenticated ? (
          <Elements>
            <BecomeSubscriber />
          </Elements>
        ) : (
          <Login
            toggleAuthenticatedState={() => this.toggleAuthenticatedState()}
          />
        )}
        <h1>Slowfood</h1>
        {this.state.message && <h2 data-cy="message">{this.state.message}</h2>}
        {this.state.orderItemsCount && (
          <h3 data-cy="order-items-count">
            You have {this.state.orderItemsCount} item in your order
          </h3>
        )}
        {this.state.order.hasOwnProperty("id") && (
          <button
            onClick={() =>
              this.setState({ viewOrderDetails: !this.state.viewOrderDetails })
            }
          >
            View order
          </button>
        )}
        {this.state.viewOrderDetails && (
          <OrderDetails order={this.state.order} />
        )}
        <DisplayProductData addToOrder={(event) => this.addToOrder(event)} />
      </>
    );
  }
}

export default App;
