import {
    Button,
    Label,
    Modal,
  } from "flowbite-react"
import { useState } from "react";
import {
  HiPlus,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import AddCustomer from "../../pages/api/admin/customers/AddCustomer";
import { ToastContainer, toast } from 'react-toastify';
import { number, object, string } from "yup";
import SpinnerComponent from "../Spinner";
import { Input } from "../Input";
import { Form, Formik } from "formik";
import { faker } from '@faker-js/faker';

interface errObject {
  key: string;
  message: string;
}

export default function AddUserModal() {
  const [isOpen, setOpen]         = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayErrors, setDisplayErrors] = useState<Array<errObject>>([]);

  const navigate = useNavigate();



  function handleDisplayError(key: string, error: string) {

    // If an error already exists for the key, replace it's error with the current one
    if (displayErrors.some((err) => err.key === key)) {
      setDisplayErrors(
        displayErrors.map((err) => {
          if (err.key === key) {
            return { key, message: error };
          }
          return err;
        })
      );
    }else{
      // Otherwise, add it (as the error object)
      setDisplayErrors([...displayErrors, {
        key: key,
        message: error,
      }]);
    }

  }

  function handleSubmit(values: any) {
      setIsLoading(true);
      console.debug('CreateCustomer form values', values);

      AddCustomer({
        name:          values.firstName,
        surName:       values.surName,
        email:         values.email,
        phone:         values.phone,
        address:       values.address,
        creditCard:    values.credit_card,
        relatedUserID: values.related_user,
      })
        .then((response) => {
          console.debug('CreateCustomer response', response);
          toast.success(`Added Customer successfully!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
          setIsLoading(false);
          navigate('/admin/');
        })
        .catch((error) => {
          console.error('EditCustomer error', error);

          // Loop for each key in error object
          Object.keys(error.response.data).forEach((key) => {

            // Get the value of the key in the error object
            const value = error.response.data[key];

            handleDisplayError(key, `An error occured in the ${key} field: ${value}`);

            toast.error(`An error has occured!`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            setIsLoading(false);
          });
        });
  }


  const CustomerValidation = object().shape({
    firstName:
      string()
      .required("This field is required")
      .min(3, "Must be at least 3 characters")
      .matches(/^[a-zA-Z ]*$/, 'Your name cannot contain any numbers or special characters'),

    surName:
      string()
      .required("This field is required")
      .min(3, "Must be at least 3 characters")
      .matches(/^[a-zA-Z ]*$/, 'Your name cannot contain any numbers or special characters'),

    email:
      string().email("Invalid email address")
      .required("This field is required"),

    phone:
      string()
      .required("This field is required")
      .max(10, "Must be exactly 10 characters")
      .matches(/^\d+$/, 'This field is numeric only'),

    address:
      string()
      .required("This field is required")
      .min(3, "Must be at least 3 characters"),

    credit_card:
      string()
      .required("This field is required")
      .min(13, "Must be at least 13 characters")
      .max(16, "Must be at most 16 characters")
      .typeError("This field is numeric only"),

    related_user:
      number()
      .typeError("This field is numeric only")
      .required("This field is required")
  });

  
    return (
      <>
        <ToastContainer />
        <Button className="bg-green-500 hover:bg-green-600" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-3">
            <HiPlus className="text-xl" />
            Add Customer
          </div>
        </Button>

        <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
          <Formik
            initialValues={{
              firstName:    faker.name.firstName(),
              surName:      faker.name.lastName(),
              email:        faker.internet.email(),
              address:      `${faker.address.streetAddress(true)}, ${faker.address.city()}, ${faker.address.country()}`,
              phone:        faker.phone.number('0#########'),
              credit_card:  faker.finance.creditCardNumber('visa').replaceAll('-', ''),
              related_user: null,
            }}
            onSubmit={handleSubmit}
            validationSchema={CustomerValidation}
            >
            {() => {
              return (
                <>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Create Customer</strong>
          </Modal.Header>
          <Form>
          <Modal.Body>
            {
              displayErrors.length > 0 &&
                <div className="w-full p-4 mb-6 bg-red-200 rounded-md shadow-md">
                  <div className="flex flex-row gap-x-4">
                    <div>
                      <p className="text-lg text-red-500">
                        <span className="ml-2 mr-2 text-lg font-medium text-red-600">Something went wrong!</span>
                        <ul className="pl-4">
                          {
                            displayErrors.map((error) => (
                              <li key={error.key}>{error.message}</li>
                            ))
                          }
                        </ul>
                      </p>
                    </div>
                  </div>
                </div>
            }
            {
              isLoading ? (
                <div className="flex items-center justify-center w-full py-24">
                  <SpinnerComponent />
                </div>
              )
              :
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                  />
              </div>
              <div>
                  <Input
                    id="surName"
                    name="surName"
                    label="Sur Name"
                  />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                  />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                  />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    type="text"
                  />
              </div>
              <div>
                <Label htmlFor="credit_card">Credit Card</Label>
                  <Input
                    id="credit_card"
                    name="credit_card"
                  />
              </div>
              <div>
                <Label htmlFor="related_user">Related User ID</Label>
                  <Input
                    id="related_user"
                    name="related_user"
                  />
              </div>
            </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600"
              >
              Create
            </Button>
          </Modal.Footer>
              </Form>
              </>
                  )}}
              </Formik>
        </Modal>
      </>
    );
  };