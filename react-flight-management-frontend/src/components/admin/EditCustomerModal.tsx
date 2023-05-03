import { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import {
    Button,
    Label,
    Modal,
} from "flowbite-react";
import { Form, Formik } from "formik";
import { number, object, string } from "yup";
import { Input } from "../Input";
import { ToastContainer, toast } from 'react-toastify';
import UpdateCustomer from "../../pages/api/admin/customers/UpdateCustomer";
import SpinnerComponent from "../Spinner";
import { useNavigate } from "react-router-dom";

interface Props {
    customerID: number;
    firstName: string;
    surName: string;
    email: string;
    address: string;
    phoneNumber: string;
    creditCard: string;
    RelatedUser: string;
}

interface errObject {
  key: string;
  message: string;
}


export default function EditUserModal({customerID, firstName, surName, email, address, phoneNumber, creditCard, RelatedUser}: Props) {
    const [isOpen, setOpen]                 = useState(false);
    const [isLoading, setIsLoading]         = useState(false);
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
        console.debug('EditCustomer form values', values);

        UpdateCustomer({
          customerID: customerID,
          name: values.firstName,
          surName: values.surName,
          email: values.email,
          phone: values.phone,
          address: values.address,
          creditCard: values.credit_card,
          relatedUserID: values.related_user,
        })
          .then((response) => {
            console.debug('EditCustomer response', response);
            toast.success(`Updated Customer successfully!`, {
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
            setOpen(false);

            navigate('/admin')
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
        <Button className="bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:border-none focus:ring-sky-200" onClick={() => setOpen(true)}>
          <div className="flex items-center gap-x-2">
            <HiOutlinePencilAlt className="text-lg" />
            Edit
          </div>
        </Button>
        <Modal onClose={() => setOpen(false)} show={isOpen} dismissible>
          <Formik
            initialValues={{
              firstName:    firstName,
              surName:      surName,
              email:        email,
              address:      address,
              phone:        phoneNumber,
              credit_card:  creditCard,
              related_user: RelatedUser,
            }}
            onSubmit={handleSubmit}
            validationSchema={CustomerValidation}
            >
            {() => {
              return (
                <>
          <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
            <strong>Edit</strong>
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
                    placeholder={firstName}
                    defaultValue={firstName}
                  />
              </div>
              <div>
                  <Input
                    id="surName"
                    name="surName"
                    label="Sur Name"
                    placeholder={surName}
                    defaultValue={surName}
                  />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder={email}
                    type="email"
                    defaultValue={email}
                  />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder={phoneNumber}
                    type="tel"
                    defaultValue={phoneNumber}
                  />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder={address}
                    type="text"
                    defaultValue={address}
                  />
              </div>
              <div>
                <Label htmlFor="credit_card">Credit Card</Label>
                  <Input
                    id="credit_card"
                    name="credit_card"
                    placeholder={creditCard}
                    defaultValue={creditCard}
                  />
              </div>
              <div>
                <Label htmlFor="related_user">Related User ID</Label>
                  <Input
                    id="related_user"
                    name="related_user"
                    placeholder={RelatedUser}
                    defaultValue={RelatedUser}
                    // readOnly={true}
                    // hint="This field is read only"
                  />
              </div>
            </div>
            }
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="submit"
              color="success"
              // onClick={() => setOpen(false)}
              >
              Save all
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