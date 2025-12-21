import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Edit3, Save, X, User as UserIcon } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userData, setUserData] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserData(res.data);
                    reset(res.data); // Pre-fill the form
                });
        }
    }, [user, axiosSecure, reset]);

    const onSubmit = async (data) => {
        try {
            const { name, bloodGroup, district, upazila, photoURL } = data;
            const updatedInfo = { name, bloodGroup, district, upazila, photoURL };

            const res = await axiosSecure.patch(`/users/update/${user.email}`, updatedInfo);
            if (res.data.modifiedCount > 0) {
                setUserData({ ...userData, ...updatedInfo });
                toast.success("Profile updated successfully!");
                setIsEditable(false);
            }
        } catch (error) {
            toast.error("Failed to update profile");
        }
    };

    if (!userData) return <div className="p-10">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                {/* Profile Header */}
                <div className="bg-slate-900 p-8 text-white flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <img
                            src={userData.photoURL || 'https://via.placeholder.com/150'}
                            alt="Avatar"
                            className="w-32 h-32 rounded-full border-4 border-[#ea0606] object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h2 className="text-3xl font-bold">{userData.name}</h2>
                        <p className="text-slate-400 uppercase tracking-widest text-sm">{userData.role}</p>
                    </div>
                    <button
                        onClick={() => setIsEditable(!isEditable)}
                        className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all ${isEditable ? 'bg-slate-700 text-white' : 'bg-[#ea0606] text-white hover:bg-red-700'}`}
                    >
                        {isEditable ? <><X size={18} /> Cancel</> : <><Edit3 size={18} /> Edit Profile</>}
                    </button>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Full Name</label>
                        <input
                            {...register("name")}
                            disabled={!isEditable}
                            className={`input-field ${!isEditable && 'bg-slate-50 border-transparent'}`}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Email (Non-editable)</label>
                        <input
                            value={userData.email}
                            disabled
                            className="input-field bg-slate-100 border-transparent text-slate-500 cursor-not-allowed"
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Blood Group</label>
                        <select
                            {...register("bloodGroup")}
                            disabled={!isEditable}
                            className={`input-field ${!isEditable && 'bg-slate-50 border-transparent'}`}
                        >
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">District</label>
                        <input
                            {...register("district")}
                            disabled={!isEditable}
                            className={`input-field ${!isEditable && 'bg-slate-50 border-transparent'}`}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Upazila</label>
                        <input
                            {...register("upazila")}
                            disabled={!isEditable}
                            className={`input-field ${!isEditable && 'bg-slate-50 border-transparent'}`}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label font-bold text-slate-700">Photo URL</label>
                        <input
                            {...register("photoURL")}
                            disabled={!isEditable}
                            className={`input-field ${!isEditable && 'bg-slate-50 border-transparent'}`}
                        />
                    </div>

                    {isEditable && (
                        <div className="md:col-span-2 mt-4">
                            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-2">
                                <Save size={20} /> Save Changes
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Profile;