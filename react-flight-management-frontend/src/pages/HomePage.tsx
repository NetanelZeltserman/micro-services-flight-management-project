import { FlightCard } from "../components/FlightCard";
import { FlightForm } from "../components/FlightForm";
import GetFlightsByParams from "./api/flights/GetFlightsByParams";
import { useState } from "react";
import ScreenBlock, { ScreenBlockWithImage } from "../components/ScreenBlock";
import SpinnerComponent from "../components/Spinner";

export interface FlightObj {
    object: "flight";
    data:   Flight;
}

export interface Flight {
    id:                       number;
    origin_code:              string;
    origin_city:              string;
    origin_country_name:      string;
    origin_country_code:      string;
    destination_code:         string;
    destination_city:         string;
    destination_country_name: string;
    destination_country_code: string;
    departure_datetime:       string;
    landing_datetime:         string;
    airline_company:          string;
    airline_company_code:     string;
    ticket_economy_price:     number;
    remaining_tickets:        number;
    preview_only?:            boolean;
}

interface ErrorObjInterface {
    code:           string;
    message:        string;
    custom_message: string;
    detail:         string;
}


export function HomePage() {

    const [Flights,  setFlights]          = useState<FlightObj[]>([]);
    const [ErrorObj, setErrorObj]         = useState<ErrorObjInterface | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    function onFlightFormSubmit(e: {
        origin_airport_id: string, destination_airport_id: string, departure_date: Date
    }) {
        setIsSubmitting(true);
        console.debug('onFlightFormSubmit', e)
        
        GetFlightsByParams(
            e.origin_airport_id,
            e.destination_airport_id,
            e.departure_date.toISOString().split('T')[0]
        )
        .then((res) => {
            console.debug('response of GetFlightsByParams', res);
            setErrorObj(null);
            setFlights(res);

            setIsSubmitting(false);
        })
        .catch((err) => {
            console.error('error in GetFlightsByParams', err.response.data);
            setErrorObj(err.response.data);

            setIsSubmitting(false);
        })
    }


    return (
        <div className="container flex flex-col items-center justify-between h-full mx-auto my-12">
            <FlightForm onSubmitSend={onFlightFormSubmit} />
            <div className="grid items-center justify-between mx-auto mt-6 lg:grid-cols-2 xl:grid-cols-3">
                {
                    (!isSubmitting && !ErrorObj && Flights && Flights.length > 0)
                    && 
                    Flights.map((flight) => {
                        return (
                            <FlightCard
                                key={flight.data.id}
                                id={flight.data.id}
                                origin_code={flight.data.origin_code}
                                origin_city={flight.data.origin_city}
                                origin_country_name={flight.data.origin_country_name} 
                                origin_country_code={flight.data.origin_country_code} 

                                destination_code={flight.data.destination_code}
                                destination_city={flight.data.destination_city}
                                destination_country_name={flight.data.destination_country_name}
                                destination_country_code={flight.data.destination_country_code}

                                airline_company={flight.data.airline_company}   
                                airline_company_code={flight.data.airline_company_code}

                                departure_datetime={flight.data.departure_datetime}
                                landing_datetime={flight.data.landing_datetime}

                                ticket_economy_price={flight.data.ticket_economy_price}
                                remaining_tickets={flight.data.remaining_tickets} 
                            />
                        )
                    })
                }
            </div>
            {
                (!isSubmitting && ErrorObj) && <ScreenBlockWithImage
                                title={ErrorObj.message          || ErrorObj.code}
                                message={ErrorObj.custom_message || ErrorObj.detail}
                                type="general"
                            />
            }
            {
            (!isSubmitting && !ErrorObj && Flights.length === 0)&& (
                <ScreenBlock
                    title={'Explore flights around the world'}
                    message={'Round and round we go... Hopefully to a new destination!'}
                    image={
                        <img
                            alt="2 Empty Notepads"
                            className="mb-8 h-60"
                            src={`${window.location.origin}/main_logo.png`}
                        />
                    }
                />
                )
            }
            {
                isSubmitting && (
                <div className="flex flex-col items-center justify-center min-w-[55rem] h-full my-6 p-16 shadow-md text-center text-gray-600 bg-white border border-gray-200 rounded-md">
                    <SpinnerComponent />
                </div>
                )
            }
        </div>
    )
}