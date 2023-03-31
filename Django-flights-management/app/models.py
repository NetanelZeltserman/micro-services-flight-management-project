from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from app.exceptions.invalid_params import InvalidParamsException

# TODO: Add random activity generator facade to generate fake user activity:
#       - User X just bought a flight ticket to Y in the popup on the bottom-right corner
#       - User X just bought 


class Airport(models.Model):
    country_name = models.CharField(max_length=50)
    city_name    = models.CharField(max_length=50)
    airport_name = models.CharField(max_length=50)
    airport_code = models.CharField(max_length=3,
                                    validators=[
                                        RegexValidator(
                                            '^[A-Z]*$',
                                            'Only uppercase letters allowed.'
                                        )
                                    ],
                                    unique=True)
    display_name = models.CharField(max_length=100)


class Flight(models.Model):
    origin_airport                    = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='origin')
    destination_airport               = models.ForeignKey(Airport, on_delete=models.CASCADE, related_name='destination')
    departure_time                    = models.DateTimeField()
    landing_time                      = models.DateTimeField()
    airline_company                   = models.CharField(max_length=50)
    airline_company_code              = models.CharField(max_length=50)
    # only departure flights for now so no need for this any more
    # status                            = models.CharField(max_length=50)
    remaining_tickets                 = models.IntegerField()
    ticket_economy_price              = models.FloatField()

    ticket_economy_manual_override    = models.BooleanField(default=0) 
    remaining_tickets_manual_override = models.BooleanField(default=0) 

    def is_booked(self, customer_obj) -> bool:
        """
        Check if a customer has already booked a ticket for this flight.

        Params:
            - customer_obj: The customer object.

        Returns:
            - True if the customer has already booked a ticket for this flight. False otherwise.
        """

        # Validate the customer_obj
        if customer_obj == None or not isinstance(customer_obj, Customer):
            raise InvalidParamsException('Invalid customer object. Perhaps you entered a customer ID instead?')

        try:
            Ticket.objects.get(customer=customer_obj, flight=self)
        except:
            # A NotFound exception was raised, so the customer hasn't booked a ticket for this flight
            # Because the ticket object wasn't found...
            return False

        return True


class Customer(models.Model):
    name        = models.CharField(max_length=50)
    surname     = models.CharField(max_length=50)
    user        = models.ForeignKey(User, on_delete=models.CASCADE)
    email       = models.EmailField()
    address     = models.CharField(max_length=255)
    phone       = models.CharField(max_length=20)
    credit_card = models.CharField(max_length=20)


class Ticket(models.Model):
    flight      = models.ForeignKey(Flight,   on_delete=models.CASCADE)
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE)


class CanceledTickets(models.Model):
    flight      = models.ForeignKey(Flight,   on_delete=models.CASCADE)
    customer    = models.ForeignKey(Customer, on_delete=models.CASCADE)
