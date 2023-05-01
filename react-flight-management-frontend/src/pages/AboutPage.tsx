export default function AboutPage(){
    return (
        <div className="flex justify-center items-start">
                <div className="flex flex-col min-w-[55rem] max-w-6xl h-full my-12 p-16 shadow-md text-left text-gray-700 bg-white border border-gray-200 rounded-md">
                    <section className="text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">Aero Three – Python Project</h2>
                        <p>
                        Aero Three is a comprehensive tourism app designed to be a one-stop shop for all your travel needs. While currently only the "Flights" section is available, the app is intended to include additional features in the future, such as finding hotels, car rentals, and more.
                        </p>
                        <p>
                        To ensure that the app can accommodate any future directions the business may take, it has been built using Micro Services Architecture. This allows us to expand the app as needed, while keeping each section self-contained and manageable.
                        </p>
                    </section>

                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">App Workflow schema</h2>
                        <img
                            className="mb-4"
                            src={`${window.location.origin}/workflow_ill.jpg`}
                            alt='workflow scheme'
                        />
                    </section>
                    <section className="mt-8 text-lg">
                        <h2 className="text-2xl text-gray-800 font-medium underline">Technology and usage</h2>
                            <p className="pl-6">
                            The app's main backend platform is built on the Django Framework, along with Django REST API. Django is responsible for orchestrating the connections of all the different parts of the app and managing user credentials. All requests are routed through the Django "url" file, and each request is forwarded to the corresponding "view" file, which is split into different files based on entities. The view files call the corresponding service files and return the data as REST API calls.
                            </p>
                            <p className="pl-6">For micro services that receive and send requests, we use Fast API. This lightweight and fast framework contains all of the business logic needed for the different sections of the app, both current and future. Since it is focused on REST API calls, it's easy to forward requests to cloud-based APIs and process the received data for storage in the database. The available API calls can be examined by navigating to the "/docs" URL.
                            </p>
                            <p className="pl-6">In the future, each business section will be a closed micro service. The micro service will receive API requests and call different cloud services to retrieve the necessary data. Once the data is received, the micro service will process it according to the app's business logic and return the appropriate response to the main Django app.
                            </p>
                            <p className="pl-6">Our main database is MySQL, which is connected to each section of the app. As the business grows, we can add more connections to the database as needed. Since the database is separated from the main frameworks, it can be used with a load balancer and redundant mirror connections. The database for this project is located on a separate server, and it can also be accessed through the PHP My Admin interface.
                            </p>
                            <p className="pl-6">Using React JS as the Frontend of our app enabled us to create dynamic user interfaces. It is a powerful tool that could also be integrated in future updates. With React, we break down the app into components, making it easier to manage and update individual parts of the application. Additionally, React helped us improve the app's performance by rendering only the necessary components. The use of React JS can help enhance the user experience of the Aero Three app and make it more scalable in the future.
                            </p>
                            <p className="pl-6">
                                Nginx is used as the main web server for the system. It is used to route the requests to the correct server and also to serve the static files. And as a reverse proxy for the Django app and the FastAPI app.
                            </p>
                    </section>
                </div>
        </div>
    )
}
