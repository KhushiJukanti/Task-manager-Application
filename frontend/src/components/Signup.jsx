import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import React from 'react'
import '../App.css'

function Signup() {

    const [user, setUser] = useState({ email: "", firstname: "", lastname: "", password: "", confirm_password: "" })
    const [errors, setErrors] = useState({})
    const [isError, setIsError] = useState(false)
    const [errMessage, setErrMessage] = useState("")

    const navigate = useNavigate();

    const onFieldChange = (e) => {
        // console.log(e.target.name, e.target.value)
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const validateFormFields = () => {
        let errors = {};
        if (!user.firstname) {
            errors.firstname = "please Enter the first name"
        } if (!user.lastname) {
            errors.lastname = "please Enter the last name"
        } if (!user.email) {
            errors.email = "Please enter a valid email address"
        } if (!user.password) {
            errors.password = "Password is required"
        } else if (!user.confirm_password) {
            errors.confirm_password = "Re-Password is required"
        } else if (user.password !== user.confirm_password) {
            errors.confirm_password = "Passwords do not match";
        }
        return errors

    }

    const signup = () => {
        fetch("http://localhost:7000/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((res) => res.json()).then((result) => {
            if (result.success) {
                navigate("/login")
            } else {
                setIsError(true);
                setErrMessage(result.message)
            }
        })
    }

    const register = (e) => {
        e.preventDefault();
        let errors = validateFormFields()
        setErrors(errors)
        if (Object.keys(errors).length === 0) {
            // no errors here please call to backend
            signup()
        }
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "80vh" }}>
                <div className='col-md-4'>
                    <h2 className='text-start'style={{color:'#106EBE'}}>Signup</h2>
                    <div className='card' style={{border: "2px solid #106EBE"}}>
                        <div className='card-body mt-3'>

                            <form onSubmit={register}>

                                <div className='mb-4'>
                                    <input placeholder='First Name' type='text' className='form-control' value={user.firstname} onChange={onFieldChange} name='firstname' />
                                </div>
                                <p className='error-text'>{errors?.firstname}</p>

                                <div className='mb-4'>
                                    <input placeholder='Last Name' type='text' className='form-control' value={user.lastname} onChange={onFieldChange} name='lastname' />
                                </div>
                                <p className='error-text'>{errors?.lastname}</p>

                                <div className='mb-4'>
                                    <input placeholder='Email' type='email' className='form-control' value={user.email} onChange={onFieldChange} name='email' />
                                </div>
                                <p className='error-text'>{errors?.email}</p>

                                <div className='mb-4'>
                                    <input placeholder='Password' type='password' className='form-control' value={user.password} onChange={onFieldChange} name='password' />
                                </div>
                                <p className='error-text'>{errors?.password}</p>

                                <div className='mb-4'>
                                    <input placeholder='Confirm Password' type='password' className='form-control' value={user.confirm_password} onChange={onFieldChange} name='confirm_password' />
                                </div>
                                <p className='error-text'>{errors?.confirm_password}</p>

                                <input type="submit" value="Signup" className='btn btn-primary w-100 mb-4' style={{ backgroundColor: "#106EBE", border: "1px solid #009688" }} />

                                <div className='mb-4'>
                                    <span>Alredy you have an Account?</span> <Link to='/login' className="link-offset-2 link-underline link-underline-opacity-10">Login</Link>
                                </div>




                                {isError && <div className='mb-5'>
                                    <h4 style={{ color: '#106EBE' }}>{errMessage}</h4>
                                </div>}
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Signup
