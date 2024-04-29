import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./favorites.css";

const Favorites = () => {
    const [barbershops, setBarbershops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/barbershops")
            .then(response => {
                setBarbershops(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setError(error);
                setLoading(false);
            });
    }, []);


    return (
        <section className="favs">
            <div className="container">
                <h1 className="favs__title">Top Barbershops</h1>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {Array.isArray(barbershops) && barbershops.length > 0 && !loading ? (
                    <div className="favs__row">
                        {barbershops.map((e) => (
                            <Link to={`/barbershop/${e.id}`} key={e.id}>
                                <div className="favs__card card">
                                    <div className="card__content">
                                        <h2>{e.name}</h2>
                                        <img src={e.logo} alt="Logo"/>
                                        <span>{e.from_to}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    !loading && (
                        <div style={{textAlign: "center", fontSize: "2.5rem"}} className="emptyFavs">
                            <h1>You haven't chosen yet</h1>
                        </div>
                    )
                )}
            </div>
        </section>
    );
};

export default Favorites;