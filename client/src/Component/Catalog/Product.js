import { Link } from "react-router-dom";
import AddToCart from "../order/AddToCart";
import { useSelector } from "react-redux";
import BuyNow from "../order/BuyNow";

function Product({ productProp, indexProp }) {
    const loggedInUserType = useSelector(state => state.siteData.siteData.loggedInUserType);
    const product = productProp;
    const index = indexProp;

    return <>
        <div className="col" key={index}>

            <div key={index} className="card h-100" >
                <Link to={`/product-details/${product.productId}`} >
                    <img src={product.imgSrc} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">Price    : {product.productPrice}</p>
                        <p className="card-text">Category :{product.categoryCode}</p>
                    </div>
                </Link>
                <div className="card-footer text-center">
                    {loggedInUserType !== "" ? <span>
                        <BuyNow label={"Buy Now"} productId={product.productId} />

                        <AddToCart label={"Add to Cart"} productId={product.productId} />
                    </span> : <span>

                    </span>
                    }
                </div>
            </div>
        </div>

    </>
}
export default Product;