import { Link } from 'react-router-dom'
import './navbar.scss'
import { useLogout } from '../../../hooks/useLogout'
import { useAuthContext } from '../../../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <div className="Container">
          <Link to="/">
            <h1>ARTIE FARTIE'S</h1>
          </Link>

          {user && (<div>
                <span>{user.email}</span>
                <button onClick={handleClick}>Logout</button>
              </div>)}

              {!user && (<div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>)}
        </div>
    </header>
  )
}

export default Navbar
