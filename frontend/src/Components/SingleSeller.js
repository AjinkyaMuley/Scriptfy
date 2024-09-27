import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext } from 'react';
import { CurrencyContext } from '../Context';

function SingleSeller(props) {
    return (
        <div className='col-12 col-md-3 col-sm-4 mb-4'>
            <div className="card shadow" style={{ width: '18rem' }}>
                <Link to={`/seller/${props.seller.user.username}/${props.seller.id}`}>
                    <img src={props.seller.profile_img} className="card-img-top" alt={props.seller.user.username} />
                </Link>
                <hr />
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/seller/${props.seller.user.username}/${props.seller.id}`}>{props.seller.user.username}</Link></h5>
                </div>
                <div className='card-footer'>
                    {
                        props.seller.categories.map((item) => <Link to={`/category/${item.category__title}/${item.category__id}`} className='me-1'>{item.category__title}</Link>)
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleSeller