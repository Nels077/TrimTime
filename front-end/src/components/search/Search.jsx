import "./search.css"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Search = (props) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/search?search=${props.searchValue}`)
            .then(response => {
                setSearchResults(response.data.barbershops);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
    }, [props.searchValue]);

    const inpClear = () => {
        props.setSearchValue("");
    };

    return (
        <div className={props.searchValue.length > 0 && searchResults.length > 0 ? "searchResult active" : "searchResult"}>
            <ul className="searchList">
                {searchResults.map((el) => (
                    <Link onClick={inpClear} to={`/barbershop/${el.id}`} key={el.id} className="searchList__link">
                        <li className="searchItem">
                            <img src={el.logo} alt="" />
                            <h2>{el.name}</h2>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default Search;
