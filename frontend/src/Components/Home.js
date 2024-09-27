import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';
import { useEffect, useState } from 'react';
import Testimonials from './Testimonials';
import SingleSeller from './SingleSeller';
function Home() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [Products, setProducts] = useState([])
    const [reviewList, setReviewList] = useState([])
    const [vendorList, setVendorList] = useState([])
    const [popularProducts, setPopularProducts] = useState([])
    const [popularCategoryList, setPopularCategoryList] = useState([])

    useEffect(() => {
        fetchData(baseUrl + '/products/?fetch_limit=4');
        fetchTestimonialsData(baseUrl + '/productrating/')
        fetchPopularVendors(baseUrl + '/vendors/?fetch_limit=4');
        fetchPopularProducts(baseUrl + '/products/?popular=4');
        fetchPopularCategories(baseUrl + '/categories/?popular=4');
    }, [])

    console.log(reviewList)

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.results)
            })
    }


    function fetchPopularVendors(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setVendorList(data.results)
            })
    }

    function fetchPopularProducts(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setPopularProducts(data.results)
            })
    }

    function fetchPopularCategories(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setPopularCategoryList(data.results)
            })
    }

    function fetchTestimonialsData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setReviewList(data.results)
            })
    }

    
    const imgStyle = {
        width : '100%',
        height : '15vw',
        objectFit : 'contain'
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
                    {
                        popularCategoryList.map((p) =>
                            <div className='col-12 col-md-3 mb-4'>
                                <div className="card shadow" style={{ width: '18rem' }}>
                                    <img src={logo} style={imgStyle} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h4 className="card-title"><Link to={`/category/${p.title}/${p.id}`}>{p.title}</Link></h4>
                                    </div>
                                    <div className='card-footer'>
                                        Product Downloads : {p.total_downloads}
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {/* Category box end */}
                </div>
                {/* End Popular Categories */}

                {/* Popular Products */}
                <h3 className='mb-4'>Popular Products <Link to='/products' className='float-end btn btn-dark'>View All Products <i class="fa-solid fa-arrow-right-long "></i></Link></h3>
                <div className='row mb-4'>
                    {
                        popularProducts.map((p) => <SingleProduct product={p} />)
                    }
                </div>
                {/* End Popular Products */}

                {/* Popular Sellers */}
                <h3 className='mb-4'>Popular Sellers <Link to='/sellers' className='float-end btn btn-dark'>View All Sellers <i class="fa-solid fa-arrow-right-long "></i></Link></h3>
                <div className='row mb-4'>
                    {
                        vendorList.map((vendor) => <SingleSeller seller={vendor} />)
                    }
                </div>
                {/* End Popular Sellers */}


                {/* Rating and Reviews */}
                <div id="carouselExampleIndicators" className="carousel slide my-4 border bg-dark text-white p-5" data-bs-ride="true" data-bs-wrap="true">
                    <div className="carousel-indicators">
                        {
                            reviewList.map((item, index) => { return <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${index}`} className="active" aria-current="true" aria-label={`Slide ${index + 1}`}></button> }
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