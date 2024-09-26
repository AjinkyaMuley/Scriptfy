import { Link, useParams } from 'react-router-dom';
import logo from '../../logo.svg';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState } from 'react';


function AddReview(props) {
    const {product_id} = useParams()
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customer_id = localStorage.getItem('customer_id')
    const [reviewFormData, setReviewFormData] = useState({
        'reviews' : '',
        'rating' : 1,
    })
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    
    const inputHandler = (event) => {
        setReviewFormData({
            ...reviewFormData,
            [event.target.name]: event.target.value
        })
     };

    const submitHandler = (event) => {
        const formData = new FormData();
        formData.append('reviews', reviewFormData.reviews);
        formData.append('rating', reviewFormData.rating);
        formData.append('customer', customer_id);
        formData.append('product', product_id);
        
        // // Submit Data
        axios.post(baseUrl + '/productrating/', formData)
        .then(function (response) {
            if(response.status != 201)
            {
                setErrorMsg('Data not saved')
                setSuccessMsg('')
            }
            else{
                setErrorMsg('')
                setSuccessMsg('Data Saved')
                setReviewFormData({
                    review_text : '',
                    rating : ''
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        })
        
    }

    const disabledBtn =  (reviewFormData.reviews === '') || (reviewFormData.rating === '')

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Add Review</h4>
                        <div className='card-body'>
                            {
                                errorMsg && <p className='alert alert-danger'>{errorMsg}</p>
                            }
                            {
                                successMsg && <p className='alert alert-success'>{successMsg}</p>
                            }
                                <div className="mb-3">
                                    <label for='address' className='form-label'>Review</label>
                                    <textarea className='form-control' name='reviews' onChange={inputHandler} value={reviewFormData.reviews}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label for="rating" className="form-label">Rating</label>
                                    <select className='form-control' name='rating' onChange={inputHandler}>
                                        <option value={'1'}>1</option>
                                        <option value={'2'}>2</option>
                                        <option value={'3'}>3</option>
                                        <option value={'4'}>4</option>
                                        <option value={'5'}>5</option>
                                    </select>
                                </div>
                                <button type="button" disabled={disabledBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddReview