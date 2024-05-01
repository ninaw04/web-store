import React, {useState} from 'react';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Cookies from 'js-cookie';
import { Box, ThemeProvider, Stack} from '@mui/material';
import NavBar from './NavBar';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(0);

    //javascript styling
    const styles = {
        login: {
            backgroundColor: 'RoyalBlue',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center'
        },

        box: {
            width: '60%',
            height: '60%',
            borderRadius: 3,
            bgcolor: 'white',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto'
        }

    }

    const navigate = useNavigate('/');

    async function UserLogin(event) {
        event.preventDefault();
        if (email && password) {
            try {
                const response = await axios.post('http://localhost:3000/buyers/login', { email: email, password: password });
                if (response.data.Status === "Success") {
                    console.log(response.data.id);
                    const userData = {
                        id: response.data.id
                    }
                    
                    sessionStorage.setItem('auth', JSON.stringify(userData));
                    Cookies.set('auth', JSON.stringify(userData));
    
                    navigate('/');
                } else {
                    // Handle login failure
                    setError(1);
                }
            } catch (error) {
                console.log(error);
            }
        } else if (!email && password) {
            setError(2);
        } else if (!password && email) {
            setError(3);
        } else {
            setError(4);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='login' style={styles.login} >
            {error === 0 &&(
                <Box sx={styles.box}>
                <Stack spacing={2} sx={{width:'80%'}} >
                    <Box sx={{fontSize: 30, fontWeight: 700}} >Log In</Box>
                    <TextField label="Email" variant='outlined' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <Button variant="contained" onClick={UserLogin} >Log In</Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >OR</Box>
                    <Button variant="outlined" href='/register'>Create Account</Button>
                </Stack>
            </Box>
            )}

            {error === 1 &&(
                <Box sx={styles.box}>
                <Stack spacing={2} sx={{width:'80%'}} >
                    <Box sx={{fontSize: 30, fontWeight: 700}} >Log In</Box>
                    <TextField label="Email" variant='outlined' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <Alert severity="error">Your email or password may be wrong</Alert>
                    <Button variant="contained" onClick={UserLogin} >Log In</Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >OR</Box>
                    <Button variant="outlined" href='/register'>Create Account</Button>
                </Stack>
            </Box>
            )}

            {error === 2 &&(
                <Box sx={styles.box}>
                <Stack spacing={2} sx={{width:'80%'}} >
                    <Box sx={{fontSize: 30, fontWeight: 700}} >Log In</Box>
                    <TextField label="Email" variant='outlined' value={email} onChange={(event) => setEmail(event.target.value)} error />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <Alert severity="error">Email can't be empty</Alert>
                    <Button variant="contained" onClick={UserLogin} >Log In</Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >OR</Box>
                    <Button variant="outlined" href='/register'>Create Account</Button>
                </Stack>
            </Box>
            )}

            {error === 3 &&(
                <Box sx={styles.box}>
                <Stack spacing={2} sx={{width:'80%'}} >
                    <Box sx={{fontSize: 30, fontWeight: 700}} >Log In</Box>
                    <TextField label="Email" variant='outlined' value={email} onChange={(event) => setEmail(event.target.value)} />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                        error
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <Alert severity="error">Password can't be empty</Alert>
                    <Button variant="contained" onClick={UserLogin} >Log In</Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >OR</Box>
                    <Button variant="outlined" href='/register'>Create Account</Button>
                </Stack>
            </Box>
            )}

            {error === 4 &&(
                <Box sx={styles.box}>
                <Stack spacing={2} sx={{width:'80%'}} >
                    <Box sx={{fontSize: 30, fontWeight: 700}} >Log In</Box>
                    <TextField label="Email" variant='outlined' value={email} onChange={(event) => setEmail(event.target.value)} error />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            error
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
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </FormControl>
                    <Alert severity="error">Email and Password can't be empty</Alert>
                    <Button variant="contained" onClick={UserLogin} >Log In</Button>
                    <Box sx={{display: 'flex', justifyContent: 'center', fontWeight: 'bold'}} >OR</Box>
                    <Button variant="outlined" href='/register'>Create Account</Button>
                </Stack>
            </Box>
            )}
            
        </div>
    );
}

export default Login;