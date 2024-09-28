import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import { useContext, useState } from 'react';
import { CartContext, CurrencyContext } from '../Context';

function Checkout(props) {
    const [productData, setProductData] = useState([]);
    const [cartButtonClickedStatus, setCartButtonClickedStatus] = useState(false)
    const { cartData, setCartData } = useContext(CartContext);

    const { currencyData } = useContext(CurrencyContext)


    let sum = 0;
    if (cartData && cartData.length > 0) {
        cartData.map((item, index) => {
            if (currencyData == 'inr' || currencyData == undefined) {
                sum += parseFloat(item.product.price)
            }
            else if (currencyData == 'usd') {
                sum += parseFloat(item.product.usd_price)
            }
        });
    }
    const cartRemoveButtonHandler = (product_id) => {

        var prevCart = localStorage.getItem('cartData');
        var cartJSON = JSON.parse(prevCart);
        cartJSON.map((cart, index) => {
            if (cart != null && cart.product.id == product_id) {
                cartJSON.splice(index, 1)
            }
        });

        var cartString = JSON.stringify(cartJSON);
        localStorage.setItem('cartData', cartString)
        setCartButtonClickedStatus(false)
        setCartData(cartJSON)
    }

    return (
        <div className='container mt-4'>
            <h3 className='mb-4'>Added Items ({cartData?.length || 0})</h3>
            {(cartData && cartData.length > 0) &&
                <div className='row'>
                    <div className='col-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartData.map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <Link to={`/product/${item.product.title}/${item.product.id}`}>
                                                            <img src={item.product.image} className="img-thumbnail" width={'80'} alt={item.product.title} /> {item.product.title}
                                                        </Link>
                                                    </td>
                                                    {
                                                        (currencyData === 'inr' || currencyData === undefined) &&
                                                        <td>Rs. {item.product.price}</td>
                                                    }
                                                    {
                                                        currencyData == 'usd' &&
                                                        <td>$ {item.product.usd_price}</td>
                                                    }
                                                    <td>
                                                        <button title='Delete from Cart' type='button' onClick={() => cartRemoveButtonHandler(item.product.id)} className='btn btn-warning ms-1'>
                                                            <i className="fa-solid fa-cart-plus"></i> Delete from Cart
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Total</th>
                                        {
                                            (currencyData === 'inr' || currencyData === undefined) &&
                                            <td>Rs. {sum}</td>
                                        }
                                        {
                                            currencyData == 'usd' &&
                                            <td>$ {sum}</td>
                                        }
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan={3} align='right'>
                                            <Link to={'/categories'} className='btn btn-secondary'>Continue Shopping</Link>
                                            <Link to={'/confirm-order'} className='btn btn-success ms-1'>Proceed</Link>
                                        </td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            }
            {
                (!cartData || cartData.length === 0) &&
                <>
                    <h4 className='text-success'>Cart is Empty!!!</h4>
                    <Link to={'/categories'} className='btn btn-success'>Home</Link>
                </>
            }
        </div>
    )
}

export default Checkout