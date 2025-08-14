import { useEffect } from "react";
import Product from "./Product";
import { useSelector } from "react-redux";
import { checkHttpStatus } from "../../constants/store.constants";
import { jsonApiHeader } from "../../constants/store.constants";


function ProductList() {

    const products = useSelector(state => state.siteData.siteData.products);

    useEffect(() => {


        fetch("/products", {
            method: 'GET',
            headers: jsonApiHeader(),
        })
        .then(checkHttpStatus)
        .then(function (response) {
            console.log("response :::"+response);
        })
        .catch(function (error) {
            console.log('error get_prouctList ..', error);
        });

    },[]);

    return <>
        <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-12">
                    <h1 className="mb-5">Product Listing</h1>
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {products.map((product, index) => (

                            <Product key={index} productProp={product} indexProp={index}  />
                        ))
                        }
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default ProductList;