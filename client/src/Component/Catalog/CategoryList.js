import Category from "./Category";
import { useSelector } from "react-redux";

function CategoryList() {
      const categories = useSelector(state => state.siteData.siteData.categories);


    return <>
        <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
            <div className="row mb-3 text-center">
                <div className="col-sm-12">
                    <h1 className="mb-5">Category Listing</h1>
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {categories.map((category, index) => (

                            <Category key={index} categoryProp={category} indexProp={index}  />
                        ))
                        }
                    </div>


                </div>
            </div>
        </div>
    </>
}

export default CategoryList;