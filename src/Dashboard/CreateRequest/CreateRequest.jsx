import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Send, MapPin, Hospital, Droplets, Calendar, Clock, MessageSquare } from "lucide-react";

const CreateRequest = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const [upazila, setUpazila] = useState([]);
    const [districts, setDistricts] = useState([]);

    useEffect(() => {
        axios.get('/district.json')
            .then(res => setDistricts(res.data.districts))
            .catch(err => console.error(err));

        axios.get('/upazila.json')
            .then(res => setUpazila(res.data.upazilas))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const statusRes = await axiosSecure.get(`/users/role/${user.email}`);
            if (statusRes.data.status === 'blocked') {
                toast.error("Access Denied: Your account has been blocked by an admin.");
                return;
            }
        } catch (err) {
            console.error("Status check failed");
        }

        setIsLoading(true);
        const form = e.target;
        const requestData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: form.recipientName.value,
            bloodGroup: form.bloodGroup.value,
            district: form.district.value,
            upazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            fullAddress: form.fullAddress.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            requestMessage: form.requestMessage.value,
            status: "pending",
            createdAt: new Date().toISOString(),
        };

        try {
            await axiosSecure.post("/requests", requestData);
            toast.success("Request Created Successfully!");
            navigate('/dashboard/my-donation-requests');
        } catch (error) {
            toast.error("Failed to create request");
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#ea0606] focus:ring-2 focus:ring-red-100 outline-none transition-all duration-200 bg-white text-slate-700";
    const labelClass = "block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2";

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
                {/* Header Section */}
                <div className="bg-slate-900 p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h1 className="text-3xl font-black tracking-tight">Create Donation Request</h1>
                        <p className="text-slate-400 mt-2">Provide accurate details to find a donor quickly.</p>
                    </div>
                    {/* Decorative Background Icon */}
                    <Droplets className="absolute -right-10 -bottom-10 text-white/5 w-64 h-64" />
                </div>

                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                    {/* Read-only User Section */}
                    <div className="grid md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                        <div>
                            <label className={labelClass}>Requester Name</label>
                            <input value={user?.displayName || ""} disabled className={`${inputClass} bg-slate-100 border-transparent text-slate-500 font-medium`} />
                        </div>
                        <div>
                            <label className={labelClass}>Requester Email</label>
                            <input value={user?.email || ""} disabled className={`${inputClass} bg-slate-100 border-transparent text-slate-500 font-medium`} />
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}><Send size={16} className="text-[#ea0606]" /> Recipient Name</label>
                            <input name="recipientName" required placeholder="Who needs blood?" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}><Droplets size={16} className="text-[#ea0606]" /> Blood Group Required</label>
                            <select name="bloodGroup" required className={inputClass}>
                                <option value="">Select blood group</option>
                                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Location Info */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}><MapPin size={16} className="text-[#ea0606]" /> District</label>
                            <select name="district" required className={inputClass}>
                                <option value="" disabled selected>Select District</option>
                                {districts?.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className={labelClass}><MapPin size={16} className="text-[#ea0606]" /> Upazila</label>
                            <select name="upazila" required className={inputClass}>
                                <option value="" disabled selected>Select Upazila</option>
                                {upazila.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}><Hospital size={16} className="text-[#ea0606]" /> Hospital Name</label>
                            <input name="hospitalName" required placeholder="e.g. Dhaka Medical College" className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}><MapPin size={16} className="text-[#ea0606]" /> Full Address Line</label>
                            <input name="fullAddress" required placeholder="Street, House No, Landmark" className={inputClass} />
                        </div>
                    </div>

                    {/* Time & Date */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <label className={labelClass}><Calendar size={16} className="text-[#ea0606]" /> Donation Date</label>
                            <input type="date" name="donationDate" required className={inputClass} />
                        </div>
                        <div>
                            <label className={labelClass}><Clock size={16} className="text-[#ea0606]" /> Donation Time</label>
                            <input type="time" name="donationTime" required className={inputClass} />
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <label className={labelClass}><MessageSquare size={16} className="text-[#ea0606]" /> Request Message</label>
                        <textarea name="requestMessage" required placeholder="Briefly explain the urgency..." className={`${inputClass} min-h-[120px] resize-none`} />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-[#ea0606] text-white text-lg font-bold shadow-lg shadow-red-100 hover:bg-red-700 hover:shadow-red-200 transform transition-all active:scale-[0.98] disabled:bg-slate-300 disabled:shadow-none flex items-center justify-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Post Donation Request
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRequest;