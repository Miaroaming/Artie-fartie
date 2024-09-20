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
    <nav>
        <div className="nav-container">
          <Link to="/">
            <img id='logo' src="./images/artielogo.png" alt="" />
          </Link>

          {user && (<div id='username-logoutbtn'>
                <span>{user.email}</span>
                <div id='logout-btn'>
                  <button onClick={handleClick}>Logout</button>
                </div>
              </div>)}

              {!user && (<div className='login-signup-btns'>
                <div className='nav-btns'>
                  <Link to="/login">Login</Link>
                </div>
                <div className='nav-btns'>
                  <Link to="/signup">Signup</Link>
                </div>
              </div>)}
        </div>
    </nav>
  )
}

export default Navbar
