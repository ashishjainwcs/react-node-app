
import Product from "../Catalog/Product";
import { useSelector } from "react-redux";


function RecommendedProducts() {

    const siteData = useSelector(state => state.siteData);

    console.log("userYype " + siteData.siteData.loggedInUserType);

    return <>

        <h1> Recommended Products </h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {siteData.siteData.products.map((product, index) => (
                index < 3 &&
                <Product key={index} productProp={product} indexProp={index}  />

            ))
            }
        </div>
    </>
}

export default RecommendedProducts;