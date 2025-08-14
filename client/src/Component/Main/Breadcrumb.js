import { Link } from "react-router-dom";

function Breadcrumb({ navData }) {

    return <>
    
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item active" aria-current="page">
                 <Link className="" to="/" >Home</Link>
            </li>
            {navData!==undefined && (
            <li  className="breadcrumb-item active" aria-current="page">
                 <Link className="" to={`/${navData[0].path}`} >{navData[0].displayText}</Link>
            </li>)
            }
        </ol>
    </nav >
    </>

        }
export default Breadcrumb;