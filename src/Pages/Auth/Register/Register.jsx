import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation } from 'react-router';
import SocialLogin from '../Social Login/SocialLogin';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    console.log('register', location);
    
    const handleRegistration = (data) => {
        const profileImg = data.photo[0]

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                //store the img and get the photo url
                const formData = new FormData()
                formData.append('image', profileImg)

                const imgAPIURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`

                axios.post(imgAPIURL, formData)
                .then(res=>{
                    console.log('after img upload', res.data.data.url);
                    const userProfile = {
                        displayName: data.name,
                        photoURL: res.data.data.url
                    }
                    updateUserProfile(userProfile)
                    .then(()=>{
                        console.log('user profile updated');
                        axios.post('http://localhost:3000/users', {
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            photoURL: res.data.data.url
                        })
                        .then(res=>{
                            console.log(res);
                            navigate(location.state || '/')
                            
                        }).catch(error=>{
                            console.log(error);
                            
                        })
                        
                    })
                    .catch(error=>{
                        console.log(error);
                        
                    })
                })
            
                
            }).catch(error => {
                console.log(error);

            })
    }
    return (
        <div className='lg:w-9/12 mx-auto space-y-4' >
            <h2 className='text-5xl font-bold'>Create an Account</h2>
            <p>Register with ZapShift</p>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
                    <fieldset className="fieldset">

                        {/* name  */}
                        <label className="name">Name</label>
                        <input type="name" {...register('name', { required: true })} className="input" placeholder="Name" />
                        {errors.name?.type === 'required' && (<p className='text-red-500'> Name is require</p>)}

                        {/* image  */}
                        <label className="label">Photo</label>
                        
                        <input type="file" {...register('photo', { required: true })}  className="file-input" />

                        {errors.photo?.type === 'required' && (<p className='text-red-500'> Photo is require</p>)}

                        {/* email  */}
                        <label className="label">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />

                        {errors.email?.type === 'required' && (<p className='text-red-500'> Email is require</p>)}

                        <label className="label">Password</label>
                        <input type="password" {...register('password', {
                            required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/
                        })} className="input" placeholder="Password" />

                        {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'> password must be 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-red-500'> Password must At least 1 uppercase + 1 lowercase + 1 number + min 6 characters</p>}

                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn bg-primary mt-4">Register</button>
                    </fieldset>
                    <p>Already have an account? <Link 
                    state={location.state}
                    className='text-primary font-bold' to='/login'> Login</Link> </p>
                </form>
                <SocialLogin></SocialLogin>
            </div>
        </div>
    );
};

export default Register;