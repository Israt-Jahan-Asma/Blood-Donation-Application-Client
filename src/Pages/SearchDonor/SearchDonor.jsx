import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxios from '../../Hooks/useAxios';

const SearchDonor = () => {
    // 1. All States at the top
    const [upazila, setUpazila] = useState([]);
    const [districts, setDistricts] = useState([]);
    // const [donors, setDonors] = useState([]);
    const axiosInstance = useAxios()

    // 2. All Hooks
    const { register, handleSubmit, formState: { errors } } = useForm();

    // 3. Fetch Data
    useEffect(() => {
        axios.get('/district.json')
            .then(res => {
                
                const data = Array.isArray(res.data) ? res.data : res.data.districts;
                setDistricts(data || []);
            })
            .catch(err => console.error(err));

        axios.get('/upazila.json')
            .then(res => {
                const data = Array.isArray(res.data) ? res.data : res.data.upazilas;
                setUpazila(data || []);
            })
            .catch(err => console.error(err));
    }, []);

    // 4. Handle Search Logic
    const handleSearch = (data) => {
        const { bloodGroup, district, upazila } = data;

        console.log("Search Criteria:", data);
        axiosInstance.get(`/search?bloodGroup=${encodeURIComponent(bloodGroup)}&district=${district}&upazila=${upazila}`)
        .then(res=>{
            console.log(res.data);
            // (res.data);
            
        })
        
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Search Donor</h2>
            <form onSubmit={handleSubmit(handleSearch)} className="space-y-4 grid  grid-cols-3 gap-5">

                {/* Blood Group */}
                <div className="form-control">
                    <label className="label font-semibold">Blood Group</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("bloodGroup", { required: true })}
                        defaultValue=""
                    >
                        <option disabled value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                    {errors.bloodGroup && <p className="text-red-500 text-sm">Blood group is required</p>}
                </div>

                {/* District */}
                <div className="form-control">
                    <label className="label font-semibold">District</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("district")}
                        defaultValue=""
                    >
                        <option value="" disabled>Select District</option>
                        {districts?.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>

                {/* Upazila */}
                <div className="form-control">
                    <label className="label font-semibold">Upazila</label>
                    <select
                        className="select select-bordered w-full"
                        {...register("upazila")}
                        defaultValue=""
                    >
                        <option value="" disabled>Select Upazila</option>
                        {upazila.map(u => (
                            <option key={u.id} value={u.name}>{u.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn btn-primary w-full">Search Donors</button>
            </form>
        </div>
    );
};

export default SearchDonor;