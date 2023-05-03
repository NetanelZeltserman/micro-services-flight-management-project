import React, { useEffect, useState } from 'react'
import GetCustomerFlights from './api/flights/GetCustomerFlights'
import { ApplicationStore } from '../state';
import { useStoreState } from 'easy-peasy';
import { FlightCard } from '../components/FlightCard';
import { FlightObj } from './HomePage';

export default function MyFlightsPage() {
    const userData                  = useStoreState((state: ApplicationStore) => state!.user);
    const [myFlights, setMyFlights] = useState<FlightObj[]>([]);

    useEffect(() => {
        if (userData.data){

            GetCustomerFlights(userData.data!.id)
            .then((data) => {
                console.debug('GetCustomerFlights response data:', data)
                setMyFlights(data)
            })
            .catch((error) => {
                console.error(error)
            })
        }

    }, [userData])


    return (
        <>
        testssetes
       {
        myFlights.length > 1 && myFlights.map((flight) => {
            return(
                <>
                </>
                // <FlightCard
                //     key={flight.data.id}
                //     id={flight.data.id}
                //     origin_code={flight.data.origin_code}
                //     origin_city={flight.data.origin_city}
                //     origin_country_name={flight.data.origin_country_name} 
                //     origin_country_code={flight.data.origin_country_code} 

                //     destination_code={flight.data.destination_code}
                //     destination_city={flight.data.destination_city}
                //     destination_country_name={flight.data.destination_country_name}
                //     destination_country_code={flight.data.destination_country_code}
                    
                //     airline_company={flight.data.airline_company}   
                //     airline_company_code={flight.data.airline_company_code}
                    
                //     departure_datetime={flight.data.departure_datetime}
                //     landing_datetime={flight.data.landing_datetime}

                //     ticket_economy_price={flight.data.ticket_economy_price}
                //     remaining_tickets={flight.data.remaining_tickets} 
                //     />
            )
        })
    }
    </>        
    )
}
