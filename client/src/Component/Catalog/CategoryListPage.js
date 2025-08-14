import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import CategoryList from "./CategoryList";

function CategoryListPage() {


    return <>
        <div className="home-page-container">

            <Header  />
            <Breadcrumb />

            <CategoryList />

        </div>
    </>
}

export default CategoryListPage;