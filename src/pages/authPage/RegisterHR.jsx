import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RegisterHR = () => {
    const { createUser, updateUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure=useAxiosSecure();
    const handleRegister = (data) => {
        console.log(data);
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
            .then(result => {
                console.log(result);
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
                axios.post(image_API_URL, formData)
                    .then(res => {
                        console.log('after image upload', res.data.data.url);

                        const userProfile = {
                            displayName: data.name,
                            photoURL: res.data.data.url
                        }
                        const hrUser = {
                            name: data.name,
                            email: data.email,
                            photoURL:res.data.data.url,
                            dateOfBirth: data.dateOfBirth,
                            role: "hr",
                            packageLimit:5,
                            currentEmployees:0,
                            subscription:'basic',
                            createdAt: new Date()
                        };

                        axiosSecure.post('/users', hrUser)
                        .then(res =>{
                            if(res.data.insertedId){
                                console.log('user created in the database');
                            }
                        })

                        updateUser(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                toast.success('HR manager account Created');
                                navigate(location.state || '/');
                            })
                            .catch(error => {console.log(error)})
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center my-3 font-semibold'>Register an HR account</h3>
            <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                <fieldset className="fieldset">

                    <label className="label">Name</label>
                    <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                    {
                        errors.name?.type === 'required' && <p className='text-red-500'>Name is required.</p>
                    }

                    <label className="label">Photo</label>
                    <input type="file" {...register('photo', { required: true })} className="file-input" placeholder="Your Photo" />
                    {
                        errors.name?.type === 'required' && <p className='text-red-500'>Photo is required.</p>
                    }

                    <label className="label">Email</label>
                    <input type="email" {...register('email', { required: true })} className="input" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required.</p>
                    }

                    <label className="label">Password</label>
                    <input type="password" {...register('password', {
                        required: true,
                        minLength: 6,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                    })} className="input" placeholder="Password" />

                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required.</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>
                            Password must be 6 characters or longer
                        </p>
                    }
                    {
                        errors.password?.type === 'pattern' && <p className='text-red-500'>Password must have at least one uppercase, at least one lowercase, at least one number, and at least one special characters</p>
                    }

                    <label className="label">Date of Birth</label>
                    <input
                        type="date"
                        {...register("dateOfBirth", { required: true })}
                        className="input"
                    />
                    {errors.dateOfBirth && <p className="text-red-500">Date of Birth required</p>}

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary mt-4">Register</button>
                </fieldset>
                <p className='text-center font-semibold'>Already have an account ? <Link state={location.state} className='text-blue-500 underline' to='/auth/login'>Login</Link></p>
                <p className='text-center font-semibold mt-2'>Are you employee ? <Link state={location.state} className='text-blue-500 underline' to='/auth/signup-user'>Register-Employee</Link></p>
            </form>
        </div>
    );
};

export default RegisterHR;