import Header from "../../Header/Header";
import Breadcrumb from "../../Main/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
import { useSelector } from "react-redux";

function AdminProductListPage() {

    const loggedInUserType = useSelector(state => state.siteData.siteData.loggedInUserType);
    console.log("Admin Product List Page");
    const navigate = useNavigate();


    useEffect(() => {

        if (loggedInUserType !== "A") {
            navigate('/');
        }

    }, [])

    const navdata = [{
        path: 'admin-page',
        displayText: 'Manage Site'
    }];






    if (loggedInUserType !== "A") {
        return;
    } else {

        return <>
            <div className="home-page-container">

                <Header  />
                <Breadcrumb navData={navdata} />

                <AdminProductList />

            </div>
        </>
    }
}

export default AdminProductListPage;