import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useEffect, useState } from 'react';
import Testimonials from './Testimonials';
function Home() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [Products, setProducts] = useState([])
    const [reviewList, setReviewList] = useState([])

    useEffect(() => {
        fetchData(baseUrl + '/products/?fetch_limit=4');
        fetchTestimonialsData(baseUrl + '/productrating/')
    }, [])

    console.log(reviewList)

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results)
            })
    }


    function fetchTestimonialsData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setReviewList(data.results)
            })
    }


    return (

        <main className='mt-4'>
            <div className='container'>
                {/* Latest Products */}
                <h3 className='mb-4'>Latest Products <Link to='/products' className='float-end btn btn-dark'>View All Products <i class="fa-solid fa-arrow-right-long "></i></Link></h3>
                <div className='row mb-4'>
                    {
                        Products.map((p) => <SingleProduct product={p} />)
                    }
                </div>
                {/* End Latest Products */}

                {/* Popular Categories */}
                <h3 className='mb-4'>Popular Categories <Link to={'/categories'} className='float-end btn btn-dark'>View All Categories <i class="fa-solid fa-arrow-right-long "></i></Link></h3>
                <div className='row mb-4'>
                    {/* Category Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Category title</h4>
                            </div>
                            <div className='card-footer'>
                                Product Downloads : 2356
                            </div>
                        </div>
                    </div>
                    {/* Category box end */}
                    {/* Category Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Category title</h4>
                            </div>
                            <div className='card-footer'>
                                Product Downloads : 2356
                            </div>
                        </div>
                    </div>
                    {/* Category box end */}
                    {/* Category Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Category title</h4>
                            </div>
                            <div className='card-footer'>
                                Product Downloads : 2356
                            </div>
                        </div>
                    </div>
                    {/* Category box end */}
                    {/* Category Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Category title</h4>
                            </div>
                            <div className='card-footer'>
                                Product Downloads : 2356
                            </div>
                        </div>
                    </div>
                    {/* Category box end */}
                </div>
                {/* End Popular Categories */}

                {/* Popular Products */}
                <h3 className='mb-4'>Popular Products <a href='#' className='float-end btn btn-dark'>View All Products <i class="fa-solid fa-arrow-right-long "></i></a></h3>
                <div className='row mb-4'>
                    {/* Product Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <hr />
                            <div className="card-body">
                                <h4 className="card-title">Product title</h4>
                                <h5 className="card-title text-muted">Price: <span>Rs. 500</span></h5>
                            </div>
                            <div className='card-footer'>
                                <button title='Add to Cart' className='btn btn-success btn-sm'>
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                                <button title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Product box end */}
                    {/* Product Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <hr />
                            <div className="card-body">
                                <h4 className="card-title">Product title</h4>
                                <h5 className="card-title text-muted">Price: <span>Rs. 500</span></h5>
                            </div>
                            <div className='card-footer'>
                                <button title='Add to Cart' className='btn btn-success btn-sm'>
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                                <button title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Product box end */}
                    {/* Product Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <hr />
                            <div className="card-body">
                                <h4 className="card-title">Product title</h4>
                                <h5 className="card-title text-muted">Price: <span>Rs. 500</span></h5>
                            </div>
                            <div className='card-footer'>
                                <button title='Add to Cart' className='btn btn-success btn-sm'>
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                                <button title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Product box end */}
                    {/* Product Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <hr />
                            <div className="card-body">
                                <h4 className="card-title">Product title</h4>
                                <h5 className="card-title text-muted">Price: <span>Rs. 500</span></h5>
                            </div>
                            <div className='card-footer'>
                                <button title='Add to Cart' className='btn btn-success btn-sm'>
                                    <i class="fa-solid fa-cart-plus"></i>
                                </button>
                                <button title='Add to WishList' className='btn btn-danger btn-sm ms-1'>
                                    <i class="fa-solid fa-heart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Product box end */}
                </div>
                {/* End Popular Products */}

                {/* Popular Sellers */}
                <h3 className='mb-4'>Popular Sellers <a href='#' className='float-end btn btn-dark'>View All Sellers <i class="fa-solid fa-arrow-right-long "></i></a></h3>
                <div className='row mb-4'>
                    {/* Sellers Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Seller Names</h4>
                            </div>
                            <div className='card-footer'>
                                Categories : <a href='#'>Python</a>,<a href='#'>Php</a>
                            </div>
                        </div>
                    </div>
                    {/* Sellers box end */}
                    {/* Sellers Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Seller Names</h4>
                            </div>
                            <div className='card-footer'>
                                Categories : <a href='#'>JavaScript</a>,<a href='#'>VueJS</a>
                            </div>
                        </div>
                    </div>
                    {/* Sellers box end */}
                    {/* Sellers Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Seller Names</h4>
                            </div>
                            <div className='card-footer'>
                                Categories : <a href='#'>ReactJS</a>,<a href='#'>AngularJS</a>
                            </div>
                        </div>
                    </div>
                    {/* Sellers box end */}
                    {/* Sellers Box */}
                    <div className='col-12 col-md-3 mb-4'>
                        <div className="card shadow" style={{ width: '18rem' }}>
                            <img src={logo} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Seller Names</h4>
                            </div>
                            <div className='card-footer'>
                                Categories : <a href='#'>WordPress</a>,<a href='#'>Shopify</a>
                            </div>
                        </div>
                    </div>
                    {/* Sellers box end */}
                </div>
                {/* End Popular Sellers */}


                {/* Rating and Reviews */}
                <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true" data-bs-wrap="true">
                    <div className="carousel-indicators">
                        {
                            reviewList.map((item, index) => { return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${index}`} className="active" aria-current="true" aria-label={`Slide ${index+1}`}></button> }
                            )
                        }
                    </div>
                    <div className="carousel-inner">
                        {
                            reviewList.map((item, index) => { return <Testimonials item={item} index={index} /> }
                            )
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>


                {/* End */}
            </div>
        </main>

    )
}


export default Home