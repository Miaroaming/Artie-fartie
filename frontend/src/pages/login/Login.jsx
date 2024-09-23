import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import './login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    // States for different screen sizes
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1350);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 992);
    const [isPhone, setIsPhone] = useState(window.innerWidth <= 600);

    const navigate = useNavigate();
    const { login } = useLogin(); // Make sure to destructure login

    // Handle screen resize events
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 1350);
            setIsTablet(window.innerWidth <= 992);
            setIsPhone(window.innerWidth <= 600);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleSubmit = async (e) => {  // Mark the function as async
        e.preventDefault();

        // Check if email and password are filled
        if (!email || !password) {
            setErrorMessage('Email and password are required.');
            return;
        }

        // Validate password using regex
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters long, include one special character, one uppercase letter, and one number.');
            return;
        }

        try {
            // Attempt to log in
            await login(email, password);  

            // If login is successful, clear the error message and navigate to home
            setErrorMessage('');
            navigate('/');
        } catch (error) {
            // Show error if login fails
            setErrorMessage('Login failed. Please check your credentials.');
            console.error(error);
        }
    };

    const handleSkip = () => {
        navigate('/');
    };

    return (
        <div className='login-body'>
            <img
                className='login-header'
                src='../../../public/images/login-title-img.webp'
                alt='Login Image'
            />

            <form className='login' onSubmit={handleSubmit}>
                <div className='card-background'>
                    <img
                        className='card-image'
                        src={
                            isPhone
                                ? '../../../public/images/signup-login-phone.png'
                                : isTablet
                                ? '../../../public/images/signup-login-tablet.png'
                                : isSmallScreen
                                ? '../../../public/images/signup-login-small-screen.png'
                                : '../../../public/images/signup-login.png'
                        }
                        alt='card-background'
                    />

                    <div className='login-input-label'>
                        <div className='label-input'>
                            <label>Email:</label>
                            <div className='box-background'>
                                <input
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>

                        <div className='label-input'>
                            <label>Password:</label>
                            <div className='box-background'>
                                <input
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </div>

                        <div className='login-button'>
                            <button className='add-post-btn'>Login</button>
                        </div>

                        {/* Display error message */}
                        {errorMessage && <div className='error-message'>{errorMessage}</div>}
                    </div>
                </div>
            </form>

            <button className='add-post-btn' onClick={handleSkip}>Skip now</button>
        </div>
    );
};

export default Login;