import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Image } from 'cloudinary-react';

export default function ProductDescription() {
    const allProducts = useSelector(state => state.Product.productsList)
    var thisProduct = []
    const { id } = useParams()

    const filterProducts = () => {
        return allProducts.filter(product => product._id === id)
    }

    thisProduct = filterProducts()
    
    // console.log(thisProduct)
    if(thisProduct.length > 0)
        var getUrl = `https://res.cloudinary.com/cloudsnehil/image/upload/v1635787798/${thisProduct[0].productPic}`

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop:'6%'}}>
            {thisProduct.length > 0 && <h4>{thisProduct[0].description}</h4>}
            <Image style={{ height: '400px', borderRadius: '25px' }} cloudName = 'cloudSnehil' publicId = {getUrl} />
        </div>
    )
}