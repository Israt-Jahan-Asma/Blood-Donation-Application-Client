import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Social Login/SocialLogin';
import { toast } from 'react-toastify';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const { signInUser, resetPass } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const email = watch("email")

    const handleLogin = (data) => {

        signInUser(data.email, data.password)
        .then(result=>{
            toast.success('You have Login successfully!')
            navigate(location?.state || '/')
            
        }).catch(error=>{
            toast.error(error.message)
            console.log(error);
            
        })

    }

    const handleForget = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email first!");
            return;
        }
        try {
            await resetPass(email);
            toast.success("Password reset email sent! Check your inbox.");
        } catch (error) {
            toast.error(error.message);
        }
    };

    
    return (
        <div className='lg:w-9/12 mx-auto space-y-4' >
            
            <h2 className='text-5xl font-bold'>Welcome Back</h2>
            <p>Login with Blood Donation Application </p>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">

                        {/* email */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                        {
                            errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                        }
                        {/* password  */}
                        <label className="label">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6 })} className="input" placeholder="Password" />
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character</p>
                        }

                        {/* forgetPass  */}

                        <div><button onClick={handleForget} className="link link-hover">Forgot password?</button></div>

                        {/* login button  */}
                        <button className="btn bg-primary mt-4">Login</button>
                    </fieldset>
                    <p>New to BloodLink? <Link 
                    state={location.state} className='text-primary font-bold' to='/register'> Register</Link> </p>
                </form>
                {/* <SocialLogin></SocialLogin> */}
            </div>
        </div>
    );
};

export default Login;