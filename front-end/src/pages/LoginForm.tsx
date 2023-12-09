import React from "react";
import { useFormik } from "formik";
import Nav from '../components/Nav';
import Logo from '../resources/logo.png'

const LoginForm = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    });

    return (
        <div className="flex items-center justify-center h-screen bg-darkBlue">
            <div className="grid grid-rows-2">
                <img src={Logo} className="row-1 p-9" />
                <div className=" bg-darkBlue p-4 pb-0 rounded-xl text-black bg-white row-2">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-2 grid-rows-2 gap-2 content-evenly mb-0 pb-0">
                            <label htmlFor="email" className="row-1 col-1">Email Address:</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="johndoe@gmail.com"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className="row-1 col-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <label htmlFor="password" className="col-1">Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="johnDoe123"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className="col-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        <div className="flex justify-between pt-4 pb-0">
                            <a className="bg-gray-200 rounded-xl p-2">Sign up</a>
                            <div className=""></div>
                            <button className="bg-darkBlue text-white rounded-xl p-2" type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;