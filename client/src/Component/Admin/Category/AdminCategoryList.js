import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { replaceCategoryAndUpdateSiteData, getNextCategoryId } from "../../Utility/SiteHelper";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY } from "../../../constants/store.constants";

function AdminCategoryList({ onDeleteCategory, errorCategory }) {

    const categories = useSelector(state => state.siteData.siteData.categories);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [catData, setCatData] = useState({});



    const handleShow = (category) => {
        setErrorMessage("");
        setCatData(category);
        setShow(true);
    }

    const handleClose = () => {
        setCatData({});
        setShow(false);
    }

    /* updating..... category */
    const handleSubmit = (event) => {
        setShow(false);

        let categoryFound = categories.filter((category) => category.categoryName === catData.categoryName && category.categoryId !== catData.categoryId);
        if (categoryFound !== null && categoryFound !== undefined && Object.keys(categoryFound).length > 0) {
            setErrorMessage("Category name already exist !!!");
            /* setting modal display as true to display modal with error message */
            setShow(true);
        } else {

            /* creating new categories list with updated category data */
            let updatedCategories = categories.map((category, index) => {

                if (category.categoryId === catData.categoryId) {
                    return catData;
                } else {
                    return category;
                }
            });

            /* updating local storage data with new categories object */
            replaceCategoryAndUpdateSiteData(updatedCategories);

            /* updating updated categories in state */
            updateStateWithCategories(updatedCategories, UPDATE_CATEGORY);

        }
    }

    const updateStateWithCategories = (updatedCategories, action) => {
        dispatch({
            type: action,
            payload: {
                data: {
                    updatedCategories: updatedCategories
                }
            }
        })
    }


    const handleShowAdd = (category) => {
        setErrorMessage("");
        errorCategory = "";
        setCatData(category);
        setShowAdd(true);
    }

    const handleCloseAdd = () => {
        console.log("handle close");
        setCatData({});
        setShowAdd(false);
    }


    const handleSubmitAdd = (event) => {
        setShowAdd(false);

        let categoryFound = categories.filter((category) => category.categoryName === catData.categoryName);
        if (categoryFound !== null && categoryFound !== undefined && Object.keys(categoryFound).length > 0) {
            console.log("false received in component add function ");
            setErrorMessage("Category name already exist !!!");
            /* setting modal display as true to display modal with error message */
            setShowAdd(true);
        } else {
            /* This is Add category process so creating category object with next available category Id */
            const addCategory = {
                ...catData,
                categoryId: getNextCategoryId(categories),
            }

            let updatedCategoriesList = [...categories, addCategory];

            /* updating local storage data with new categories object */
            replaceCategoryAndUpdateSiteData(updatedCategoriesList);

            /* updating updated categories in state */
            updateStateWithCategories(updatedCategoriesList, ADD_CATEGORY);


        }
    }


    const handleShowDelete = (category) => {
        setCatData(category);
        setShowDelete(true);
    }

    const handleCloseDelete = () => {
        setShowDelete(false);
    }

    const handleSubmitDelete = (event) => {
        setShowDelete(false);

        let updatedCategoriesList = categories.filter((category) =>
            category.categoryId !== catData.categoryId
        )
        /* updating local storage data with new categories object */
        replaceCategoryAndUpdateSiteData(updatedCategoriesList);

        /* updating updated categories in state */
        updateStateWithCategories(updatedCategoriesList, DELETE_CATEGORY);

    }

    const handleChange = (event) => {
        setCatData({
            ...catData,
            categoryName: event.target.value,
        });

    };

    return <>
        <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-9 admin-categories-list">
                    <h1 className="mb-5">Admin - Manage Categories</h1>
                    <div className="row row-cols-1 row-cols-md-1 g-4">
                        <table className="table table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col"> Code </th>
                                    <th scope="col">Category Name </th>
                                    <th scope="col"> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, index) => (
                                    <tr>
                                        <td>{category.categoryId} </td>
                                        <td>{category.categoryName} </td>
                                        <td>
                                            <Button variant="link" onClick={() => handleShow(category)}>
                                                Edit
                                            </Button>
                                            |
                                            <Button variant="link" onClick={() => handleShowDelete(category)}>
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
                        Add Category
                    </Button>



                </div>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='col-xxl-10' onSubmit={handleSubmit}>
                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Category Name : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={catData.categoryName} name='categoryName' onChange={handleChange} />
                        </div>



                    </div></form>
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

        <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you Sure, you want to delete {catData.categoryName} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmitDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={handleCloseDelete}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>




        <Modal show={showAdd} onHide={handleCloseAdd}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='col-xxl-10' onSubmit={handleSubmitAdd}>
                    <div className="row mb-3 text-center">
                        <label className="col-sm-4 col-form-label">Category Name : </label>
                        <div className="col-sm-8">

                            <input className='form-control' type='text' value={catData.categoryName} name='categoryName' onChange={handleChange} />
                        </div></div></form>
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

    </>
}

export default AdminCategoryList;