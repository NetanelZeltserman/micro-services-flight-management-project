from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError
from app.exceptions.factory import ExceptionsFactory
from app.serializer.users_serializer import UserSerializer
from app.services.users_service import UsersService
from rest_framework_simplejwt.tokens import RefreshToken



class RegisterView(APIView):
    serializer_class = UserSerializer

    def post(self, request):
        try:
            user = UsersService.register(self,
                                            request.data["username"],
                                            request.data["email"],
                                            request.data["password"])
            serializer = self.serializer_class(user)

            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return ExceptionsFactory.handle(e)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            # Does it mean tokenis already blacklisted?
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)

