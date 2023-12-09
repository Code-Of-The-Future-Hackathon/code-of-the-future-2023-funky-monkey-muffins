import React from "react";
import { useFormik } from "formik";
import logo from "../resources/logo.png"

const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 1));
        }
    });

    return (
        <div className="bg-darkBlue flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center w-[60%] mx-auto">
                <img src={logo} alt="logo" className="mb-4"/>
                <form className="border px-20 py-10 my rounded-[3rem] bg-white" onSubmit={formik.handleSubmit}>
                    <label htmlFor="username"></label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        className="border p-2 mb-4"
                        placeholder="Username"
                    />
                    <br />
                    <label htmlFor="email"></label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="border p-2 mb-4"
                        placeholder="Email"
                    />
                    <br />
                    <label htmlFor="password"></label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="border p-2 mb-4"
                        placeholder="Password"
                    />
                    <br />
                    <label htmlFor="firstName"></label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.firstName}
                        className="border p-2 mb-4"
                        placeholder="First Name"
                    />
                    <br />
                    <label htmlFor="lastName"></label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.lastName}
                        className="border p-2 mb-4"
                        placeholder="Last Name"
                    />
                    <div className="flex justify-between mt-4">
                        <button type="submit" className="mt-4">Sign Up</button>
                        <button className="mt-4">Log In </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignupForm;