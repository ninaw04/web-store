import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    async function UserLogin() {
        try {
            await axios.post('http://localhost:3000/buyers/login', {email: email, password: password});
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='login' style={styles.login} >
            <div className='container' style={styles.container} >
                <div className='login-info' style={styles.loginInfo} >
                    <h3 style={{fontFamily: 'Verdana, Geneva, sans-serif'}} >Log In</h3>
                    <TextField label="Email" variant='outlined' style={styles.input} value={email} onChange={(event) => setEmail(event.target.value)} />
                    <TextField label="Password" variant='outlined' style={styles.input} type='password' value={(password)} onChange={(event) => setPassword(event.target.value)} />
                    <div className='buttons' style={styles.buttons} >
                        <Button variant="outlined" onClick={() => UserLogin()} >Log In</Button>
                        <Button variant="outlined" href='/register'>Create Account</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;