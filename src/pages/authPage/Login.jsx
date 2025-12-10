import React from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { logIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = (data) => {
        logIn(data.email, data.password)
            .then(result => {
                console.log(result)
                toast.success('Login Successfully');
                navigate(location?.state || '/')
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h3 className='text-3xl text-center my-3 font-semibold'>Welcome Back</h3>
            <p className='text-center text-gray-500'>Please Login</p>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <fieldset className="fieldset">

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

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-primary mt-4">Login</button>
                </fieldset>
                <p className='text-center font-semibold'>New to Zap Shift ? <Link state={location.state} className='text-blue-500 underline' to='/auth/signup-user'>Register</Link></p>
            </form>
        </div>
    );
};

export default Login;