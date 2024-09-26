import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext, CartContext, CurrencyContext } from '../../Context';
import axios from 'axios';
import SingleProduct from '../SingleProduct';

function SellerDetail() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [productList, setProductList] = useState([])
    const [vendorData, setVendorData] = useState({
        profile_img: '',
        user: {
            username: '',
        },
        total_products: {
            product_count: 0,
        }
    });

    const { seller_username, seller_id } = useParams();
    const { currencyData } = useContext(CurrencyContext);
    const userContext = useContext(UserContext);
    // const [currency, setCurrency] = useState('inr')

    // console.log(userContext)

    useEffect(() => {
        fetchProducts(baseUrl + '/vendor/' + seller_id + '/products/');
        fetchVendor(baseUrl + '/vendor/' + seller_id);
    }, []);

    function fetchProducts(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductList(data.results);
            })
    }

    function fetchVendor(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setVendorData(data);
            })
    }

    console.log(vendorData)

    return (
        <section className="container mt-4">
            <div className="row mb-5">
                <div className='col-3'>
                    <img src={vendorData.profile_img} className="card-img-top" alt={vendorData.user.username} />
                </div>
                <div className='col-9'>
                    {
                        vendorData.user.first_name && <h3>{vendorData.user.first_name} {vendorData.user.last_name}</h3>
                    }
                    {
                        !vendorData.user.first_name && <h3>{vendorData.user.username}</h3>
                    }
                    <p>Total Products : {vendorData.total_products.product_count}</p>
                </div>
            </div>
            <div className="row">
                {
                    productList.map((product, index) => {
                        return <SingleProduct product={product} />
                    })
                }
            </div>
        </section>
    )
}

export default SellerDetail