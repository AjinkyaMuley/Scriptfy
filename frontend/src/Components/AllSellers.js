import { Link } from 'react-router-dom';
import SingleProduct from './SingleProduct';
import { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../Context';
import SingleSeller from './SingleSeller';


function AllSellers() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [sellerList, setSellerList] = useState([])
    const [totalResult, setTotalResult] = useState(0)
    const {currencyData} = useContext(CurrencyContext)

    useEffect(() => {
        fetchData(baseUrl + '/vendors/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setSellerList(data.results)
                setTotalResult(data.count)
            })
    }

    function changeUrl(baseUrl){
        fetchData(baseUrl)
    }

    var links = [];
    var limit = 10
    var totalLinks = totalResult / limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li class="page-item"><Link onClick={() => changeUrl(baseUrl + `/vendor/?page=${i}`)} to={`/vendors/?page=${i}`} class="page-link" href="#">{i}</Link></li>)
    }

    return (
        <section className='container mt-4'>
            {/* Latest Products */}
            <h3 className='mb-4'>All Sellers</h3>
            <div className='row mb-4'>
                {/* Product Box */}
                {
                    sellerList.map((seller) => <SingleSeller seller={seller} />)
                }
                {/* Product box end */}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {links}
                </ul>
            </nav>
            {/* End Latest Products */}
        </section>
    )
}

export default AllSellers