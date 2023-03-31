from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from app.exceptions.factory import ExceptionsFactory
from ..services.users_service import UsersService



class RegisterView(APIView):
     pass


class LoginView(APIView):
    """
    (!) Still WIP (!)
    """
    def post(self, request):
        try:
            user = UsersService.login(request.data["email"], request.data["password"])
            return Response(user, status=status.HTTP_200_OK)

        except Exception as e:
            return ExceptionsFactory.handle(e)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # TODO: Add a decorator to validate group instead 
        # check user group
        # if request.user.groups.filter(name="admin").exists():
        #      return Response(status=status.HTTP_403_FORBIDDEN)


        try:
            UsersService.logout(request.data["refresh_token"])
        except TokenError as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)

        return Response(status=status.HTTP_205_RESET_CONTENT)
