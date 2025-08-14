import { useParams } from "react-router-dom";
import Product from "./Product";
import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import { useSelector } from "react-redux";

function CategoryProductPage() {

    const siteData = useSelector(state => state.siteData);
    let { id } = useParams();

    const navdata = [{
        path: 'categories',
        displayText: 'CategoryList'
    }];
    console.log(navdata);

    return <>

        <div className="home-page-container">

            <Header />
            <Breadcrumb navData={navdata} />

            <h1> Category Products </h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {siteData.siteData.products.map((product, index) => (
                    product.categoryCode === parseInt(id) &&
                    <Product key={index} productProp={product} indexProp={index} />

                ))
                }
            </div>
        </div>

    </>
}
export default CategoryProductPage;