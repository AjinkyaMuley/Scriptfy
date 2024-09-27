import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useEffect, useState } from 'react';


function Categories() {

    const baseUrl = 'http://127.0.0.1:8000/api'
    const [categories, setCategories] = useState([])
    const [totalResult, setTotalResult] = useState(0)

    useEffect(() => {
        fetchData(baseUrl + '/categories/')
    }, [])

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setCategories(data.results)
                setTotalResult(data.count)
            })
    }

    function changeUrl(baseUrl) {
        fetchData(baseUrl)
    }

    
    var links = [];
    var limit = 1
    var totalLinks = totalResult / limit;
    for (let i = 1; i <= totalLinks; i++) {
        links.push(<li class="page-item"><Link onClick={() => changeUrl(baseUrl + `/categories/?page=${i}`)} to={`/categories/?page=${i}`} class="page-link" href="#">{i}</Link></li>)
    }

    const imgStyle = {
        width : '100%',
        height : '15vw',
        objectFit : 'contain',
        padding : '20px',
        background : '#f9f9f9'
    }


    return (
        <section className="container mt-4">
            {/* Categories */}
            <h3 className='mb-4'>All Categories</h3>
            <div className='row mb-2'>
                {
                    categories.map((category) =>
                        <div className='col-12 col-md-3 mb-4'>
                            <div className="card shadow" style={{ width: '18rem' }}>
                                <img style={imgStyle} src={category.cat_img} className="card-img-top" alt={category.title} />
                                <div className="card-body">
                                    <h4 className="card-title"><Link to={`/category/${category.title}/${category.id}`}>{category.title}</Link></h4>
                                </div>
                                <div className='card-footer'>
                                    Product Downloads : {category.total_downloads}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {/* End Categories */}

            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    {links}
                </ul>
            </nav>

        </section>
    )
}


export default Categories