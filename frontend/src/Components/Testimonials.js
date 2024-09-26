import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";


function Testimonials(props) {
    const { index, item } = props;

    // Assign 'active' class only to the first item
    const _class = index === 0 ? 'active' : '';

    var _stars = []

    for(let i=0;i<item.rating;i++)
    {
        _stars.push(i);
    }

    return (
        <div className={`carousel-item ${_class}`}>
            <figure className="text-center">
                <blockquote className="blockquote">
                    <p>{item.reviews}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                    {
                        _stars.map((item,index) => <i className="fa fa-star text-warning"></i>)
                    }
                    <cite title="Source Title"> {`${item.customer.user.first_name} ${item.customer.user.last_name}`}</cite>
                </figcaption>
            </figure>
        </div>
    )
}


export default Testimonials