import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { div } from 'motion/react-client';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import { Edit, Eye, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
    const [myRequests, setMyRequests] = useState([])
    const [totalRequest, setTotalRequest] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const axiosSecure = useAxiosSecure()

    useEffect(()=>{
        axiosSecure.get(`/my-donation-requests?size=${itemsPerPage}&page=${currentPage-1}`)
        .then(res=>{
            setMyRequests(res.data.request);
            setTotalRequest(res.data.totalRequest)
            
        })
    }, [axiosSecure, currentPage, itemsPerPage])

    const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
    const pages = [...Array(numberOfPages).keys().map(e=>e+1)]
    // console.log(myRequests);
    // console.log(totalRequest);
    // console.log(numberOfPages);
    console.log(pages);
    const handlePrev = ()=>{
        if (currentPage > 1) {
            setCurrentPage (currentPage-1)
        }
    }
    const handleNext = ()=>{
        if(currentPage <pages.length){
            setCurrentPage(currentPage+1)
        }
    }
    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axiosSecure.patch(`/requests/status-update/${id}`, { status: newStatus });
            toast.success(`Request marked as ${newStatus}`);
            // Refresh data
            setMyRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r));
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ea0606", // Matching your theme red
            cancelButtonColor: "#0f172a", // Matching your slate-900
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/requests/${id}`);
                    if (res.data.deletedCount > 0) {
                        // Update UI locally
                        setMyRequests(prev => prev.filter(r => r._id !== id));

                        Swal.fire({
                            title: "Deleted!",
                            text: "Your request has been deleted.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });
                    }
                } catch (err) {
                    Swal.fire("Error", "Failed to delete the request.", "error");
                }
            }
        });
    };
    return (
       <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Recipient</th>
                            <th>Location</th>
                            <th>Date & Time</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {myRequests.map((request, index) => (
                            <tr key={request._id}>
                                <th>{(currentPage - 1) * itemsPerPage + (index + 1)}</th>
                                <td>{request.recipientName}</td>
                                <td>
                                    <span className="font-medium">{request.district}</span>,
                                    <span className="text-slate-500 text-sm"> {request.upazila}</span>
                                </td>
                                <td>{request.donationDate} <br /> <span className="text-xs opacity-60">{request.donationTime}</span></td>
                                <td><span className='border border-red-500 px-3 py-1 rounded-2xl text-xs'>{request.bloodGroup}</span></td>
                                <td>
                                    <div className="flex flex-col gap-1">
                                        <span className={`badge badge-sm ${request.status === 'pending' ? 'badge-warning' : 'badge-info'}`}>{request.status}</span>
                                        {request.status === 'inprogress' && (
                                            <div className="flex gap-1">
                                                <button onClick={() => handleStatusUpdate(request._id, 'done')} className="btn btn-success btn-xs">Done</button>
                                                <button onClick={() => handleStatusUpdate(request._id, 'canceled')} className="btn btn-error btn-xs">Cancel</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="flex gap-2">
                                    <Link to={`/dashboard/edit-request/${request._id}`} className="p-2 hover:bg-slate-100 rounded-lg text-blue-600">
                                        <Edit size={16} />
                                    </Link>
                                    <button onClick={() => handleDelete(request._id)} className="p-2 hover:bg-slate-100 rounded-lg text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                    <Link to={`/request-details/${request._id}`} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600">
                                        <Eye size={16} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            
            {totalRequest > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                        Page {currentPage} of {totalRequest}
                    </p>
                    <div className="flex gap-2">
                        <button variant="outline" size="sm" onClick={handlePrev}>
                        Previous
                        </button>
                        {
                            pages.map(page =>
                                (<button className={`btn ${page === currentPage ? "bg-red-400 text-white" : ''}`} onClick={() => setCurrentPage(page)}> {page} </button>)
                            )}
                        <button variant="outline" size="sm" onClick={handleNext}>
                        Next
                        </button>
                    </div>
                </div>
                
            )}
       </div>
    );
};

export default MyDonationRequests;