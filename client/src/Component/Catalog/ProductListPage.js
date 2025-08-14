import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import ProductList from "./ProductList";

function ProductListPage() {

    return <>
        <div className="home-page-container">

            <Header  />
            <Breadcrumb />

            <ProductList />

        </div>
    </>
}

export default ProductListPage;