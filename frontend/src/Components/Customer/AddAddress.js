import { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';

function AddAddress(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const [ErrorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('')
    var customer_id = localStorage.getItem('customer_id')
    const [addressFormData, setAddressFormData] = useState({
        'address': '',
        'customer': customer_id
    })

    const inputHandler = (event) => {
        setAddressFormData({
            ...addressFormData,
            [event.target.name]: event.target.value
        })
    };

    const submitHandler = () => {
        const formData = new FormData();
        formData.append('address', addressFormData.address);
        formData.append('customer', addressFormData.customer);

        // Submit Data
        axios.post(baseUrl + '/address/',formData)
            .then(function (response) {
                if(response.status != 201){
                    setErrorMsg('Data not saved');
                    setSuccessMsg('')
                }else{
                    setSuccessMsg('Data saved')
                    setErrorMsg('')
                    setAddressFormData({
                        address:''
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const disableBtn = (addressFormData.address=='')

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <div className='card'>
                        <h4 className='card-header'>Add Address</h4>
                        <div className='card-body'>
                            {ErrorMsg && <p className='alert alert-danger'>{ErrorMsg}</p>}
                            {successMsg && <p className='alert alert-success'>{successMsg}</p>}
                            <div className="mb-3">
                                <label for="address" className="form-label">Address</label>
                                <textarea className="form-control" onChange={inputHandler} name='address' value={addressFormData.address} id='address' ></textarea>
                            </div>
                            <button type="submit" disabled={disableBtn} onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddAddress