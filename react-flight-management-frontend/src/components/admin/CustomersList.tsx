import AddCustomerModal from "./AddCustomerModal";
import AllCustomersTable from "./AllCustomersTable";

export default function CustomersList(){



    return (
        <>
            <div className="flex items-center justify-center my-4">
                <h1 className="text-xl font-semibold text-gray-600 dark:text-white sm:text-2xl">
                All Customers
                </h1>
                    <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                        <AddCustomerModal />
                    </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow">
                            <AllCustomersTable />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}