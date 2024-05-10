import React, {useState, useEffect} from 'react';
import {Box, TextField, Button, Stack} from '@mui/material'
import OrderHistoryCard from './OrderHistoryCard';
import Cookies from 'js-cookie'
import axios from 'axios'

export default function ProfilePage() {
    const [userId, setUserId] = useState(null);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [street, setStreet] =useState("");
    const [aptNumber, setAptNumber] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const authCookie = Cookies.get("auth");
        if (authCookie) {
            const userInfo = JSON.parse(authCookie);
            setUserId(userInfo.id);
            getUserInfo(userInfo.id);
            getOrders(userInfo.id);
        }
    }, [])

    const getUserInfo = async(userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/buyers/info/${userId}`);
            setFname(response.data.fName);
            setLname(response.data.lName);
        } catch (error) {
            console.log(error);
       }
    }

    const getOrders = async(userId) => {
        try {
            const response = await axios.get(`http://localhost:3000/buyers/order/${userId}`);
            setOrders(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    const updateAddress = async(userId) => {
        try {
            const response = await axios.post(`http://localhost:3000/buyers/address/${userId}`, {street: street, country: country, aptNumber: aptNumber, state: state, zipcode: zipcode, city: city});
        } catch (err) {
            console.log(err)
        }
    }

    const style = {
        image: {
            width: 'auto',
            height: '300px',
            borderRadius: 3
        }
    }

return (
    <>
        <Box sx={{flexDirection: 'row', flexWrap: 'wrap', justifyContent:'center', margin:'10px 10px'}} >
            <Box sx={{ flexDirection: 'row', justifyContent: 'center', alignItems:'center'}} >
                {userId % 2 === 0 ? (
                    <img src='assets/images/kitty.jpeg' alt='gym kitty' style={style.image} ></img>
                ):(
                    <img src='assets/images/kuromi.jpeg' alt='gym kuromi' style={style.image} ></img>
                )
                }
                <Box style={{fontWeight: 'bold', fontSize: 30}}>{fname} {lname}</Box>
            </Box>

            <Box>
                <Box>
                <Box style={{fontWeight: 'bold', fontSize: 18}} >Update your shipping address here</Box>
                <Box sx={{display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)'}} >
                    <TextField label="Street Address" variant="standard" value={street} onChange={(event) => setStreet(event.target.value)} required />
                    <TextField label="Apartment Number(if applicable)" variant="standard" value={aptNumber} onChange={(event) => setAptNumber(event.target.value)} />
                    <TextField label="Country" variant="standard" value={country} onChange={(event) => setCountry(event.target.value)} required />
                    <TextField label="State" variant="standard" value={state} onChange={(event) => setState(event.target.value)} required />
                    <TextField label="City" variant="standard" value={city} onChange={(event) => setCity(event.target.value)} required />
                    <TextField  label="Zip code" variant="standard" value={zipcode} onChange={(event) => setZipcode(event.target.value)} required />
                </Box>
                <Box sx={{marginTop: '10px'}} >
                    <Button variant="contained" onClick={() => updateAddress(userId)} >Update</Button>
                </Box>
                </Box>
            </Box>
            
            <Box sx={{marginTop: '10px', width: '98%'}} >
                <Box sx={{fontWeight:'bold'}} >Purchase History</Box>
                {orders.map((i) => {
                    return (
                    <OrderHistoryCard 
                        productID = {i.productID}
                        date = {i.boughtDate}
                    />  
                    )
                    
                })}
                
            </Box>
        </Box>
    </>
)

}