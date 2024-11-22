import React from 'react'
import './OrderConfirmedPage.css'
import { Link } from 'react-router-dom'
import googleMaps from '../assets/googleMaps.png'
const OrderConfirmedPage = () => {

    return (
        <>
            <div className='orderCon'>
                <h1>Order Confirmed</h1>
                <p>Thank you for your purchase!</p>
                <Link className='linkHome' to='/'>Return to Home</Link>
            </div>
            <div className='penis'>
                <a href='https://www.google.com/maps' target='_blank' rel='noopener noreferrer' >
                    <img src={googleMaps} alt='google maps' className='googleMaps'/>
                </a>
            </div>
        </>
    )
}

export default OrderConfirmedPage