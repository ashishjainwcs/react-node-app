import { Link } from "react-router-dom";


function Category({categoryProp, indexProp}) {
    const category = categoryProp;
    const index = indexProp;

    
    return <>
        <div className="col" key={index}>
            <div key={index} className="card h-100" >
                <div className="card-body">
                    <h5 className="card-title">{category.categoryName}</h5>
                    <p className="card-text">{category.categoryName}</p>
                </div>
                <div className="card-footer text-center">
                        <Link className="btn btn-primary" to={`/categories/${category.categoryId}`} >Explore Products of this Category</Link>
                </div>
            </div>
        </div>

    </>
}

export default Category;