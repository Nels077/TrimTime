import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../header/Header';
import Card from '../BarberCard/Card';
import Services from '../Services/Services';
import Book from '../book/Book';
import "./barbershop.css"
import { useDispatch } from 'react-redux';
import { chooseBarber } from '../../toolkitRedux/sliceToolkit';
import MapComponent from '../Map/Map';

const Barberhop = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [barberId, setBarberId] = useState(0);
    const [selectedBarbershop, setSelectedBarbershop] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const apiUrl = `http://127.0.0.1:8000/api/barbershop/${id}`;

        axios.get(apiUrl)
            .then(response => {
                setSelectedBarbershop((response.data));
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching barbershop data:", error);
                setError(error);
                setLoading(false);
            });
    }, [id]);


    if (loading) {
        return <p style={{ textAlign: "center", fontSize: "3rem" }}>Loading...</p>;
    }

    if (error || !selectedBarbershop || !selectedBarbershop.barbers) {
        navigate('/');
        return <p>Error loading barbershop data.</p>;
    }


    // console.log(selectedBarbershop.services)
    const selectedBarbersServices = selectedBarbershop.services.filter((e) => {
        return e.barber_id === parseInt(barberId)
    })


    return (
        <>
            <Header />
            <main className='main barbershop'>
                <div className="container">
                    <h1 className='barbershop__title'>{selectedBarbershop.barbershop.name}</h1>
                    <h4 className='text-xl text-center'>{selectedBarbershop.barbershop.location}</h4>
                    <h2 className='barbershop__subtitle'>Choose a barber</h2>
                    <div className="barbershop__barbers barbers">
                        <div className="barbers__row">
                            {selectedBarbershop.barbers.length > 0 ? (
                                selectedBarbershop.barbers.map((barber, idx) => (
                                    <Card key={barber.id} barber={barber} onClick={() => {
                                        if (barberId !== idx) {
                                            setBarberId(idx)
                                            dispatch(chooseBarber(barber.id))
                                            barber = (barber.id)
                                        }
                                    }} />
                                ))
                            ) : (
                                <p style={{ fontSize: "3rem" }}>No barbers available.</p>
                            )}
                        </div>
                    </div>
                    {selectedBarbershop !== null && selectedBarbershop.barbers.length > 0 ? (
                        <Services services={selectedBarbersServices}
                            barber={selectedBarbershop.barbers[barberId]} />) : null}
                </div>
            </main>
            <footer>
                <MapComponent address="1600 Amphitheatre Parkway, Mountain View, CA"/>
            </footer>
        </>
    );
};

export default Barberhop;