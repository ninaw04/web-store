import React, {useState} from 'react';
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
import {Button, Box, Input, Alert} from '@mui/material';

function Register() {

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [street, setStreet] = useState("");
    const [aptNumber, setAptNumber] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate('/');

    const styles = {
        register: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        
        box: {
            display: 'flex',
            width: '90%',
            height: '80%',
            borderRadius: 4,
            overflowY: 'scroll'
        },

        left: {
            width: '40%', 
            height: '100%',
            backgroundColor: 'DodgerBlue',
            justifyContent: 'center'
        },

        right : {
            width: '60%',
            height: '100%',
            alignContent: 'flex-start',
            justifycontent: 'center'
        }
    }

    async function registerUser() {
        if (fname && lname && email && password && street && country&& state && city && zipcode) {
            try {
                const response = await axios.post(`http://localhost:3000/buyers/buyer`, {fName: fname, lName:lname});
                const id = response.data.id;
                await axios.post(`http://localhost:3000/buyers/user`, {id: id, email: email, password: password});
                await axios.post(`http://localhost:3000/buyers/address`, {id: id, country: country, streetAdd: street, aptNum: aptNumber, city: city, state: state, zip: zipcode});
            } catch (error) {
                console.log(error);
            }
            setBlank();
            navigate('/login')
        } else {
            setError(true);
        }
    }    

    function setBlank() {
        setFname("");
        setLname("");
        setEmail("");
        setPassword("");
        setStreet("");
        setAptNumber("");
        setCountry("");
        setState("");
        setCity("");
        setZipcode("");
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='register' style={styles.register} >
            {!error ? (
                <Box style={styles.box} sx={{boxShadow: 3}} >
            <Box className='left' sx={styles.left} >
                <h1>Create your account</h1>
                <p>To access awesome muscle mommies products!</p>
            </Box>
            <Box className='right' sx={styles.right} >

                <Box style={{padding: '30px 0px 15px 20px', fontWeight: '1000', fontSize: 23}} >Registration</Box>

                <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', padding:'0px 20px'}} >
                <TextField label="First Name" variant="standard" value={fname} onChange={(event) => setFname(event.target.value)} required />
                <TextField label="Last Name" variant="standard" value={lname} onChange={(event) => setLname(event.target.value)} required />
                <TextField label="Email" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} required />
                
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        value={password}
                        onChange={((event) => setPassword(event.target.value))}
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                </Box>

                <Box style={{padding: '25px 20px 0px', fontWeight: 'bold', fontSize: 18}} >Shipping Address</Box>
                <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', padding: '0px 20px'}} >
                    <TextField label="Street Address" variant="standard" value={street} onChange={(event) => setStreet(event.target.value)} required />
                    <TextField label="Apartment Number(if applicable)" variant="standard" value={aptNumber} onChange={(event) => setAptNumber(event.target.value)} />
                    <TextField label="Country" variant="standard" value={country} onChange={(event) => setCountry(event.target.value)} required />
                    <TextField label="State" variant="standard" value={state} onChange={(event) => setState(event.target.value)} required />
                    <TextField label="City" variant="standard" value={city} onChange={(event) => setCity(event.target.value)} required />
                    <TextField  label="Zip code" variant="standard" value={zipcode} onChange={(event) => setZipcode(event.target.value)} required />
                </Box>
                <Box style={{padding: '30px 20px'}} >
                    <Button variant="contained" onClick={registerUser} >Register</Button>
                </Box>
                
            </Box>
            </Box>
            ):
<Box style={styles.box} sx={{boxShadow: 3}} >
            <Box className='left' sx={styles.left} >
                <h1>Create your account</h1>
                <p>To access awesome muscle mommies products!</p>
            </Box>
            <Box className='right' sx={styles.right} >

                <Box style={{padding: '30px 0px 15px 20px', fontWeight: '1000', fontSize: 23}} >Registration</Box>

                <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', padding:'0px 20px'}} >
                <TextField label="First Name" variant="standard" value={fname} onChange={(event) => setFname(event.target.value)} required />
                <TextField label="Last Name" variant="standard" value={lname} onChange={(event) => setLname(event.target.value)} required />
                <TextField label="Email" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} required />
                
                <FormControl variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                </Box>

                <Box style={{padding: '25px 20px 0px', fontWeight: 'bold', fontSize: 18}} >Shipping Address</Box>
                <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', padding: '0px 20px 5px'}} >
                    <TextField label="Street Address" variant="standard" value={street} onChange={(event) => setStreet(event.target.value)} required />
                    <TextField label="Apartment Number(if applicable)" variant="standard" value={aptNumber} onChange={(event) => setAptNumber(event.target.value)} />
                    <TextField label="Country" variant="standard" value={country} onChange={(event) => setCountry(event.target.value)} required />
                    <TextField label="State" variant="standard" value={state} onChange={(event) => setState(event.target.value)} required />
                    <TextField label="City" variant="standard" value={city} onChange={(event) => setCity(event.target.value)} required />
                    <TextField  label="Zip code" variant="standard" value={zipcode} onChange={(event) => setZipcode(event.target.value)} required />
                </Box>
                <Alert variant="outlined" severity="error">Please fill in the empty entries</Alert>
                <Box style={{padding: '5px 20px'}} >
                    <Button variant="contained" onClick={registerUser} >Register</Button>
                </Box>
                
            </Box>
            </Box>
            }
            
            
        </div>
    );
}

export default Register;