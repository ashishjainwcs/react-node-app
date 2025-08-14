import logo from "./../../images/logo.svg";


import { Link } from "react-router-dom";
import { logoutSession } from "../Utility/SiteHelper";
import { useNavigate } from "react-router-dom";
import Autocomplete from "../Autosuggestion/Autocomplete";
import { useSelector, useDispatch } from "react-redux";

import MiniCart from "./MiniCart";
import { LOGOUT_USER } from "../../constants/store.constants";


function Header() {
    const siteData = useSelector(state => state.siteData);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    console.log("HEADER ::: SITEDATA :: STATE ::", siteData);
    const handleLogout = () => {
        logoutSession(siteData);

        /* updating state data with logged user */
        dispatch({
            type: LOGOUT_USER,
            payload: {
                data: {
                    loggedInUser: "",
                    loggedInUserId: "",
                    loggedInUserType: ""
                }
            }
        })

        navigate("/");

    }


    return (

        <>
            <div className="header">
                <table className="table">
                    <tbody>
                        <tr>
                            <td style={{ width: '10%' }}>
                                <div className="logo">
                                    <a href="/" title="Boots Logo">
                                        {" "}
                                        <img
                                            src={logo}
                                            border="0"
                                            alt="Site Logo"
                                            className="img-thumbnail"
                                        />{" "}
                                    </a>
                                </div>
                            </td>
                            <td style={{ width: '15%' }} className="text-start header-links-bottom">
                                <Link className="" to="/categories" >Categories</Link>
                                &nbsp;|&nbsp;
                                <Link className="" to="/shop" > Shop </Link>
                            </td>
                            <td style={{ width: '50%' }}>
                                <div className="headerSearchBox">
                                    <Autocomplete />
                                </div>
                            </td>
                            {siteData.siteData.loggedInUser !== "" ?
                                <td style={{ width: '25%' }} className="text-end header-links-bottom">

                                    <MiniCart />

                                    Welcome {siteData.siteData.loggedInUser}
                                    &nbsp;|&nbsp;
                                    <a href="/" onClick={handleLogout}>Logout</a>
                                    {siteData.siteData.loggedInUserType === "A" && <span>
                                        &nbsp;|&nbsp;
                                        <Link to="/admin-page">Manage Site</Link></span>}

                                </td>
                                :
                                <td style={{ width: '20%' }} className="text-end header-links-bottom">
                                    <Link className="" to="/login" >Login</Link> |
                                    <Link className="" to="/register" > Signup</Link>
                                </td>
                            }
                        </tr>
                    </tbody>
                </table>

            </div>




        </>
    );
}

export default Header;
