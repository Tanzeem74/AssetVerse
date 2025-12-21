import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../pages/ExtraPage/Loading';
import Forbidden from '../pages/ExtraPage/Forbidden';

const EmployeeRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'employee') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default EmployeeRoute;