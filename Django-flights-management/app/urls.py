from django.urls              import path
from .views                   import *
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [

      #
      # Authentication
      #
      path('auth/logout/',
            LogoutView.as_view(),
            name ='logout'),

      path('auth/register/',
            RegisterView.as_view(),
            name ='register'),

      path('auth/login/',
            jwt_views.TokenObtainPairView.as_view(),
            name ='login'),

      path('auth/refresh/',
            jwt_views.TokenRefreshView.as_view(),
            name ='token_refresh'),
      
      path('auth/get_details/',
            GetCurrentUserDetails.as_view(),
            name ='get_details'),
            


      #
      # Airports
      #      
      path('airports/',
            AirportsCreateAndList.as_view(),
            name='airports_create_and_list'
            ),
      
      path('airports/<int:pk>',
            AirportsGetByIDUpdateDelete.as_view(),
            name='airports_get_by_id_update_delete'
            ),


      #
      # Flights
      #
      path('flights/',
           GetFlightsByParams.as_view(),
           name='flights_get_by_params'
           ),

      path('flights/<int:pk>/',
           FlightsCRUD.as_view(),
           name='flights_crud'
           ),


      #
      # Customers
      #
      path('customers/',
           CustomerList.as_view(),
           name='customers_list',
           ),

      path('customers/<int:pk>/',
            CustomerRUD.as_view(),
            name='customers_rud'
            ),

      path('customers/myflights/',
            GetMyFlights.as_view(),
            name='customers_flights'
            ),

      path('customers/checkme/',
            CheckMe.as_view(),
            name='customers_checkme'
            ),
      


      #
      # Users
      #
      path('users/<int:user_id>/',
            UserActions.as_view(),
            name='user_actions'
           ),
      


      #
      # Tickets
      #
      path('tickets/<int:ticket_id>/',
            GetSpecificTicketByID.as_view(),
            name='tickets_book'
            ),
      path('tickets/book/<int:flight_id>/',
            BookTicket.as_view(),
            name='tickets_book'
            ),
      
      path('tickets/cancel/<int:ticket_id>/',
            CancelTicket.as_view(),
            name='tickets_cancel'
            ),
      
      path('tickets/delete/<int:ticket_id>/',
            DeleteTicket.as_view(),
            name='tickets_delete'
            ),
]
