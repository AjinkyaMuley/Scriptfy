import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext } from 'react';
import { CurrencyContext } from '../Context';

function SingleSeller(props) {

    const {currencyData} = useContext(CurrencyContext)

    return (
        <div className='col-12 col-md-3 col-sm-4 mb-4'>
            <div className="card shadow" style={{ width: '18rem' }}>
                <Link to={`/seller/${props.seller.id}`}>
                    <img src={props.seller.profile_img} className="card-img-top" alt={props.seller.user.username} />
                </Link>
                <hr />
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/seller/${props.seller.id}`}>{props.seller.user.username}</Link></h5>
                </div>
            </div>
        </div>
    )
}

export default SingleSeller