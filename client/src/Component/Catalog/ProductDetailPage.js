import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Breadcrumb from "../Main/Breadcrumb";
import ProductDetail from "../Catalog/ProductDetail";
import { useSelector } from "react-redux";

function ProductDetailPage() {

    const products = useSelector(state => state.siteData.siteData.products);

    let { id } = useParams();

    const navdata = [{
        path: 'shop',
        displayText: 'Shop'
    }];
    console.log(navdata);

    return <>

        <div className="home-page-container">

            <Header  />
            <Breadcrumb navData={navdata} />

            <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
                <div className="row mb-3 text-center">
                    <div className="">
                        <h1 className="mb-5">Product Details</h1>
                        <div className="">
                            {products.map((product, index) => (

                                product.productId === parseInt(id) &&

                                <ProductDetail key={index} productProp={product} indexProp={index} />
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default ProductDetailPage;