from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.invalid_params import InvalidParamsException
from app.exceptions.model_not_found import ModelNotFoundException
from app.permissions.permission import user_permissions
from app.serializer.tickets_serializer import BookFlightSerializer, TicketsSerializer
from app.services.tickets_service import TicketService
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated

class GetSpecificTicketByID(APIView):
    """
    Get a ticket (used by customers)
    """
    serializer_class = TicketsSerializer

    @method_decorator(user_permissions('view_ticket'))
    def get(self, request, ticket_id: int):
        try:
            ticket     = TicketService.get_ticket_by_id(self, ticket_id)
            serializer = self.serializer_class(ticket)

            # Return the ticket that was requested
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)


class BookTicket(APIView):
    """
    Book a ticket for a flight.
    """
    permission_classes = (IsAuthenticated,)
    serializer_class   = TicketsSerializer

    def post(self, request, flight_id: int):
        try:
            if not BookFlightSerializer.validate(self, request.data, request.user.id):
                raise InvalidParamsException('Invalid request data.')
            else:

                ticket     = TicketService.book_ticket(
                                            self, request.user.id, flight_id,
                                            request.data.get('firstName')  or None,
                                            request.data.get('lastName')   or None,
                                            request.data.get('email')      or None,
                                            request.data.get('phone')      or None,
                                            request.data.get('address')    or None,
                                            request.data.get('creditCard') or None,
                                            )
                serializer = self.serializer_class(ticket)

                # Return the ticket that was booked.
                return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except InvalidParamsException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)


class CancelTicket(APIView):
    """
    Cancel a ticket (used by customers).
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = TicketsSerializer

    def post(self, request, ticket_id: int):
        try:
            TicketService.cancel_ticket(self, ticket_id)

            # Return the ticket that was canceled.
            return Response('', status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except InvalidParamsException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)


class DeleteTicket(APIView):
    """
    Forcfuly delete a ticket (used by admins).
    """
    serializer_class = TicketsSerializer

    @method_decorator(user_permissions('delete_ticket'))
    def delete(self, request, ticket_id: int):
        try:
            ticket     = TicketService.delete_ticket(self, ticket_id)
            serializer = self.serializer_class(ticket)

            # Return the ticket that was deleted.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except InvalidParamsException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)
