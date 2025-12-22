import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import { Droplets, MapPin, User, Mail, Lock, Image as ImageIcon } from "lucide-react";

const Register = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
  

    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const password = watch("password");
    const [upazila, setUpazila] = useState([])
    const [districts, setDistricts] = useState([])

    useEffect(() => {
        axios.get('/district.json')
            .then(res => {
                setDistricts(res.data.districts);
                
                 
            })
            .catch(err => console.error(err));

        axios.get('/upazila.json')
            .then(res => {
                setUpazila(res.data.upazilas); 
            })
            .catch(err => console.error(err));
    }, []);
    
    

    const handleRegistration = async (data) => {
        try {
            // 1. Create auth user
            const result = await registerUser(data.email, data.password);

            // 2. Upload avatar to imgBB
            const formData = new FormData();
            formData.append("image", data.avatar[0]);

            const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(imgURL, formData);

            const photoURL = imgRes.data.data.url;

            // 3. Update Firebase profile
            await updateUserProfile({
                displayName: data.name,
                photoURL,
            });

            // 4. Save user to database
            await axios.post("https://blood-donation-application-server-sigma.vercel.app/users", {
                name: data.name,
                email: data.email,
                photoURL,
                bloodGroup: data.bloodGroup,
                district: data.district,
                upazila: data.upazila,
                role: "donor",
                createdAt: new Date(),
            });

            navigate(location.state || "/");
        } catch (error) {
            console.error(error);
        }
        
    };

    return (
        <div className="section-container pt-10 pb-20">
            <div className="max-w-2xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="bg-[#ea0606] p-8 text-white text-center">
                    <h2 className="text-3xl font-bold">Join the Mission</h2>
                    <p className="text-red-100 mt-2">Create an account to start saving lives</p>
                </div>

                <form onSubmit={handleSubmit(handleRegistration)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input className="input-field pl-10" placeholder="John Doe" {...register("name", { required: true })} />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="email" className="input-field pl-10" placeholder="email@example.com" {...register("email", { required: true })} />
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold text-slate-700">Profile Picture</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="file" className="file-input w-full border border-slate-200 rounded-xl pl-10 focus:outline-none focus:border-[#ea0606]" {...register("avatar", { required: true })} />
                        </div>
                    </div>

                    {/* Blood Group */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Blood Group</label>
                        <div className="relative">
                            <Droplets className="absolute left-3 top-3 text-[#ea0606]" size={18} />
                            <select className="input-field pl-10" {...register("bloodGroup", { required: true })} defaultValue="">
                                <option disabled value="">Select Group</option>
                                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg}>{bg}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* District */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">District</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select className="input-field pl-10" {...register("district", { required: true })} defaultValue="">
                                <option value="" disabled>Select District</option>
                                {districts?.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Upazila */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Upazila</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select className="input-field pl-10" {...register("upazila", { required: true })} defaultValue="">
                                <option value="" disabled>Select Upazila</option>
                                {upazila.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="password" placeholder="••••••••" className="input-field pl-10" {...register("password", { required: true, minLength: 6 })} />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="form-control md:col-span-2">
                        <label className="label font-bold text-slate-700">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input type="password" placeholder="••••••••" className="input-field pl-10" {...register("confirmPassword", { validate: v => v === password || "Match failed" })} />
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-4">
                        <button className="btn-primary w-full py-4 text-lg">Register Now</button>
                        <p className="text-center mt-6 text-slate-600">
                            Already have an account? <Link to="/login" className="text-[#ea0606] font-bold">Login here</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
