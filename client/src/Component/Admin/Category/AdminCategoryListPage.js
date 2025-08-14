import Header from "../../Header/Header";
import Breadcrumb from "../../Main/Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AdminCategoryList from "./AdminCategoryList";
import { useSelector } from "react-redux";

function AdminCategoryListPage() {

    const categories = useSelector(state => state.siteData.siteData.categories);
    const loggedInUserType = useSelector(state => state.siteData.siteData.loggedInUserType);

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

                <AdminCategoryList categories={categories} />

            </div>
        </>
    }
}

export default AdminCategoryListPage;