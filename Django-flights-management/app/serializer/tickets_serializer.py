from rest_framework import serializers
from ..models import Ticket
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator

"""
Serializers to turn queryset objects to JSON data structures
"""

class TicketsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket

        # Which fields should be included in the parsed data?
        # Perhaps you would like to exclude some fields?
        fields = (
            'flight',
            'customer'
        )


class BookFlightSerializer(serializers.Serializer):
    first_name  = serializers.CharField(min_length=3, max_length=50)
    last_name   = serializers.CharField(min_length=3, max_length=50)
    email       = serializers.EmailField(
                    required=True,
                    validators=[UniqueValidator(queryset=User.objects.all())]
                  )
    phone       = serializers.CharField(min_length=10, max_length=10)
    address     = serializers.CharField(min_length=10, max_length=255)
    credit_card = serializers.CharField(min_length=13, max_length=50)

    def validate(self, data, user_id: int):
        first_name  = data.get('first_name')
        last_name   = data.get('last_name')
        email       = data.get('email')
        phone       = data.get('phone')
        address     = data.get('address')
        credit_card = data.get('credit_card')

        # if data object is empty
        if len(data) == 0:
            # Check if user is already a customer
            if not User.objects.filter(id=user_id).exists():
                raise serializers.ValidationError('Customer doesn\'t exist for user!')
            else:
                # Set data to user data
                data = User.objects.get(id=user_id)

        # TODO: Add more validations? To Diallow empty fields, special characters (in phone & CC)


        return data