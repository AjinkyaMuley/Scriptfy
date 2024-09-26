import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useState } from 'react';


function ChangePassword(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const customer_id = localStorage.getItem('customer_id')
    const [passwordData, setPasswordData] = useState({
        'password' : '',
        'confirmPassword' : '',
    })

    const [confirmError, setConfirmError] = useState(false)
    
    const inputHandler = (event) => {
        setPasswordData({
            ...passwordData,
            [event.target.name]: event.target.value
        })
        console.log(passwordData)
    };

    const submitHandler = (event) => {
        
        if(passwordData.password === passwordData.confirmPassword)
        {
            setConfirmError(false)
        }
        else{
            setConfirmError(true)
        }

        const formData = new FormData();
        formData.append('password', passwordData.password);
        
        // // Submit Data
        axios.post(baseUrl + '/customer-change-password/' + customer_id + '/', formData)
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
        
        // const formUserData = new FormData();
        // formUserData.append('first_name', profileData.first_name);
        // formUserData.append('last_name', profileData.last_name);
        // formUserData.append('username', profileData.username);
        // formUserData.append('email', profileData.email);
        
        // axios.put(baseUrl + '/user/' + profileData.user_id + '/', formUserData)
        //     .then(function (response) {
        //         console.log(response)
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }


    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    {
                        confirmError && <p className='text-danger'>Password does not match</p>
                    }
                    <div className='card'>
                        <h4 className='card-header'>Update Profile</h4>
                        <div className='card-body'>
                                <div className="mb-3">
                                    <label for="pwd" className="form-label">New Password</label>
                                    <input type="password" name='password' value={passwordData.password}className="form-control" id='pwd' onChange={inputHandler} />
                                </div>
                                <div className="mb-3">
                                    <label for="cpwd" className="form-label">Confirm Password</label>
                                    <input type="password" name='confirmPassword' className="form-control" value={passwordData.confirmPassword} onChange={inputHandler} id='cpwd' />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword