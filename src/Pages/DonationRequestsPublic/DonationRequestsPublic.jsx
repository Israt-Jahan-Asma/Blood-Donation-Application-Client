import React from 'react';
import { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { Calendar, Clock, MapPin, User, Droplets } from "lucide-react";

const DonationRequestsPublic = () => {
    const [requests, setRequests] = useState([]);
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/requests-public')
            .then(res => setRequests(res.data));
    }, []);

    return (
        <div className="section-container pt-10 pb-20">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Active <span className="text-[#ea0606]">Donation Requests</span>
                </h2>
                <p className="text-slate-600">These patients are urgently looking for donors. Can you help?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map(req => (
                    <div key={req._id} className="stats-card border-l-4 border-l-[#ea0606]">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-red-50 text-[#ea0606] px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                                <Droplets size={16} /> {req.bloodGroup}
                            </div>
                            <div className="text-xs font-bold uppercase text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                {req.status}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <User size={18} className="text-slate-400" /> {req.recipientName}
                        </h3>

                        <div className="space-y-3 text-sm text-slate-600 mb-6">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#ea0606]" />
                                {req.upazila}, {req.district}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#ea0606]" />
                                {req.donationDate}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-[#ea0606]" />
                                {req.donationTime}
                            </div>
                        </div>

                        <Link
                            to={`/request-details/${req._id}`}
                            className="btn-primary w-full py-2"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
            {requests.length === 0 && (
                <p className="text-center text-slate-500 mt-20">No pending requests at the moment.</p>
            )}
        </div>
    );
};

export default DonationRequestsPublic;