from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.model_not_found import ModelNotFoundException
from app.permissions.permission import user_permissions
from app.serializer.users_serializer import UserSerializer
from app.services.users_service import UsersService
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import Permission, User
from django.utils.decorators import method_decorator

class UserActions(APIView):
    serializer_class = UserSerializer

    @method_decorator(user_permissions('delete_user'))
    def delete(self, request, user_id):
        """
        Delete the user by the user id (used by admins).
        """
        try:
            UsersService.delete_user(user_id)

            return Response(status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)

    @method_decorator(user_permissions('view_user'))
    def get(self, request, user_id):
        """
        Get the user details by the user id.
        """
        try:
            user       = UsersService.get_user_by_id(self, user_id)
            serializer = self.serializer_class(user, many=False)

            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except ValueError as e:
            return ExceptionsFactory.handle(e)


    @method_decorator(user_permissions('change_user'))
    def put(self, request, user_id):
        """
        Update the user details by the user id.
        """
        try:
            user       = UsersService.update_user(self, request, user_id)
            serializer = self.serializer_class(user, many=False)

            return Response(serializer.data, status=204)
        except Exception as e:
            return ExceptionsFactory.handle(e)


class GetCurrentUserDetails(APIView):
    
    permission_classes = (IsAuthenticated,)

    def post(self, request, format='json'):
        token_user_email = request.user.email
        token_user_username = request.user.username
        token_user_id = request.user.id

        user        = User.objects.filter(id=token_user_id).first()
        permissions = Permission.objects.filter(user=user).all()

        # all_permissions = Permission.objects.all()

        return Response({
            'id': token_user_id,
            'username': token_user_username,
            'email': token_user_email,
            'permissions': [p.codename for p in permissions],
            'isAdmin': user.is_superuser
            # 'all_permissions': all_permissions
        })
