import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-4'>
            <h1 className='text-center text-9xl font-bold'><span>O</span>ops!</h1>
            <h3 className='text-center font-semibold text-red-500 text-3xl'>Something went wrong.</h3>
            <Link to={'/'} className='btn bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md'>Go to Home Page</Link>
        </div>
    );
};

export default ErrorPage;