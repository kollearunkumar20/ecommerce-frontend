import { Link, useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'

import './index.css'

const Header = () => {
  const navigate = useNavigate() 
  const location = useLocation()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', { replace: true }) 
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const { cartList } = value
        const cartItemsCount = cartList.length

        return cartItemsCount > 0 ? (
          <span className="cart-count-badge">{cartItemsCount}</span>
        ) : null
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="nav-bar-mobile-logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="./arun3.png"
              alt="website logo"
            />
          </Link>

          <button
            type="button"
            className="nav-mobile-btn"
            onClick={onClickLogout}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
              alt="nav logout"
              className="nav-bar-img"
            />
          </button>
        </div>

        <div className="nav-bar-large-container">
          <Link to="/">
            <img
              className="website-logo"
              src="./arun2.png"
              alt="website logo"
            />
          </Link>
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/products" className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}>
                Products
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/cart" className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`}>
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
            <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
          </ul>

        </div>
      </div>
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                alt="nav home"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/products" className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                alt="nav products"
                className="nav-bar-img"
              />
            </Link>
          </li>
          <li className="nav-menu-item-mobile">
            <Link to="/cart" className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                alt="nav cart"
                className="nav-bar-img"
              />
              {renderCartItemsCount()}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
