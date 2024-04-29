    import React, { useEffect, useRef } from 'react';
    import { useDispatch } from 'react-redux';
    import { addService, removeService } from '../../toolkitRedux/sliceToolkit';
    import './service.css';
    import check from '../../assets/check.svg';

    const Service = (props) => {
        const dispatch = useDispatch();
        const knopka = useRef();

        // useEffect(() => {
        //     console.log('Selected Services:', props.selectedServices);
        // }, [props.selectedServices]);

        const handleAddButtonClick = () => {
            const { id,  barber_id, name, price, longevity } = props.service;

            knopka.current.classList.toggle('active');

            if (knopka.current.classList.contains('active')) {
                dispatch(addService({ id, barber_id, name, price, longevity }));
            } else {
                dispatch(removeService({ id, barber_id, name, price, longevity }));
            }
        };

        return (
            <div className="service">
                <div className="service__name">
                    <h2>{props.service.name}</h2>
                </div>
                <div className="service__info">
                    <span>
                        <h3>{props.service.price} դր.</h3>
                        <h3>{props.service.longevity} ր.</h3>
                    </span>
                    <button ref={knopka} onClick={handleAddButtonClick} className="button flex items-center justify-center">
                        <img src={check} alt="" />
                    </button>
                </div>
            </div>
        );
    };

    export default Service;