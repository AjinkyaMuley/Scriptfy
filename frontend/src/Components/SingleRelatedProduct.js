import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext, CartContext, UserContext } from '../Context';
import axios from 'axios';

function SingleRelatedProduct(props) {

    const product_id = props.product.id;
    const productData = props.product
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [productInWishlist, setProductInWishlist] = useState(false)
    const { cartData, setCartData } = useContext(CartContext);
    const [cartButtonClickedStatus, setCartButtonClickedStatus] = useState(false)
    const userContext = useContext(UserContext)

    const { currencyData } = useContext(CurrencyContext)

    useEffect(() => {
        checkProductInWishList(product_id)
    }, []);

    const cartAddButtonHandler = () => {
        let prevCart = localStorage.getItem('cartData');
        let cartJSON = prevCart ? JSON.parse(prevCart) : []; // Initialize an empty array if no cart exists

        const cartData = {
            'product': {
                'id': productData.id,
                'price': productData.price,
                'usd_price': productData.usd_price,
                'title': productData.title,
                'image': productData.image,
            },
            'user': {
                'id': 1
            },
            'total_amount': 10
        };

        // Add new cartData to the existing cart
        cartJSON.push(cartData);
        setCartData(cartJSON)

        // Convert the updated cart to a string and store it in localStorage
        let cartString = JSON.stringify(cartJSON);
        localStorage.setItem('cartData', cartString);

        // Update the button state
        setCartButtonClickedStatus(true);
    };

    const cartRemoveButtonHandler = () => {

        var prevCart = localStorage.getItem('cartData');
        var cartJSON = JSON.parse(prevCart);
        cartJSON.map((cart, index) => {
            if (cart != null && cart.product.id == productData.id) {
                cartJSON.splice(index, 1)
            }
        });

        var cartString = JSON.stringify(cartJSON);
        localStorage.setItem('cartData', cartString)
        setCartButtonClickedStatus(false)
        setCartData(cartJSON)
    }

    function checkProductInWishList(product_id) {
        const customerID = localStorage.getItem('customer_id');
        if (!customerID) {
            console.log('Customer ID is missing');
            return;  // Exit if no customer ID is found
        }

        const formData = new FormData();
        formData.append('customer', customerID);
        formData.append('product', product_id);

        // For debugging: Log formData entries
        // for (let pair of formData.entries()) {
        //     console.log(`${pair[0]}: ${pair[1]}`);
        // }

        // Send the form data via POST
        axios.post(baseUrl + '/check-in-wishlist/', formData)
            .then(function (response) {
                if (response.data.bool == true)
                    setProductInWishlist(true)
                else
                    setProductInWishlist(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function saveInWishList() {
        const customerID = localStorage.getItem('customer_id');
        if (!customerID) {
            console.log('Customer ID is missing');
            return;  // Exit if no customer ID is found
        }

        const formData = new FormData();
        formData.append('customer', customerID);
        formData.append('product', productData.id);

        // For debugging: Log formData entries
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // Send the form data via POST
        axios.post(baseUrl + '/wishlist/', formData)
            .then(function (response) {
                if (response.data.id) {
                    setProductInWishlist(true)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function isProductInCart(productId, cartData) {
        // Check if cartData exists and is an array
        if (!cartData || !Array.isArray(cartData)) {
            return false;
        }

        // Check if any item in the cart matches the given productId
        return cartData.some(cartItem => cartItem.product && cartItem.product.id === productId);
    }

    useEffect(() => {
        if (isProductInCart(productData.id, cartData)) {
            setCartButtonClickedStatus(true);
        } else {
            setCartButtonClickedStatus(false);
        }
    }, [productData.id, cartData]); // Dependency array

    const imgStyle = {
        width: '100%',
        height: '15vw',
        objectFit: 'contain'
    }

    return (
            <div className="card" >
                <Link to={`/product/${props.product.title}/${props.product.id}`}>
                    <img src={props.product.image} style={imgStyle} className="card-img-top" alt="..." />
                </Link>
                <hr />
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/${props.product.title}/${props.product.id}`}>{props.product.title}</Link></h5>
                    {
                        currencyData != 'usd' &&
                        <h5 className="card-title text-muted">Price: <span>Rs. {props.product.price}</span></h5>
                    }
                    {
                        currencyData == 'usd' &&
                        <h5 className="card-title text-muted">Price: <span>${props.product.usd_price}</span></h5>
                    }
                </div>
                <div className='card-footer'>
                    {!cartButtonClickedStatus &&
                        <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary btn-sm ms-1'>
                            <i className="fa-solid fa-cart-plus"></i>
                        </button>
                    }
                    {cartButtonClickedStatus &&
                        <button title='Delete from Cart' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning btn-sm ms-1'>
                            <i className="fa-solid fa-cart-plus"></i>
                        </button>
                    }
                    {
                        (userContext && !productInWishlist) &&
                        <button onClick={saveInWishList} title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    }
                    {
                        (userContext == null) &&
                        <button title='Add to WishList' className='btn btn-danger ms-1 btn-sm disabled'>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    }
                    {
                        (userContext && productInWishlist) &&
                        <button title='Add to WishList' className='btn btn-danger btn-sm ms-1 disabled'>
                            <i className="fa-solid fa-heart"></i>
                        </button>
                    }
                </div>
            </div>
    )
}

export default SingleRelatedProduct