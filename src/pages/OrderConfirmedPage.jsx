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
                <a href='https://www.google.com/maps/place/Western+Baja+SAE/@43.0048465,-81.2780583,16z/data=!3m1!4b1!4m6!3m5!1s0x882eee11d408b319:0xcfb52819b366b9b8!8m2!3d43.0048426!4d-81.2754834!16s%2Fg%2F11h4f_twv_?entry=ttu&g_ep=EgoyMDI0MTExOS4yIKXMDSoASAFQAw%3D%3D' target='_blank' rel='noopener noreferrer' >
                    <img src={googleMaps} alt='google maps' className='googleMaps' />
                </a>
            </div>
        </>
    )
}

export default OrderConfirmedPage