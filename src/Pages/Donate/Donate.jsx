import React, { useContext } from 'react';
import useAxios from '../../Hooks/useAxios';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';

const Donate = () => {
    const axiosInstance = useAxios()
const {user} = useContext(AuthContext)
const navigate = useNavigate()

    const handleCheckout = (e)=>{
        e.preventDefault ()
        const donateAmount = e.target.donateAmount.value
        const donorEmail = user?.email
        const donorName = user?.displayName

        const formData = {
            donateAmount,
            donorEmail,
            donorName
        }

        axiosInstance.post('/create-payment-checkout', formData)
        .then(res=>{
            console.log(res.data);
            window.location.href = res.data.url
            
        })
    }
    return (
        <div>
            <form onSubmit={handleCheckout} className='flex justify-center items-center min-h-screen gap-2'>
                <input name='donateAmount' type="text" placeholder="Type here" className="input" />
                <button type="submit" className='btn btn-primary'> Submit</button>
            </form>
        </div>
    );
};

export default Donate;