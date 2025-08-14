import { useEffect } from "react";
import Header from "../../Header/Header";
import Breadcrumb from "../../Main/Breadcrumb";
import { useNavigate } from "react-router-dom";
import AdminCatalogManagementPage from "./AdminCatalogManagementPage";
import { useSelector } from "react-redux";

function HomePage() {

    const loggedInUserType = useSelector(state => state.siteData.siteData.loggedInUserType);

    const navigate = useNavigate();

    useEffect(() => {

        if (loggedInUserType !== "A") {
            navigate('/');
        }

    }, [])


    if (loggedInUserType !== "A") {
        return;
    } else {

        return <>

            <div className="home-page-container">
                <Header />
                <Breadcrumb />
                <AdminCatalogManagementPage />
            </div>
        </>;
    }
}

export default HomePage;