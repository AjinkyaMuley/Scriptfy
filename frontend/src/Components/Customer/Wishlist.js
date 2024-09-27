import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg'
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from '../../Context';
import axios from 'axios';

function Wishlist() {
    const { currencyData } = useContext(CurrencyContext)
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customerId = localStorage.getItem('customer_id');
    const baseUrlForImage = 'http://127.0.0.1:8000';
    const [wishItems, setWishItems] = useState([]);

    useEffect(() => {
        fetchData(baseUrl + '/customer/' + customerId + '/wishitems')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setWishItems(data.results)
            })
    }

    function removeFromWishList(wishlist_id) {

        const formData = new FormData();
        formData.append('wishlist_id', wishlist_id);

        // For debugging: Log formData entries
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        // Send the form data via POST
        axios.post(baseUrl + '/remove-from-wishlist/', formData)
            .then(function (response) {
                if(response.data.bool == true){
                    document.getElementById('row' + wishlist_id).remove()
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // wishItems.map((item) => console.log(item.product.image))

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
                                        <th>Action </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        wishItems.map((item, index) => {
                                            return (
                                                <tr id={`row${item.id}`}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={'/'}>
                                                            <img src={`${baseUrlForImage}${item.product.image}`} className="img-thumbnail" width={'80'} alt="..." /> {item.product.title}
                                                        </Link>
                                                    </td>
                                                    {
                                                        currencyData != 'usd' &&
                                                        <td>Rs. {item.product.price}</td>
                                                    }
                                                    {
                                                        currencyData == 'usd' &&
                                                        <td>$ {item.product.usd_price}</td>
                                                    }
                                                    <td><button className='btn btn-danger' onClick={() => removeFromWishList(item.id)}>Remove</button></td>
                                                </tr>
                                            )
                                        })
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

export default Wishlist