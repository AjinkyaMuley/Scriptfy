import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import SingleRelatedProduct from './SingleRelatedProduct';
import { UserContext, CartContext, CurrencyContext } from '../Context';
import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


function ProductDetail() {
    const baseUrl = 'http://127.0.0.1:8000/api'
    const [productData, setProductData] = useState([]);
    const [productImgs, setProductImgs] = useState([]);
    const [productTags, setProductTags] = useState('');
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cartButtonClickedStatus, setCartButtonClickedStatus] = useState(false)
    const { product_slug, product_id } = useParams();
    const { cartData, setCartData } = useContext(CartContext);
    const [productInWishlist, setProductInWishlist] = useState(false)
    const { currencyData } = useContext(CurrencyContext);
    const userContext = useContext(UserContext);
    // const [currency, setCurrency] = useState('inr')

    // console.log(userContext)

    useEffect(() => {
        fetchData(baseUrl + '/product/' + product_id);
        fetchRelatedData(baseUrl + '/related-products/' + product_id);
        checkProductInWishList(product_id)
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProductData(data);
                setProductImgs(data.product_imgs)
                setProductTags(data.tags)
            })
    }

    console.log(productData)
    function fetchRelatedData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setRelatedProducts(data.results)
            })
    }
    const splitTags = productTags.split(',')
    const tagsLinks = []
    for (let i = 0; i < splitTags.length; i++) {
        let tag = splitTags[i].trim();
        tagsLinks.push(<Link className='badge bg-secondary text-white me-1' to={`/products/${tag}`}>{tag}</Link>)
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

    return (
        <section className="container mt-4">
            <div className="row">
                <div className="col-4">
                    <div id="productThumbnailSlider" className="carousel carousel-dark slide carousel-fade mt-4" data-bs-ride="true">
                        <div className="carousel-indicators">
                            {
                                productImgs.map((image, index) => {

                                    if (index === 0) {
                                        return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} className='active' aria-current='true' aria-label="Slide 1"></button>
                                    }
                                    else {
                                        return <button type="button" data-bs-target="#productThumbnailSlider" data-bs-slide-to={index} aria-current='true' aria-label="Slide 1"></button>
                                    }
                                })
                            }
                        </div>
                        <div className="carousel-inner">
                            {
                                productImgs.map((img, index) => {

                                    if (index === 0) {
                                        return <div className='carousel-item active'>
                                            <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                        </div>
                                    }
                                    else {
                                        return <div className='carousel-item'>
                                            <img src={img.image} className="img-thumbnail mb-5" alt={index} />
                                        </div>
                                    }
                                })
                            }
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#productThumbnailSlider" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-8">
                    <h3>{productData.title}</h3>
                    <p>{productData.detail}</p>
                    {
                        currencyData != 'usd' && <h5 className='card-title'>Price: Rs. {productData.price}</h5>
                    }
                    {
                        currencyData == 'usd' && <h5 className='card-title'>Price: ${productData.usd_price}</h5>
                    }
                    {
                        productData.vendor && <p>Developed By : <Link to={`/seller/${productData.vendor.user.username}/${productData.vendor.id}`}>{productData.vendor.user.first_name} {productData.vendor.user.last_name}</Link></p>
                    }
                    

                    <p className='mt-3'>
                        <Link title='Demo' to={`${productData.demo_url}`} target='_blank' className='btn btn-dark'>
                            <i className="fa-solid fa-cart-plus"></i> Demo
                        </Link>
                        {!cartButtonClickedStatus &&
                            <button title='Add to Cart' type='button' onClick={cartAddButtonHandler} className='btn btn-primary ms-1'>
                                <i className="fa-solid fa-cart-plus"></i> Add to Cart
                            </button>
                        }
                        {cartButtonClickedStatus &&
                            <button title='Delete from Cart' type='button' onClick={cartRemoveButtonHandler} className='btn btn-warning ms-1'>
                                <i className="fa-solid fa-cart-plus"></i> Delete from Cart
                            </button>
                        }
                        <button title='Buy Now' className='btn btn-success ms-1'>
                            <i className="fa-solid fa-bag-shopping"></i> Buy Now
                        </button>
                        {
                            (userContext && !productInWishlist) &&
                            <button onClick={saveInWishList} title='Add to WishList' className='btn btn-danger ms-1'>
                                <i className="fa-solid fa-heart"></i> Wishlist
                            </button>
                        }
                        {
                            (userContext == null) &&
                            <button title='Add to WishList' className='btn btn-danger ms-1 disabled'>
                                <i className="fa-solid fa-heart"></i> Wishlist
                            </button>
                        }
                        {
                            (userContext && productInWishlist) &&
                            <button title='Add to WishList' className='btn btn-danger ms-1 disabled'>
                                <i className="fa-solid fa-heart"></i> Wishlist
                            </button>
                        }
                    </p>
                    <div className='producttags mt-4'>
                        <h5>Tags</h5>
                        <p>
                            {tagsLinks}
                        </p>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 ? (
                <>
                <h4 className='text-center mb-4 m-4'>Related Products</h4>
                    <OwlCarousel className='owl-theme' loop margin={10} nav dots items={5}>
                        {relatedProducts.map((product, index) => (
                            <div className='item' key={index}>
                                <SingleRelatedProduct product={product} />
                            </div>
                        ))}
                    </OwlCarousel>
                </>
            ) : (
                <p>Loading products...</p>
            )
            }



            {/* End Related Products */}
        </section>
    )
}

export default ProductDetail