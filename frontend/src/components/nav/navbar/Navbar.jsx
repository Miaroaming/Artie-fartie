import { Link } from 'react-router-dom'
import './navbar.scss'

const Navbar = () => {
  return (
    <header>
        <div className="Container">
          <Link to="/">
            <h1>ARTIE FARTIE'S</h1>
          </Link>
        </div>
    </header>
  )
}

export default Navbar
