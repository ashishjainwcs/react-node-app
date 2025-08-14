import { Link } from "react-router-dom";


function AdminCatalogManagementPage() {


    return <>
        <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-6 manage-catalog-left20">
                    <h1 className="mb-5">Manage Catalog</h1>
                    <div className="row row-cols-1 row-cols-md-2 g-4">

                        <div className="col" >
                            <div  className="card h-100" >
                                <div className="card-body">
                                    <h5 className="card-title">Manage Category</h5>
                                    <p className="card-text">Click to Add/Update/Delete Categories </p>
                                </div>
                                <div className="card-footer text-center">
                                    <Link className="btn btn-primary" to={`/admin-category`} >Click to Add/Update/Delete Categories</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col" >
                            <div  className="card h-100" >
                                <div className="card-body">
                                    <h5 className="card-title">Manage Products</h5>
                                    <p className="card-text">Click to Add/Update/Delete Products </p>
                                </div>
                                <div className="card-footer text-center">
                                    <Link className="btn btn-primary" to={`/admin-product`} >Click to Add/Update/Delete Products</Link>
                                </div>
                            </div>
                        </div>



                    </div>


                </div>
            </div>
        </div>
    </>
}

export default AdminCatalogManagementPage;