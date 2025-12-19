import React from 'react';
import useRole from '../../hooks/useRole';
import Loading from '../ExtraPage/Loading';
import EmployeeDashboard from './employeeDashboard/EmployeeDashboard';
import HRHome from './hrDashboard/HRHome';


const DashboardHome = () => {
    const { role, roleLoading } = useRole();
    if (roleLoading) {
        return <Loading></Loading>
    }
    if (role === 'employee') {
        return <EmployeeDashboard></EmployeeDashboard>
    }
    if(role==='hr'){
        return <HRHome></HRHome>
    }
};

export default DashboardHome;