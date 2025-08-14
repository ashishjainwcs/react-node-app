import { validateFields, getNextUserId } from "../Utility/FormValidation";
import { updateUserData, userIdAvailable } from "../Utility/SiteHelper";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ADD_USER } from "../../constants/store.constants";
import { useDispatch } from "react-redux";

function RegistrationForm() {

    const siteData = useSelector(state => state.siteData);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault(); // stop page refresh

        const firstName = event.target.elements.firstName.value;
        const lastName = event.target.elements.lastName.value;
        const dateOfBirth = event.target.elements.dateOfBirth.value;
        const address = event.target.elements.address.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const passwordVerify = event.target.elements.passwordVerify.value;
        const phoneNumber = event.target.elements.phoneNumber.value;

        let errorFound = 'false';
        if (!validateFields(firstName)) {
            alert("Please enter first name");
            errorFound = 'true';
        }
        if (!validateFields(lastName)) {
            alert("Please enter last name");
            errorFound = 'true';
        }
        if (!validateFields(dateOfBirth)) {
            alert("Please enter Date of Birth");
            errorFound = 'true';
        }
        if (!validateFields(address)) {
            alert("Please enter address");
            errorFound = 'true';
        }
        if (!validateFields(email)) {
            alert("Please enter email");
            errorFound = 'true';
        }
        if (!validateFields(password)) {
            alert("Please enter password");
            errorFound = 'true';
        }
        if (!validateFields(passwordVerify)) {
            alert("Please enter passwordVerify");
            errorFound = 'true';
        }
        if (password !== passwordVerify) {
            alert("Password and password verify must match");
            errorFound = 'true';
        }
        if (!validateFields(phoneNumber)) {
            alert("Please enter phone number");
            errorFound = 'true';
        }

        if (errorFound === 'true') {
            return;
        }

        if (!userIdAvailable(siteData, email)) {
            alert("this email is already registered..., Please register with other email...");
            return;
        }
        const user = {
            userId: getNextUserId(siteData.siteData.users),
            firstName: firstName,
            lastName: lastName,
            gender: "M",
            dateOfBirth: dateOfBirth,
            address: address,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            userType: "C"
        }

        console.log("siteData befire adding ", siteData);
        /* adding new user to local storage */
        updateUserData(user);

        console.log("siteData after adding ", siteData);

        /* adding new user to state object */
        updateStateUserData(user);

        navigate("/");

    }

    const updateStateUserData = (user) => {

        dispatch({
            type: ADD_USER,
            payload: {
                data: {
                    loggedInUser: user.firstName,
                    loggedInUserId: user.userId,
                    loggedInUserType: user.userType,
                    user : user
                }
            }
        })



    }



    return <div className="mt-10  p-4 bg-info bg-opacity-10 border border-info border-start-0 rounded-end register-form-margin">
        <div className="row mb-3 text-center">
            <div className="col-sm-6">
                <h1 className="mb-5">Registration Form</h1>
            </div></div>
        <form className='col-xxl-6' onSubmit={handleSubmit}>
            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">First Name</label>
                <div className="col-sm-8">
                    <input className='form-control' type='text' placeholder='Enter First Name' name='firstName' />
                </div>
            </div>
            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Last Name</label>
                <div className="col-sm-8">
                    <input className='form-control' type='text' placeholder='Enter Last Name' name='lastName' />
                </div>
            </div>
            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Gender</label>
                <div className="col-sm-8">
                    <div>
                        <input type="radio" id="genderM" name="gender" value="M" />
                        <label >Male</label>
                    </div>

                    <div>
                        <input type="radio" id="genderF" name="gender" value="F" />
                        <label >Female</label>
                    </div>
                </div>
            </div>


            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Date of Birth</label>
                <div className="col-sm-8">
                    <input className='form-control' type='date' name='dateOfBirth' />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8">
                    <input className='form-control' type='text' placeholder='Enter Address' name='address' />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                    <input className='form-control' type='email' placeholder='Enter email' name='email' />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Enter Password</label>
                <div className="col-sm-8">
                    <input className='form-control' type='password' placeholder='Enter Password' name='password' />
                </div>
            </div>

            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Verify Password</label>
                <div className="col-sm-8">
                    <input className='form-control' type='password' placeholder='Verify Password' name='passwordVerify' />
                </div>
            </div>
            <div className="row mb-3 text-center">
                <label className="col-sm-4 col-form-label">Phone Number</label>
                <div className="col-sm-8">
                    <input className='form-control' type='text' placeholder='Enter Phone number' name='phoneNumber' />
                </div>
            </div>


            <div className="row mb-3 text-center">
                <div className="col-sm-8">
                    <input type='submit' className='btn btn-primary mt-2' value="RegisterMe" />
                </div>
            </div>

        </form>
    </div>
}

export default RegistrationForm;