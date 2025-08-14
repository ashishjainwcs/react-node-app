import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getNextProductId, replaceProductsAndUpdateSiteData } from '../../Utility/SiteHelper';
import { ADD_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../../../constants/store.constants';


function AdminProductList() {

    const products = useSelector(state => state.siteData.siteData.products);
    const categories = useSelector(state => state.siteData.siteData.categories);
    const dispatch = useDispatch();


    const [show, setShow] = useState(false);
    const [prodData, setProdData] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const [showAdd, setShowAdd] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    /* update product Modal */
    const handleShow = (product) => {
        setErrorMessage("");
        setProdData(product);
        setShow(true);
    }

    const handleClose = () => {
        setProdData({});
        setShow(false);
    }

    const handleSubmit = (event) => {
        setShow(false);

        let productFound = products.filter((product) => product.productCode === prodData.productCode && product.productId !== prodData.productId);
        if (productFound !== null && productFound !== undefined && Object.keys(productFound).length > 0) {
            setErrorMessage("Product Code already exist !!!");
            /* setting modal display as true to display modal with error message */
            setShow(true);
        } else {

            /* creating new products list with updated product data */
            let updatedProducts = products.map((product, index) => {
                if (product.productId === prodData.productId) {
                    console.log("productPrice", prodData.productPrice);
                    prodData.productPrice = parseInt(prodData.productPrice);
                    prodData.categoryCode = parseInt(prodData.categoryCode);

                    return prodData;
                } else {
                    return product;
                }
            });

            /* updating local storage data with new categories object */
            replaceProductsAndUpdateSiteData(updatedProducts);

            /* updating updated categories in state */
            updateStateWithProducts(updatedProducts, UPDATE_PRODUCT);


        }
    }

    const updateStateWithProducts = (updatedProducts, action) => {

        dispatch({
            type: action,
            payload: {
                data: {
                    updatedProducts: updatedProducts
                }
            }
        })
    }


    /* Add product modal */
    const handleShowAdd = (product) => {
        setErrorMessage("");
        setProdData(product);
        setShowAdd(true);
    }

    const handleCloseAdd = () => {
        setProdData({});
        setShowAdd(false);
    }

    const handleSubmitAdd = (event) => {
        console.log(prodData);
        setShowAdd(false);
        prodData.imgSrc='https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg';
        let productFound = products.filter((product) => product.productCode === prodData.productCode);
        if (productFound !== null && productFound !== undefined && Object.keys(productFound).length > 0) {
            console.log("false received in component function update product");
            setErrorMessage("Product Code already exist !!!");
            /* setting modal display as true to display modal with error message */
            setShow(true);
        } else {

            /* creating new products list with added product data with next availabel product id*/

            const addProduct = {
                ...prodData,
                productId: getNextProductId(products),
            }

            let updatedProductsList = [...products, addProduct];


            /* updating local storage data with new products object */
            replaceProductsAndUpdateSiteData(updatedProductsList);

            /* updating updated products in state */
            updateStateWithProducts(updatedProductsList, ADD_PRODUCT);
        }
    }


    /* delete product modal */


    const handleShowDelete = (product) => {
        setProdData(product);
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    }


    const handleSubmitDelete = (event) => {
        setShowDelete(false);

        let updatedProductsList = products.filter((product) =>
            product.productId !== prodData.productId
        )
        /* updating local storage data with new products object */
        replaceProductsAndUpdateSiteData(updatedProductsList);

        /* updating updated products in state */
        updateStateWithProducts(updatedProductsList, DELETE_PRODUCT);

    }



    const handleChange = (event) => {
        console.log("typeing ..." + event.target.value);
        console.log(event.target.type);
        console.log(event.target.name);
        if (event.target.name === 'categoryCode') {
            setProdData({
                ...prodData,
                [event.target.name]: parseInt(event.target.value)
            });

        } else {
            setProdData({
                ...prodData,
                [event.target.name]: event.target.value
            });

        }

    };




return <>
        <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-9 admin-categories-list">
                    <h1 className="mb-5">Admin - Manage Products</h1>
                    <div className="row row-cols-1 row-cols-md-1 g-4">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col"> Code </th>
                                    <th scope="col">Prodcut Name </th>
                                    <th scope="col"> Price </th>
                                    <th scope="col"> Image Path </th>
                                    <th scope="col"> Category </th>
                                    <th scope="col"> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.productCode} </td>
                                        <td>{product.productName} </td>
                                        <td>{product.productPrice} </td>
                                        <td>{product.imgSrc} </td>
                                        <td>
                                            {categories.map((category) => (
                                                product.categoryCode === category.categoryId ?
                                                    (category.categoryName) : ""
                                            ))}
                                        </td>
                                        <td>
                                            <Button variant="link" onClick={() => handleShow(product)}>
                                                Edit
                                            </Button>
                                            |
                                            <Button variant="link" onClick={() => handleShowDelete(product)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>

                    </div>

                    <Button onClick={() => handleShowAdd({})}>
                        Add Product
                    </Button>

                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='col-xxl-10' onSubmit={handleSubmit}>

                    <input className='form-control' readOnly type='hidden' value={prodData.productId} name='productId' />
                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Code : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.productCode} name='productCode' onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Name : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.productName} name='productName' onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Price : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='number' value={prodData.productPrice} name='productPrice' onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Image : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.imgSrc} name='imgSrc'  onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Category Code : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='number' value={prodData.categoryCode} name='categoryCode' onChange={handleChange} />
                        </div>
                    </div>

                </form>


                {errorMessage !== "" &&
                    <div className="row mb-3 text-left">
                        <label className=" col-form-label error-text">{errorMessage} </label>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>




        <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='col-xxl-10' onSubmit={handleSubmitAdd}>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Code : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.productCode} name='productCode' onChange={handleChange} />
                        </div>
                    </div>
                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Name : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.productName} name='productName' onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Price : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='number' value={prodData.productPrice} name='productPrice' onChange={handleChange} />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Product Image : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={prodData.imgSrc} name='imgSrc'  onChange={handleChange} defaultValue='https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg' />
                        </div>
                    </div>

                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Category Code : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='number' value={prodData.categoryCode} name='categoryCode' onChange={handleChange} />
                        </div>
                    </div>

                </form>


                {errorMessage !== "" &&
                    <div className="row mb-3 text-left">
                        <label className=" col-form-label error-text">{errorMessage} </label>
                    </div>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmitAdd}>
                    Add
                </Button>
                <Button variant="secondary" onClick={handleCloseAdd}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>




        <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you Sure, you want to delete {prodData.productName} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmitDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>


    </>
}

export default AdminProductList;