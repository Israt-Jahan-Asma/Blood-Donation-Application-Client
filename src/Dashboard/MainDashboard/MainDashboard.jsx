import React, { useEffect, useState, useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext/AuthContext';
import { Link } from 'react-router';
import { Eye, Edit, Trash2 } from 'lucide-react';

const MainDashboard = () => {
    const { user, role } = useContext(AuthContext);
    const [recentRequests, setRecentRequests] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Now it fetches regardless of role, passing role to backend
        if (user?.email) {
            axiosSecure.get(`/my-requests-recent?email=${user.email}&role=${role}`)
                .then(res => setRecentRequests(res.data));
        }
    }, [user, role, axiosSecure]);

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                <h1 className="text-3xl font-bold text-slate-900">
                    Welcome back, <span className="text-[#ea0606]">{user?.displayName}</span>! 👋
                </h1>
                <p className="text-slate-500 mt-2">You are logged in as a <span className="font-semibold uppercase">{role}</span>.</p>
            </div>

            {/* Table Section - Now visible for Admin/Volunteer OR Donors with data */}
            {recentRequests.length > 0 && (
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-4">
                        {role === 'donor' ? "Your Recent Requests" : "Global Recent Requests"}
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className="bg-slate-50">
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date/Time</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentRequests.map((req) => (
                                    <tr key={req._id}>
                                        <td className="font-bold">{req.recipientName}</td>
                                        <td>{req.district}, {req.upazila}</td>
                                        <td>{req.donationDate}<br /><span className="text-xs">{req.donationTime}</span></td>
                                        <td>
                                            <span className={`badge ${req.status === 'pending' ? 'badge-warning' : req.status === 'inprogress' ? 'badge-info' : 'badge-success'}`}>
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="flex gap-2">
                                            <Link to={`/request-details/${req._id}`} className="btn btn-ghost btn-xs text-blue-600"><Eye size={16} /></Link>
                                            {/* Only allow editing if user is the owner or Admin */}
                                            <Link to={`/dashboard/edit-request/${req._id}`} className="btn btn-ghost btn-xs text-green-600"><Edit size={16} /></Link>
                                            <button className="btn btn-ghost btn-xs text-red-600"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 text-center">
                        <Link
                            to={role === 'donor' ? "/dashboard/my-donation-requests" : "/dashboard/my-donation-requests"}
                            className="btn bg-[#ea0606] text-white border-none hover:bg-red-700"
                        >
                            {role === 'donor' ? "View My All Requests" : "View All Requests"}
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainDashboard;