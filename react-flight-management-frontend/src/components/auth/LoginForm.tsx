import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import Login from "../../pages/api/auth/login";
import { Link, useNavigate } from "react-router-dom";
import http, { isAuthenticted } from "../../pages/api/http";
import { ToastContainer, toast } from 'react-toastify';
import getUserDetails from "../../pages/api/auth/getUserDetails";
import { Actions, useStoreActions } from 'easy-peasy';
import { ApplicationStore } from "../../state";
import SpinnerComponent from "../Spinner";
import { Input } from "../Input";

const LoginValidation = object().shape({
  username: string().required("An username is required").min(3, "Must be at least 3 characters"),
  password: string().required("A password is required").min(8, "Must be at least 8 characters"),
});

function LoginForm() {
  const navigate = useNavigate();

  useEffect(() => {
    
    if (isAuthenticted()) {
      navigate('/')
    }
  
  }, [navigate])


  // const updateUserData = useStoreActions((actions) => actions.user.updateUserData);
  const updateUserData = useStoreActions((actions: Actions<ApplicationStore>) => actions.user.updateUserData);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values: any) => {
    setLoading(true)
    console.debug('Login form submitted, values:', values);

    Login(values.username, values.password)
    .then(async (r) => {

          // Set recieved tokens in local storage
          localStorage.setItem("access_token",  r.access);
          localStorage.setItem("refresh_token", r.refresh);

          http.defaults.headers['Authorization'] = "JWT " + r.access;


          console.debug('logging in...');
          console.debug('response of login request:', r);

          
          // Get user details
          await getUserDetails().then(async (r) => {
            console.debug('User details response:', r);

            // Save in redux state using easy-peasy
            updateUserData(r);
            
          })
          setLoading(false);

          // Redirect to home page using react-router-dom
          navigate('/')
      })
      .catch((err) => {
          setLoading(false);

          console.error(err);
          toast.error(`Login failed! ${err.response.data.detail}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

      })

  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-transparent">
      <ToastContainer />
      <Formik
        initialValues={{
          username: "admin55",
          password: "admin1234",
        }}
        onSubmit={handleSubmit}
        validationSchema={LoginValidation}
      >
        {() => {
          return (
            <Form className="w-full px-16 pt-6 pb-8 bg-white rounded shadow-lg">
                <h1 className="text-4xl font-semibold text-center text-sky-500">
                Login
                </h1>
                {
                  isLoading ?
                  <div className="flex items-center justify-center my-12 mx-28">
                    <SpinnerComponent />
                  </div>
                  :
                    <div className='mt-6'>
                      <Input name="username" label="Username" />
                      <Input name="password" label="Password" type="password" />
                      <p className="mb-8 -mt-3 text-xs font-light text-gray-700">
                          {" "}
                          <Link
                              to="#"
                              className="font-medium text-sky-600 hover:underline"
                          >
                          Forgot your password?{" "}
                          </Link>
                      </p>
                      <div className="flex items-center justify-center">
                          <button
                          className="px-4 py-2 font-bold text-white rounded shadow-sm bg-sky-500 hover:bg-sky-600 hover:shadow-md focus:ring-4 focus:ring-sky-200 focus:outline-none focus:shadow-outline"
                          type="submit"
                          >
                          Login
                          </button>
                      </div>
                  </div>
                }
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-sky-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </Form>
          );
        }}
      </Formik>
        
    </div>
  );
}

export default LoginForm;
