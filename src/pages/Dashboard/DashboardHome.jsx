import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from '../ExtraPage/Loading';
import EmployeeDashboard from './employeeDashboard/EmployeeDashboard';


const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'employee') {
        return <EmployeeDashboard></EmployeeDashboard>
    }
    // if(role==='hr'){
    //     return <
    // }
};

export default DashboardHome;