import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
  return (
    <header>
        <div className="Container">
          <Link to="/">
            <h1>ARTIE FARTIE'S</h1>
          </Link>
          <Link to="/login">
          <button>Login</button>
          </Link>
          <Link to="/signup">
          <button>Sign up</button>
          </Link>
        </div>
    </header>
  )
}

export default Navbar
