import Sidebar from './SellerSidebar';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'
import { useEffect, useState } from 'react';

function SellerOrders() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [orderItems, setOrderItems] = useState([])
    const vendor_id = localStorage.getItem('vendor_id')

    useEffect(() => {
        fetchData(baseUrl + '/vendor/' + vendor_id + '/orderitems/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data.results)
            })
    }

    function changeOrderStatus(order_id, status) {
        fetch(baseUrl + '/order-modify/' + order_id + '/', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ order_status: status })
        })
            .then(function(response){
                if(response.status == 200)
                {
                    fetchData(baseUrl + '/vendor/' + vendor_id + '/orderitems/')
                }
            })
    }

    console.log(orderItems)

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='row'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orderItems.map((item, index) =>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <Link to={'/'}>
                                                        <img src={item.product_details.image} className="img-thumbnail" width={'80'} alt="..." />
                                                    </Link>
                                                    <p><Link to={'/'}>{item.product_details.title}</Link></p>
                                                </td>
                                                <td>Rs. {item.product_details.price}</td>
                                                <td>
                                                    {
                                                        item.order_details.order_status &&
                                                        <span className='text-success'><i className='fa fa-check-circle'></i> Completed</span>
                                                    }
                                                    {
                                                        !item.order_details.order_status &&
                                                        <span className='text-warning'><i className='fa fa-spinner'></i> Pending</span>
                                                    }
                                                </td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Change Status
                                                        </button>
                                                        <ul className="dropdown-menu">
                                                            <li>
                                                                {
                                                                    !item.order_details.order_status &&
                                                                    <a className="dropdown-item" onClick={() => changeOrderStatus(item.order_details.id, true)} >Complete</a>
                                                                }
                                                                {
                                                                    item.order_details.order_status &&
                                                                    <a className="dropdown-item" onClick={() => changeOrderStatus(item.order_details.id, false)} >Pending</a>
                                                                }
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </td>
                                            </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerOrders