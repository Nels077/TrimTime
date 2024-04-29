import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearServices } from '../../../toolkitRedux/sliceToolkit';
import './form.css';

const Form = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    // const selectedServices = useSelector((state) => state.toolkit.services);
    const start_date_time = useSelector((state) => state.toolkit.start_date_time);
    const end_date_time = useSelector((state) => state.toolkit.end_date_time);
    const barberId = parseInt(useSelector((state) => state.toolkit.barberId));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();

        if (!name || !email || !phone) {
            setMessage('Name, email, and phone are required.');
            return;
        }

        axios
            .post('http://127.0.0.1:8000/api/bookers', {
                booker_name: name,
                booker_email: email,
                booker_contact: phone,
            })
            .then((response) => {
                const bookerId = response.data.booker.id;
                setMessage('Booker added successfully!');
                createBookings(bookerId);
                setTimeout(()=>{
                    navigate("/")
                },1000)
            })
            .catch((error) => {
                setMessage('Error submitting data. Please try again.');
                console.error('Error submitting data:', error);
                setName('');
                setEmail('');
                setPhone('');
            });
    };

    const createBookings = (bookerId) => {
        // console.log('selectedServices');
        // console.log(selectedServices);

        // selectedServices.forEach((serviceId) => {
        const requestData = {
            // service_id: serviceId,
            booker_id: bookerId,
            barber_id: barberId,
            start_date_time: start_date_time,
            end_date_time: end_date_time,
            // status: 1,
        };

        console.log('Request Payload:', requestData);

        axios
            .post('http://127.0.0.1:8000/api/bookings', requestData)
            .then((response) => {
                console.log('Booking created successfully:', response.data);
                dispatch(clearServices());
            })
            .catch((error) => {
                console.error('Error creating booking:', error);
            });

        // });
    };

    return (
        <div>
            <form className="form" onSubmit={handleClick} action="">
                <h1 className="form__title">Fill the form</h1>
                {message && <p className="form__message">{message}</p>}
                <div className="form__fillName form__inp">
                    <input
                        className="form__inpName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full name"
                    />
                </div>
                <div className="form__fillEmail form__inp">
                    <input
                        className="form__inpEmail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email"
                    />
                </div>
                <div className="form__fillPhone form__inp">
                    <input
                        className="form__inpPhone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="phone"
                        placeholder="Phone number"
                    />
                </div>
                <button type="submit" className="form__button">
                    Book
                </button>
            </form>
        </div>
    );
};

export default Form;