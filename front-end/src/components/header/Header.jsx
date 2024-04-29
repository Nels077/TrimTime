import { Link, Navigate } from "react-router-dom"
import logo from "../../assets/logoImg.svg"
import "./header.css"
import { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Search from "../search/Search";

const Header = () => {
    const [search, setSearch] = useState("")
    const [isAuth, setIsAuth] = useState(true)

    useEffect(() => {
        const storedAuthStatus = localStorage.getItem('isAuth');
        if (storedAuthStatus === 'true') {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [])

    return (
        <header className="header">
            <div className="container">
                <div className="header__row">
                    <Link className="header__logo" to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                    <Navbar />
                    <div className="header__buttons">
                        <div className="header__search">
                            <input
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        {!isAuth
                            ? <div className="header__button">
                                <Link to={"/login"}>Login</Link>
                                {/* <UserLogin/> */}
                            </div>

                            : <div className="header__user">
                                <div className="user__logo">
                                    <img src="" alt="" />
                                </div>
                                <h2>User name</h2>
                            </div>
                        }

                        <Search searchValue={search} setSearchValue={setSearch} />

                    </div>

                </div>

            </div>
        </header>
    );
};

export default Header;