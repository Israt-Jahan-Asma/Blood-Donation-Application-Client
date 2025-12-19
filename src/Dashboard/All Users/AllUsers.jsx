import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Context/AuthContext/AuthContext';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
   const fetchUsers = ()=>{
       axiosSecure.get('/users')
           .then(res => {
               setUsers(res.data)
           })
   }

    useEffect(()=>{
        fetchUsers()
       
    }, [axiosSecure])

    const handleStatusChange = (email, status )=>{
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`)
        .then(res=>{
            console.log(res.data);
            fetchUsers()
        })
    }
    
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        
                        <th>Name</th>
                        <th>Role</th>
                        <th>User Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {users?.map(user => (<tr key={user._id}>
                        
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src={user?.photoURL}
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{user?.name}</div>
                                    <div className="text-sm opacity-50">{user?.email}</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            
                            <span className="badge badge-ghost badge-sm">{user?.role}</span>
                        </td>
                        <td>{user?.status}</td>
                        <th>
                            {
                                user?.status == 'active' ? (<button onClick={() => handleStatusChange(user?.email, 'blocked')} className="btn btn-error btn-xs">Block</button>) 
                                :
                                (<button onClick={() => handleStatusChange(user?.email, 'active')} className="btn btn-success btn-xs">Active</button>) 
                                
                              
                            }
                           
                           
                        </th>
                    </tr>))}
                    
                </tbody>
                
            </table>
        </div>
    );
};

export default AllUsers;