import React from "react";
import { useFormik } from "formik";
import Nav from '../components/Nav';

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
        <div>
            <Nav/>

            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br />
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br />
                <label htmlFor="firstname">First Name</label>
                <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <br />
                <label htmlFor="lastname">Last Name</label>
                <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

            </form>
        </div>
    )
}

export default SignupForm;