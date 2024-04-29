import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./services.css";
import Card from '../BarberCard/Card';
import Service from '../service/Service';
import { nullify } from '../../toolkitRedux/sliceToolkit';
import Book from '../book/Book';

const Services = React.memo((props) => {
    const totalSumm = parseInt(useSelector((state) => state.toolkit.summ));
    const totalTime = parseInt(useSelector((state) => state.toolkit.time));
    // const totalServices = useSelector(state => state.toolkit.services);
    // console.log(totalServices);
    const [services, setServices] = useState([]);
    const dispatch = useDispatch()
    useEffect(() => {
        setServices(props.services);


        // console.log("I have worked");


        dispatch(nullify())
    }, [props.services]);
    useEffect(() => {
        dispatch(nullify())
    }, [services]);
    return (
        <div className='barber'>
            <div className='container'>
                <div className="barber__row">
                    <div className="barber__column">
                        <Card color="dark" barber={props.barber} />
                    </div>
                    <div className="barber__column">
                        <div className='barber__menu menu'>
                            <div className="menu__content">
                                {services && services.length > 0 ? (
                                    services.map((service) => (
                                        <Service
                                            key={service.id}
                                            // barber={props.barber}
                                            service={service}
                                        // onAddButtonClick={handleAddButtonClick}
                                        />
                                    ))
                                ) : (
                                    <p>No services available.</p>
                                )}
                            </div>
                            <div className="menu__footer">
                                <div className="menu__row">
                                    <div className="menu__column">
                                        <div className="menu__total">
                                            <h1>Total: {totalSumm}amd {totalTime}min</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <Book barber={props.barber} workingTimes={props.barber.from_to} />
            </div>
        </div>
    );
});

export default Services;