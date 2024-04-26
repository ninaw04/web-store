import React, {useState} from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

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

    const styles = {
        register: {
            display: 'flex'
        }
    }

    async function registerUser() {
        try {
            const response = await axios.post(`http://localhost:3000/buyers/buyer`, {fName: fname, lName:lname});
            const id = response.data.id;
            await axios.post(`http://localhost:3000/buyers/user`, {id: id, email: email, password: password});
            await axios.post(`http://localhost:3000/buyers/address`, {id: id, country: country, streetAdd: street, aptNum: aptNumber, city: city, state: state, zip: zipcode});
        } catch (error) {
            console.log(error);
        }
        setBlank();
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
            <div className='left' >
                <h1>Create your account</h1>
            </div>
            <div className='right' >
                <TextField label="First Name" variant="outlined" value={fname} onChange={(event) => setFname(event.target.value)} />
                <TextField label="Last Name" variant="outlined" value={lname} onChange={(event) => setLname(event.target.value)} />
                <TextField label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)} />
                
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

                <h3>Shipping Address</h3>
                <TextField label="Street Address" variant="outlined" value={street} onChange={(event) => setStreet(event.target.value)} />
                <TextField label="Apartment Number(if apply)" variant="outlined" value={aptNumber} onChange={(event) => setAptNumber(event.target.value)} />
                <TextField label="Country" variant="outlined" value={country} onChange={(event) => setCountry(event.target.value)} />
                <TextField label="State" variant="outlined" value={state} onChange={(event) => setState(event.target.value)} />
                <TextField label="City" variant="outlined" value={city} onChange={(event) => setCity(event.target.value)} />
                <TextField  label="Zip code" variant="outlined" value={zipcode} onChange={(event) => setZipcode(event.target.value)} />
                <Button variant="outlined" onClick={registerUser} >Register</Button>
            </div>
        </div>
    );
}

export default Register;