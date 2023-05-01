import logging
from app.exceptions.invalid_params import InvalidParamsException
from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from app.models import CanceledTickets, Ticket, Flight, Customer
from django.contrib.auth.models import User


class TicketService(BaseServiceInterface):
    global logger
    logger = logging.getLogger('main')

    def get_ticket_by_id(self, ticket_id: int):
        """
        Gets the ticket from the database by it's ID (ticket_id)
        and returns it.

        Params:
            - ticket_id: The ticket ID.

        Raises:
            - ModelNotFoundException: If the ticket with the given ID doesn't exist.
            - Exception: If a general error occurred in the flights service.

        Returns:
            - The ticket that was requested.
        """
        # Check if the ticket exists by ID
        ticket = Ticket.objects.filter(id=ticket_id).first()

        if ticket == None:
            logger.error(f'Ticket not found, id: {ticket_id}')
            raise ModelNotFoundException('Ticket not found')

        logger.debug(f'Returned the ticket, id: {ticket_id}')
        return ticket


    def book_ticket(self,
                    user_id: int,
                    flight_id: int,
                    first_name: str,
                    last_name: str,
                    email: str,
                    phone: str,
                    address: str,
                    credit_card: str,                    
                    ):
        """
        Creates a new ticket for the given flight (flight_id)
        for the customer that sent the request and returns the created ticket.
        
        Params:
            - flight_id: The flight ID.
        
        Raises:
            - ModelNotFoundException: If the flight with the given ID doesn't exist.
            - InvalidParamsException: If the flight is already booked.
            - Exception: If a general error occurred in the flights service.

        Returns:
            - The ticket that was booked.
        """
        logger.debug("TicketService.book_ticket() called")
        
        # Check if the ticket exists by ID
        flight = Flight.objects.filter(id=flight_id).first()

        if flight == None:
            logger.error('Flight not found, id: ' + str(flight_id))
            raise ModelNotFoundException('Flight not found')

        # It's here because when creating a new ticket, it doens't
        # Accept a customer ID, it accepts a customer object.
        customer = Customer.objects.filter(user_id=user_id).first()

        # Check if the flight is already booked
        if customer and flight.is_booked(customer):
            logger.error('Flight already booked, id: ' + str(flight_id))
            raise InvalidParamsException('Flight already booked')

        if not customer:
            # Get user by user id
            user = User.objects.filter(id=user_id).first()

            # Create a new customer for the user
            customer = Customer.objects.create(
                                            user=user,
                                            name=first_name,
                                            surname=last_name,
                                            email=email,
                                            phone=phone,
                                            address=address,
                                            credit_card=credit_card,
                                        )
            customer.save()

            # Add the customer group to the user
            user.groups.add(2)
            user.save()


        # Create a new ticket for the flight, customer = current user
        # TODO: Get the current user ID by the token in the request
        ticket = Ticket.objects.create(flight=flight, customer=customer)
        ticket.save()

        # Change ticket count in the flight to tickets - 1
        flight.remaining_tickets -= 1
        flight.save()

        logger.debug('Booked a new ticket: ' + str(ticket))
        return ticket

    def cancel_ticket(self, ticket_id: int):
        """
        Cancel a ticket (used by customers).
        Deletes the ticket from the Tickets table and adds it to the CanceledTickets table.

        Params:
            - ticket_id: The ticket ID.

        Raises:
            - Exception: If a general error occurred in the flights service.
            - ModelNotFoundException: If the ticket was not found.
            - InvalidParamsException: If the given ticket ID is in an invalid format

        Returns:
            - True if the ticket was canceled successfully. An exception otherwise
        """
        # Check if the ticket exists by ID
        ticket = Ticket.objects.filter(id=ticket_id).first()
        ticket_flight   = ticket.flight
        ticket_customer = ticket.customer

        if ticket == None:
            raise ModelNotFoundException(f'Ticket not found by ID {ticket_id}')
        
        # Check if ticket is not an integer
        if not isinstance(ticket_id, int):
            raise InvalidParamsException(f'Ticket ID must be an integer')
        
        ticket.delete()

        # Create a new ticketi n the CanceledTickets table
        CanceledTickets.objects.create(flight=ticket_flight, customer=ticket_customer)

        # Return the ticket that was canceled.
        return True


    def delete_ticket(self, ticket_id: int):
        """
        Delete a ticket in the database (used by admins)

        Params:
            - ticket_id: The ticket ID.

        Raises:
            - ModelNotFoundException: If the ticket was not found.
            - Exception: If a general error occurred in the flights service.
            - InvalidParamsException: If the given ticket ID is in an invalid format

        Returns:
            - None (void)
        """
        ticket = Ticket.object.filter(id=ticket_id).first()

        if ticket == None:
            raise ModelNotFoundException(f'Ticket not found by ID {ticket_id}')
        
        ticket.delete()
