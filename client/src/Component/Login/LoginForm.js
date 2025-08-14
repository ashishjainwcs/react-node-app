import { validateFields } from "../Utility/FormValidation";
import { useNavigate } from "react-router-dom";
import { userNameValid, validatePassword, initiateUserLogin } from "../Utility/SiteHelper";
import { useDispatch } from "react-redux";
import { LOGIN_USER } from "../../constants/store.constants";
import { useSelector } from "react-redux";

function LoginForm() {

    const siteData = useSelector(state => state.siteData);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (event) => {

        event.preventDefault(); // stop page refresh

        const userName = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        let errorFound = 'false';
        if (!validateFields(userName)) {
            alert("Please fill in username");
            errorFound = 'true';
        }
        if (!validateFields(password)) {
            alert("Please fill in password");
            errorFound = 'true';
        }
        if (errorFound === 'true') {
            errorFound = 'false';
            return;
        }


        let userId = userNameValid(siteData, userName);
        if (userId === "") {
            alert("Invalid Username / Email");
            return;
        }

        if (!validatePassword(siteData, userName, password)) {
            alert("Incorrect password, please retry...");
            return;
        }

        /* updating local storage with logged in user details */
        initiateUserLogin(siteData, userId);

        /* updating state with logged in user Details */
        updateStateLoginUserData(siteData, userId);

        navigate("/");

    }

    const updateStateLoginUserData = (siteData, userId) => {

        siteData.siteData.users.map((user) => {
            if (user.userId === userId) {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        data: {
                            loggedInUser: user.firstName,
                            loggedInUserId: user.userId,
                            loggedInUserType: user.userType
                        }
                    }
                })
            }



        })
    }



    return <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
        <div className="row mb-3 text-center">
            <div className="col-sm-6">
                <h1 className="mb-5">Login</h1>
            </div></div>
        <form className='col-xxl-6' onSubmit={handleSubmit}>
            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">UserName/Email</label>
                <div className="col-sm-8">
                    <input className='form-control' type='text' placeholder='Enter username/ email' name='username' />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Enter Password</label>
                <div className="col-sm-8">
                    <input className='form-control' type='password' placeholder='Enter Password' name='password' />
                </div>
            </div>



            <div className="row mb-3 text-center">
                <div className="col-sm-8">
                    <input type='submit' className='btn btn-primary mt-2' value="Login" />
                </div>
            </div>

        </form>
    </div>
}

export default LoginForm;