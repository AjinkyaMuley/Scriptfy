import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Sidebar from './SellerSidebar';
import { useEffect, useState } from 'react';

function SellerDashboard(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [vendorData, setVendorData] = useState({
        'totalProducts' : 0,
        'totalOrders' : 0,
        'totalCustomers' : 0,
    });
    const vendor_id = localStorage.getItem('vendor_id')

    
    useEffect(() => {
        fetchData(baseUrl + '/vendor/' + vendor_id + '/dashboard/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setVendorData({
                    totalCustomers : data.totalCustomers,
                    totalOrders : data.totalOrders,
                    totalProducts : data.totalProducts,
                })
            })
    }

    console.log(vendorData)

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Products</h4>
                                    <h4><Link to={'/seller/products'}>{vendorData.totalProducts}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Orders</h4>
                                    <h4><Link to={'/seller/orders'}>{vendorData.totalOrders}</Link></h4>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4 mb-2'>
                            <div className='card'>
                                <div className='card-body text-center'>
                                    <h4>Total Customers</h4>
                                    <h4><Link to={'/seller/customers'}>{vendorData.totalCustomers}</Link></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboard