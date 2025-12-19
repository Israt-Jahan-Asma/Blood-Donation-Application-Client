import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { div } from 'motion/react-client';

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
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            myRequests.map((request, index) => (<tr>
                                <th>{(currentPage*10)+(index+1)-10}</th>
                                <td>{request.recipientName}</td>
                                <td>{request.district}, {request.upazila}</td>
                                <td>{request.donationDate} <br /> <span>
                                    {request.donationTime}</span></td>
                               
                                <td><span className='border-1 border-red-500 px-3 py-1 rounded-2xl'>{request.bloodGroup}</span></td>
                            </tr>))
                        }
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