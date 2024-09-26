import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";


function OrderRow(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const index = props.index;
    const item = props.item;

    const [totalDownloads, setTotalDownloads] = useState(item.product_details.downloads)

    const countDownloads = (product_id) =>{
        const formData = new FormData();
        formData.append('product_id', product_id);

        axios.post(baseUrl + '/update_product_download_count/' + product_id)
            .then(function (response) {
                if(response.data.bool == true){
                    setTotalDownloads(++item.product_details.downloads);
                    window.open(
                        item.product_details.product_file,
                        '_blank'
                    )
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>
                <Link to={`/product/${item.product_details.slug}/${item.product_details.id}`}>
                    <img src={item.product_details.image} className="img-thumbnail" width={'80'} alt="..." /> {item.product_details.title}
                </Link>
            </td>
            <td>Rs. {item.product_details.price}</td>
            <td>
                <span>
                    {
                        item.order_details.order_status &&
                        <i className='fa fa-check-circle text-success'></i>
                    }
                    {
                        !item.order_details.order_status &&
                        <i className='fa fa-check-spinner text-dark'></i>
                    }
                </span></td>
            <td>
                {
                    item.order_details.order_status &&
                    <button onClick={() => countDownloads(item.product_details.id)} className='btn btn-primary btn-sm'>Download <span className='badge bg-white text-dark'>{totalDownloads}</span></button>
                }
                {
                    item.order_details.order_status &&
                    <Link to={`/customer/add-review/${item.product_details.id}`} className='btn btn-sm btn-success ms-2'>Add Review </Link>
                }
            </td>
        </tr>
    )
}

export default OrderRow