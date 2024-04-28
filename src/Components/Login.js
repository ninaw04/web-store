import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Cookies from 'js-cookie';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    //javascript styling
    const styles = {
        login: {
            backgroundColor: 'RoyalBlue',
            height: '100vh'
        },

        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'White',
            width: '70%',
            height: 'auto',
            margin: 'auto',
            position: 'relative',
            borderRadius: '5px',
            verticalAlign: 'center'
        },

        loginInfo: {
            display: 'flex',
            flexDirection: 'column',
            padding: '10px',
            width: '85%'
        },

        input: {
            margin: '10px 0px'
        },

        buttons: {
            textDecoration: 'none'
        }
    }

    const navigate = useNavigate('/');

    async function UserLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/buyers/login', { email: email, password: password });
            if (response.data.Status === "Success") {
                console.log(response.data.id);
                const userData = {
                    id: response.data.id
                }
                
                sessionStorage.setItem('auth', JSON.stringify(userData));
                //const expirationTime = new Date(new Date().getTime() + 60000)
                Cookies.set('auth', JSON.stringify(userData));

                navigate('/');
            } else {
                // Handle login failure
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='login' style={styles.login} >
            <div className='container' style={styles.container} >
                <div className='login-info' style={styles.loginInfo} >
                    <h3 style={{fontFamily: 'Verdana, Geneva, sans-serif'}} >Log In</h3>
                    <TextField label="Email" variant='outlined' style={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    label="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}/>
                    </FormControl>                    
                    <div className='buttons' style={styles.buttons} >
                        <Button variant="outlined" onClick={UserLogin} >Log In</Button>
                        <Button variant="outlined" href='/register'>Create Account</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;