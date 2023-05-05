import React, { useEffect, useState } from 'react'
import GetCustomerFlights from './api/flights/GetCustomerFlights'
import { ApplicationStore } from '../state';
import { useStoreState } from 'easy-peasy';
import { FlightCard } from '../components/FlightCard';
import { Flight } from './HomePage';
import SpinnerComponent from '../components/Spinner';
import { ScreenBlockWithImage } from '../components/ScreenBlock';

export default function MyFlightsPage() {
    const userData                  = useStoreState((state: ApplicationStore) => state!.user);
    const [myFlights, setMyFlights] = useState<Flight[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUser, setIsUser]       = useState(false);

    useEffect(() => {
        setIsLoading(true);

        if (userData.data){
            setIsUser(true);
        }else{
            console.debug('User data is empty. User is not logged in.')

            setIsUser(false);
            setIsLoading(false);
        }

    }, [userData])

    useEffect(() => {

        GetCustomerFlights()
        .then((data) => {
            console.debug('GetMyFlights response data:', data)
            setMyFlights(data)

            setIsLoading(false);
        })
        .catch((error) => {
            console.error(error)

            setIsLoading(false);
        })
    }, [])


    return (
        <>
        {
            isLoading
            &&
            <div className="flex flex-col items-center justify-center h-full py-28">
                <SpinnerComponent white />
            </div>
        }
        {
            !isLoading && !isUser
            &&
            <div className="flex flex-col items-center justify-center h-full">
                <ScreenBlockWithImage
                        type="mustBeAUserToContinue"
                        title="You must be a user to continue!"
                        message="It takes less than a minute to create an account."
                        actionBtn={{
                            to:   "/register",
                            text: "Create An Account"
                        }}
                    />
            </div>
        }
       {
        (isUser && !isLoading && myFlights.length > 0) 
        ?
        <>
        <h1 className="mt-12 text-3xl font-bold text-center text-gray-700">My Flights</h1>
        {
            !isLoading && isUser
            &&
            <div className="flex items-center justify-center mt-4">
                <div className="max-w-4xl p-4 mb-6 rounded-md bg-sky-200">
                <div className="flex flex-row gap-x-4">
                    <div>
                        <p className="ml-2 mr-2 text-lg text-sky-600">If you would like to cancel your flight, please call our customer support at <b className='font-medium'>(+1) 1-800-420-CANCEL</b></p>
                    </div>
                </div>
                </div>
            </div>
        }
        <div className="grid items-center justify-between mx-auto mt-6 lg:grid-cols-2 xl:grid-cols-3">
        {
            myFlights.map((flight) => {
                return(
                    <FlightCard
                        key={flight.id}
                        id={flight.id}
                        origin_code={flight.origin_code}
                        origin_city={flight.origin_city}
                        origin_country_name={flight.origin_country_name} 
                        origin_country_code={flight.origin_country_code} 

                        destination_code={flight.destination_code}
                        destination_city={flight.destination_city}
                        destination_country_name={flight.destination_country_name}
                        destination_country_code={flight.destination_country_code}
                        
                        airline_company={flight.airline_company}   
                        airline_company_code={flight.airline_company_code}
                        
                        departure_datetime={flight.departure_datetime}
                        landing_datetime={flight.landing_datetime}

                        ticket_economy_price={flight.ticket_economy_price}
                        remaining_tickets={flight.remaining_tickets}

                        preview_only
                        />
                )
            })
        }
        </div>
        </>
        :
            isUser && !isLoading && myFlights.length === 0
            &&
            <div className="flex flex-col items-center justify-center h-full">
                    <ScreenBlockWithImage
                        type="notFound2"
                        title="You have no flights yet!"
                        message="Here's a cat to show you our empathy"
                        actionBtn={{
                            to:   "/",
                            text: "Lookup A Flight"
                        }}
                    />
            </div>
    }
    </>        
    )
}
