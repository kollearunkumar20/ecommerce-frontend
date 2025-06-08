import { Component } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Products from './components/Products';
import ProductItemDetails from './components/ProductItemDetails';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import CartContext from './context/CartContext';

import './App.css';

class App extends Component {
  state = { cartList: [] };

  removeAllCartItems = () => this.setState({ cartList: [] });

  incrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  decrementCartItemQuantity = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  removeCartItem = (id) => {
    this.setState((prevState) => ({
      cartList: prevState.cartList.filter((item) => item.id !== id),
    }));
  };

  addCartItem = (product) => {
    this.setState((prevState) => {
      const updatedCartList = prevState.cartList.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.quantity }
          : item
      );
      const isProductInCart = prevState.cartList.some(
        (item) => item.id === product.id
      );
      return {
        cartList: isProductInCart
          ? updatedCartList
          : [...prevState.cartList, { ...product, quantity: product.quantity }],
      };
    });
  };

  render() {
    const { cartList } = this.state;

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {/* Wrap Routes inside BrowserRouter */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductItemDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartContext.Provider>
    );
  }
}

export default App;
