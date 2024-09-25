// import { UserContext, CartContext, CurrencyContext } from '../Context';
import axios from 'axios';
import Sidebar from './SellerSidebar';
import { useEffect, useState } from 'react';

function SellerProfile(props) {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id')
    const [profileData, setProfileData] = useState({
        user_id : '',
        'first_name' : '',
        'last_name' : '',
        'username' : '',
        'email' : '',
        'mobile' : '',
        'p_image' : '',
    });

    var customer_id = localStorage.getItem('customer_id')
    console.log(customer_id);

    useEffect(() => {
        fetchData(baseUrl + '/vendor/' + vendor_id);
    }, []);

    function fetchData(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                setProfileData({
                    'user_id' : data.user.id,
                    'first_name' : data.user.first_name,
                    'last_name' : data.user.last_name,
                    'username' : data.user.username,
                    'email' : data.user.email,
                    'mobile' : data.mobile,
                    'address' : data.address,
                    'p_image' : data.profile_img,
                });
            })
    }

    const inputHandler = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    };

    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name] : event.target.files[0]
        })
    };

    console.log(profileData)

    const submitHandler = (event) => {
        
        const formData = new FormData();
        formData.append('user', profileData.user_id);
        formData.append('mobile', profileData.mobile);
        formData.append('address', profileData.address);
        formData.append('profile_img', profileData.p_image);
        
        
        // Submit Data
        axios.put(baseUrl + '/vendor/' + vendor_id + '/', formData,{
            headers: {
                'content-type' : 'multipart/form-data'
            }
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
        
        const formUserData = new FormData();
        formUserData.append('first_name', profileData.first_name);
        formUserData.append('last_name', profileData.last_name);
        formUserData.append('username', profileData.username);
        formUserData.append('email', profileData.email);
        
        axios.put(baseUrl + '/user/' + profileData.user_id + '/', formUserData)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <h3 className='mb-3'>Welcome <span className='text-primary'>{profileData.username}</span></h3>
                    <div className='card'>
                        <h4 className='card-header'>Update Profile</h4>
                        <div className='card-body'>
                            <form>
                                <div className="mb-3">
                                    <label for="firstName" className="form-label">First Name</label>
                                    <input type="text" name='first_name' onChange={inputHandler} value={profileData.first_name} className="form-control" id='firstName' />
                                </div>
                                <div className="mb-3">
                                    <label for="lastName" className="form-label">Last Name</label>
                                    <input type="text" name='last_name' onChange={inputHandler} value={profileData.last_name} className="form-control" id='lastName' />
                                </div>
                                <div className="mb-3">
                                    <label for="username" className="form-label">Username</label>
                                    <input type="text" name='username' onChange={inputHandler} value={profileData.username} className="form-control" id='username' />
                                </div>
                                <div className="mb-3">
                                    <label for="email" className="form-label">Email</label>
                                    <input type="email" name='email' onChange={inputHandler} value={profileData.email} className="form-control" id='email' />
                                </div>
                                <div className="mb-3">
                                    <label for="mobile" className="form-label">Mobile</label>
                                    <input type="mobile" name='mobile' onChange={inputHandler} value={profileData.mobile} className="form-control" id='mobile' />
                                </div>
                                <div className="mb-3">
                                    <label for="address" className="form-label">Address</label>
                                    <textarea type="text" name='address' onChange={inputHandler} value={profileData.address} className="form-control" id='address'></textarea>
                                </div>
                                <div className="mb-3">
                                    <p>
                                        <img src={profileData.p_image} width={100} className='mt-2 rounded'/>
                                    </p>
                                    <label for="profileImg" className="form-label">Profile Image</label>
                                    <input type="file" name='p_image' onChange={handleFileChange} className="form-control" id='profileImg' />
                                </div>
                                <button type="button" onClick={submitHandler} className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerProfile