export default function AboutPage(){
    return (
        <div className="flex items-start justify-center">
                <div className="flex flex-col min-w-[55rem] max-w-6xl h-full my-12 p-16 shadow-md text-left text-gray-700 bg-white border border-gray-200 rounded-md">
                    <section className="text-lg">
                        <h2 className="text-2xl font-medium text-gray-800 underline">Aero Three – Python Project</h2>
                        <p>
                        Aero Three is a comprehensive tourism app designed to be a one-stop shop for all your travel needs. While currently only the "Flights" section is available, the app is intended to include additional features in the future, such as finding hotels, car rentals, and more.
                        </p>
                        <p>
                        To ensure that the app can accommodate any future directions the business may take, it has been built using Micro Services Architecture. This allows us to expand the app as needed, while keeping each section self-contained and manageable.
                        </p>
                    </section>

                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl font-medium text-gray-800 underline">App Workflow schema</h2>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/workflow_ill.jpg`}
                            alt='workflow scheme'
                        />
                    </section>
                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl font-medium text-gray-800 underline">Technology and usage</h2>
                            <p className="pl-6">
                            The app's main backend platform is built on the Django Framework, along with Django REST API. Django is responsible for orchestrating the connections of all the different parts of the app and managing user credentials. All requests are routed through the Django "url" file, and each request is forwarded to the corresponding "view" file, which is split into different files based on entities. The view files call the corresponding service files and return the data as REST API calls.
                            </p>
                            <br/>
                            <p className="pl-6">For micro services that receive and send requests, we use Fast API. This lightweight and fast framework contains all of the business logic needed for the different sections of the app, both current and future. Since it is focused on REST API calls, it's easy to forward requests to cloud-based APIs and process the received data for storage in the database. The available API calls can be examined by navigating to the "/docs" URL.
                            </p>
                            <br/>
                            <p className="pl-6">In the future, each business section will be a closed micro service. The micro service will receive API requests and call different cloud services to retrieve the necessary data. Once the data is received, the micro service will process it according to the app's business logic and return the appropriate response to the main Django app.
                            </p>
                            <br/>
                            <p className="pl-6">Our main database is MySQL, which is connected to each section of the app. As the business grows, we can add more connections to the database as needed. Since the database is separated from the main frameworks, it can be used with a load balancer and redundant mirror connections. The database for this project is located on a separate server, and it can also be accessed through the PHP My Admin interface.
                            </p>
                            <br/>
                            <p className="pl-6">Using React JS as the Frontend of our app enabled us to create dynamic user interfaces. It is a powerful tool that could also be integrated in future updates. With React, we break down the app into components, making it easier to manage and update individual parts of the application. Additionally, React helped us improve the app's performance by rendering only the necessary components. The use of React JS can help enhance the user experience of the Aero Three app and make it more scalable in the future.
                            </p>
                            <br/>
                            <p className="pl-6">
                                Nginx is used as the main web server for the system. It is used to route the requests to the correct server and also to serve the static files. And as a reverse proxy for the Django app and the FastAPI app.
                            </p>
                    </section>
                    <section className="mt-16 text-lg">
                        <h2 className="text-4xl font-medium text-gray-800 underline">User Manual</h2>

                        <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">User Search Box</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/flight_form.jpg`}
                            alt='workflow scheme'
                        />
                        <ul className="pl-6">
                            <li className="mt-4">
                                <b>Input Field – From:</b>
                                <p>
                                    Hardcoded into the app DB 1000+ International airports from around the world with their IATA code, City and Country.
                                    <br/>
                                    By typing at least 3 chars the app will try to autocomplete and help you choose the desire departure destination.
                                </p>
                            </li>
                            <li className="mt-4">
                                <b>Input Field – To:</b>
                                <p>
                                    Same as the "From", just choose your desired destination.
                                </p>
                            </li>
                            <li className="mt-4">
                                <b>Date Picker – Departing:</b>
                                <p>
                                    Choose the date you are interested for the app to search for a flight.
                                    <br/>
                                    Due to API limitations the departing date can only be searched a week a head from today and up to a month in advance!
                                    <br/>
                                    <span className="text-sm italic text-gray-500">No, this isn't a bug, it's a feature</span>
                                </p>
                            </li>
                            <li className="mt-4">
                                <b>Featured Searched:</b>
                                <p>
                                    The featured searched are the most popular searches that users have searched for.
                                    <br/>
                                    They are shown right below the main search-flight form in the homepage.
                                </p>
                            </li>
                        </ul>
                    </section>
                    <section className="mt-16">
                        <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">User Search Results Box</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/admin_flights_crud.png`}
                            alt='Admin CRUD Menu'
                        />

                        <ul className="pl-6">
                            <li>1. Date and Time of the flight found in API or DB.</li>
                            <li>2. Departure location details and next to it Landing location details.</li>
                            <li>3. Airline and flight number – Codeshare flights are not show due to duplications.</li>
                            <li>4. Standard Ticket price.*</li>
                            <li>5. Book button – Anon users will be redirected to the Sign Up / Registration page, if they are already registered users they can login. <b>Flights can only be booked once!</b></li>
                            <li>6. Remaining tickets shows how many tickets are available, When a user book a flight the counter is deducting a ticket from the total available seats.*</li>
                            
                            <br/>
                            <b>Note: Since flights don't departure to every destination every day, The app will sometimes show flights with approx dates to the original searched date</b>
                            <br/>
                            
                            <span className="mt-6 text-sm italic text-gray-500">
                                *- Our API provider – "Flight Aviation" isn't providing us with Flights Prices and Seats availability.
                                <br/>
                                Therefore once a user is searching for a flight, our app is auto generating a random reasonable price and seats availability and write it to the DB.
                                <br/>
                                From this stage every change to the flight considered the auto generated fields as it was part of the data given to us by the API.
                                <br/>
                            </span>
                        </ul>
                    </section>

                    <section className="mt-16">
                        <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">Registration</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/register.png`}
                            alt='register form'
                        />
                        <p className="pl-6">
                        Guests that would like to book a flight must register first, this can be achieved either by clicking on the "Sign Up" button at the top right corner of the app or after pressing the "Book" button in the search results box. 
                        </p>
                    </section>
                    <section>
                    <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">From Registered User to Customer</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/book_flight_form.png`}
                            alt='book flight form'
                        />
                        <p className="pl-6">
                            Once a registered user is interesting in booking a flights the "Book Your Flight" windows will open and allow the user to enter personal details and payment options*
                            <br/>
                            This is only entered once and the system saves the information for future use so the next time a registered user is booking a flight they are already treated as customers and the no more information is needed.
                            <br/>
                            <span className="text-sm italic text-gray-500">
                            * To Keep this project manageable and for convenience reasons the information in this page is partially auto generated since it is getting too complicated as it is 😃
                            </span>
                        </p>
                    </section>
                    <section>
                        <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">Administrator Flights CRUD Control Box</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/admin_flights_crud.png`}
                            alt='admin search results'
                        />
                        <p className="pl-6">
                            When logged as Admin an option menu appears inside the search result box.
                            <br/>
                            <br/>
                            Delete - Delete this flights from the DB.
                            <br/>
                            Edit – The header shows the Flight ID in the DB and since the price and seats are randomly generated by the system (at first search by the user), an Admin can override these values.
                            <br/>
                            <img
                                className="mt-4"
                                src={`${window.location.origin}/admin_edit_flight_popup.png`}
                                alt='admin edit flight popup'
                            />
                        </p>
                    </section>
                    <section>
                        <h3 className="mt-16 mb-4 text-2xl font-medium text-gray-800">Admin Dashboard User Control</h3>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/admin_dashboard.jpg`}
                            alt='admin dashboard'
                        />
                        <ul className="pl-6">
                            <li>1. Admin Dashboard – Show statistics (mockup)</li>
                            <li>2. Customers – CRUD Operations on registered users</li>
                            <li>3. Docs – Link to the AeroThree GitHub page</li>
                            <li>4. Customer Table – Show data of the customers from DB</li>
                            <li>5. Edit – Allows an Admin to edit Customers data</li>
                            <li>6. Delete - Allows an Admin to delete Customers data</li>
                            <li>7. Add Customer – Allows an Admin to elevate a registered user (that was already registered before) to a customer by providing customer details.</li>
                        </ul>
                        <span className="mt-6 text-sm italic text-gray-500">
                        Only customers are shown in this table.
                        <br/>
                        A customer is a User that (ever) booked at least 1 flight.
                        </span>
                    </section>
                </div>
        </div>
    )
}
