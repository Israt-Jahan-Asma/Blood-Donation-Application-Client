import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../Social Login/SocialLogin';
import { toast } from 'react-toastify';
import { Mail, Lock, LogIn } from 'lucide-react';

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

    // const handleForget = async (e) => {
    //     e.preventDefault();
    //     if (!email) {
    //         toast.error("Please enter your email first!");
    //         return;
    //     }
    //     try {
    //         await resetPass(email);
    //         toast.success("Password reset email sent! Check your inbox.");
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };

    
    return (
        <div className="section-container pt-10 pb-20">
            <div className="max-w-md mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-slate-900 p-8 text-white text-center">
                    <h2 className="text-3xl font-bold">Welcome Back</h2>
                    <p className="text-slate-400 mt-2">Log in to your dashboard</p>
                </div>

                <form className="p-8 space-y-5" onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="email" {...register('email', { required: true })} className="input-field pl-10" placeholder="email@example.com" />
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="password" {...register('password', { required: true })} className="input-field pl-10" placeholder="••••••••" />
                        </div>
                        {/* <div className="text-right mt-2">
                            <button onClick={handleForget} className="text-sm text-slate-500 hover:text-[#ea0606]">Forgot password?</button>
                        </div> */}
                    </div>

                    <button className="btn-primary w-full py-4 text-lg">Login</button>

                    <p className="text-center text-slate-600">
                        New to BloodLink? <Link state={location.state} className='text-[#ea0606] font-bold' to='/register'> Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;