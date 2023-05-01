import {
    Label,
    Table,
  } from "flowbite-react";
import EditCustomerModal from "./EditCustomerModal";
import { useEffect, useState } from "react";
import GetCustomersList from "../../pages/api/admin/customers/getCustomersList";
import SpinnerComponent from "../Spinner";

interface Customer {
    id:          number;
    name:        string;
    surname:     string;
    email:       string;
    phone:       string;
    user:        string; // User ID
    address:     string;
    credit_card: string;
}

export default function AllUsersTable() {
    const [customersList, setCustomersList] = useState<Customer[]>([]);
    const [isLoading,     setIsLoading]     = useState(true);

    useEffect(() => {
        console.debug('Getting customers list...');

        GetCustomersList()
            .then((r) => {
                console.debug('Customers list response:', r);
                setCustomersList(r);
                setIsLoading(false);
            })
            .catch((e) => {
                console.error('Customers list error:', e);
                setIsLoading(false);
            })

    }, []);

    return (
      <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
        <Table.Head className="bg-gray-100 dark:bg-gray-700">
          <Table.HeadCell>
            <Label htmlFor="select-all" className="sr-only">
              Select all
            </Label>
          </Table.HeadCell>
          <Table.HeadCell>How my friends call me...</Table.HeadCell>
          <Table.HeadCell>Phone</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>Related User ID</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {
          isLoading && (
            <Table.Row>
              <Table.Cell colSpan={6} className="text-center py-16">
                <SpinnerComponent />
              </Table.Cell>
            </Table.Row>
          )
        }
        {
            (!isLoading && customersList.length > 0) && customersList.map((customer) => {
              return (
                <Table.Row className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Table.Cell className="w-4 p-4">
                    </Table.Cell>
                    <Table.Cell className="mr-12 flex items-center space-x-6 whitespace-nowrap p-4 lg:mr-0">
                      <img
                          className="h-10 w-10 rounded-full"
                          src={`https://api.dicebear.com/6.x/big-ears-neutral/svg?seed=${customer.email}`}
                          alt="Neil Sims avatar"
                      />
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          <div className="text-base font-semibold text-gray-900 dark:text-white">
                            {(customer.name && customer.surname) ? `${customer.name} ${customer.surname}` : '—'}
                          </div>
                          <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            {customer.email || 'No email specified'}
                          </div>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                      {customer.phone || '—'}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                      {customer.address || '—'}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap p-4 text-base font-normal text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      #{customer.user}
                    </div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-x-3 whitespace-nowrap">
                          <EditCustomerModal
                            customerID={customer.id}
                            firstName={customer.name}
                            surName={customer.surname}
                            email={customer.email}
                            address={customer.address}
                            phoneNumber={customer.phone}
                            creditCard={customer.credit_card}
                            RelatedUser={customer.user}
                          />
                          {/* <DeleteCustomerModal /> */}
                      </div>
                    </Table.Cell>
                </Table.Row>
            )
            })
        }
        </Table.Body>
      </Table>
    );
  };