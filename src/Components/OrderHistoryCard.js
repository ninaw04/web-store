import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'

export default function OrderHistoryCard(props) {

    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProductInfo();
    }, [])

    const getProductInfo = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/products/product/${props.productID}`);

            setProduct(response.data[0]);
        } catch (err) {
            console.log(err)
        }
        console.log(product);
        
    }

    return (
        <>
        {product && (
            <TableContainer component={Paper} sx={{margin:'10px', width: '100%'}} >
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Ordered Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            key={product.productName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <img src={product.imgUrl} style={{width:'auto', height:'70px'}} ></img>
                            </TableCell>
                            <TableCell align="left">{product.productName}</TableCell>
                            <TableCell align="left">{product.description}</TableCell>
                            <TableCell align="left">{props.date}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
         </TableContainer>
        )}
            
        </>
    )
}