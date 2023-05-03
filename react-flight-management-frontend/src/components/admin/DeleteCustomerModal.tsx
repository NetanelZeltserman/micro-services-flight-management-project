import React, { useState } from 'react'
import DeleteCustomer from '../../pages/api/customers/DeleteCustomer';
import { Button, Modal } from 'flowbite-react';
import SpinnerComponent from '../Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface Props {
    customerID: number;
}


export default function DeleteCustomerModal({customerID}: Props) {
    const [isOpen,    setOpen]      = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    function handleSubmit(){
        setIsLoading(true);
        console.debug('DeleteCustomerModal form values', customerID);

        DeleteCustomer(customerID)
            .then((r) => {
                console.debug('DeleteCustomerModal response:', r);
                setIsLoading(false);
                setOpen(false);

                toast.success(`Successfully deleted customer #${customerID}!`);
                navigate('/admin/')

            })
            .catch((e) => {
                console.error('DeleteCustomerModal error:', e);
                setIsLoading(false);

                toast.error('Error deleting customer');
            })
    }

    return (
        <>
        <ToastContainer />
        <Button
            className="bg-red-500 hover:bg-red-600 focus:ring-4 focus:border-none focus:ring-red-200"
            onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-x-2">
            <FontAwesomeIcon icon={faTrashAlt} />
            Delete
          </div>
        </Button>
        <Modal
            show={isOpen}
            size="md"
            popup={true}
            onClose={() => setOpen(false)}
        >
            <Modal.Header />
            <Modal.Body>
            {
                isLoading ? (
                    <div className="flex justify-center">
                        <SpinnerComponent />
                    </div>
                ) : (
                    <div className="text-center">
                        <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                        Delete a customer, just like that...
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            className='rounded-none'
                            onClick={() => handleSubmit()}
                        >
                            Yes. Squash em!
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => setOpen(false)}
                            className='hover:text-gray-600 focus:text-gray-700 focus:hover:text-gray-700 focus:ring-4 focus:ring-gray-200'
                        >
                            No, cancel
                        </Button>
                        </div>
                    </div>
                )
            }
            </Modal.Body>
        </Modal>
        </>
  )
}
