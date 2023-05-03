from app.services.users_service import UsersService
from ..exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from ..models import Airport, Customer, Flight, Ticket
import requests
import logging


class FlightService(BaseServiceInterface):
    """
    The following strings are meant to be funny. Do not edit these strings
    unless you are funny, too. If you don't know if you're funny, you're
    not funny. If fewer than 2 people unrelated to you have told you that 
    you're funny, you're not funny. And, you should avoid changing this.
    """
    logger = logging.getLogger('main')
    global MICROSERVICE_APP_URL
    MICROSERVICE_APP_URL = "http://localhost:8800"
    # MICROSERVICE_APP_URL = "http://fastapi-aerothree.onthewifi.com" 

    def __init__(self):
        logging.debug("FlightService initialized")

    def get_by_params(self, origin_display_name: str, 
                      destination_display_name: str, 
                      departure_date: str):
        logging.debug("FlightService.get_by_params() called")
        print("FlightService.get_by_params() called")

        # # Find the airport ID in database by the "origin_display_name" variable.
        # origin_display_name_in_db      = Airport.objects.get(display_name=origin_display_name).id
        # destination_display_name_in_db = Airport.objects.get(display_name=destination_display_name).id

        # # Find the flights that match the given parameters.
        # flights = Flight.objects.filter(origin_airport=origin_display_name_in_db, destination_airport=destination_display_name_in_db, 
        #                                 departure_time=departure_time,            landing_time=landing_time)

        # # Return the flights that match the given parameters.
        # return flights




        # Set the basic headers for the request 
        # (will require authentication token in the future)
        headers = {
            'content-type':   'application/json',
            'Accept':         'application/json',
            'Accept-Charset': 'UTF-8',
        }

        # Include all parameters in the request
        payload = {
            'origin_display_name':      origin_display_name,
            'destination_display_name': destination_display_name,
            'departure_date':           departure_date,
        }
        print('payload:',payload)

        logging.debug("Sending API request to microservice...")

        # Send an API request to the microservice endpoint
        rest = requests.get('http://127.0.0.1:8800/flights/', params=payload, verify=False)
        # prv
        print(rest)

        if rest.status_code != 200:

            if rest.status_code == 404:
                logging.error("No flights with given params found with the given params, status code: " + str(rest.status_code))
                raise ModelNotFoundException("No flights were found with the given parameters")

            logging.error("API request failed, status code: " + str(rest.status_code))
            raise Exception("Something terrible happened, that's all we know :(")



        response = rest.json()
        logging.debug("Got response from API: " + str(response))


        # Return the response from the microservice
        return response


    def get_by_id(self, flight_id: int):
        """
        Get the flight with the given ID.
        Wasn't moved to the MS because it only interacts with 
        the DB and doesn't contain any business logic.

        Args:
            flight_id (int): The ID of the flight to get.

        Raises:
            ModelNotFoundException: If the flight with the given ID doesn't exist.

        Returns:
            Flight: The flight with the given ID.
        """
        logging.debug("FlightService.get_by_id() called")
        
        # Check if the flight exists by ID
        flight = Flight.objects.filter(id=flight_id).first()

        if flight == None:
            logging.error('Flight not found, id: ' + str(flight_id))
            raise ModelNotFoundException('Flight not found')
        
        logging.debug('Returned flight: ' + str(flight))
        return flight


    def get_all_airports_display_name_by_query(self, query: str) -> list:
        """
        Get all the airports that match the given query.
        Used for the autocomplete feature in the search form.

        Args:
            query (str): The query to search for.

        Returns:
            list: A list of the airports that match the query.
        """
        logging.debug("FlightService.get_all_airports_display_name_by_query() called")

        # Find all airports that match the query
        airports = Airport.objects.filter(display_name__contains=query)
 
        # Return the airports that match the query
        return airports


    def get_all_customer_flights(self, user_id: int) -> list:
        """
        Get all the flights the user booked.
        Wasn't moved to the MS because it doesn't have any business logic.

        Args:
            customer_id (int): The ID of the user to get the flights of.
        
        Raises:
            ModelNotFoundException: If the user with the given ID doesn't exist.

        Returns:
            list: A list of the flights the user booked.
        """
        current_customer = Customer.objects.filter(user_id=user_id).first()

        if current_customer == None:
            logging.error('Customer not found, id: ' + str(user_id))
            return []

        user_tickets = Ticket.objects.filter(customer=current_customer).all()
        user_flights = []

        for ticket in user_tickets:
            flight = Flight.objects.filter(id=ticket.flight_id).first()
            user_flights.append(flight)

        logging.debug('Returned user flights: ' + str(user_flights))
        return user_flights


    def update_tickets_and_price(
                                self,
                                flight_id: int,
                                remaining_tickets: int,
                                ticket_economy_price: float
                                ):
        """
        Update the number of remaining tickets and the price of the flight.
        Wasn't moved to the MS because it doesn't have any business logic.

        Args:
            remaining_tickets (int): The new number of remaining tickets.
            flight_id (int): The ID of the flight to update.
            price (float): The new price of the flight.
        """
        logging.debug("FlightService.update_tickets_and_price() called")

        # Validate params
        # TODO: Move it to the serializer and check it in the view

        if remaining_tickets < 0:
            logging.error('Remaining tickets must be greater than 0')
            raise Exception('Remaining tickets must be greater than 0')

        if ticket_economy_price < 0:
            logging.error('Price must be greater than 0')
            raise Exception('Price must be greater than 0')

        if isinstance(remaining_tickets, int) == False:
            logging.error('Remaining tickets must be an integer')
            raise Exception('Remaining tickets must be an integer')
        
        if isinstance(ticket_economy_price, float) == False:
            logging.error('Price must be a float')
            raise Exception('Price must be a float')


        # Update the number of remaining tickets and the price of the flight
        return Flight.objects.filter(id=flight_id).update(remaining_tickets=remaining_tickets, ticket_economy_price=ticket_economy_price)
