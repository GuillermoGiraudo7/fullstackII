from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile
from .serializers import (
    RegisterSerializer, UserSerializer, 
    RequestOtpSerializer, VerifyOtpSerializer, ResetPasswordSerializer
)
import random

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        return Response(UserSerializer(user).data)

class RequestOtpView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        try:
            user = User.objects.get(username=username)
            profile, _ = UserProfile.objects.get_or_create(user=user)
            otp = str(random.randint(100000, 999999))
            profile.otp_code = otp
            profile.otp_created_at = timezone.now()
            profile.save()
            print(f"[DEBUG] OTP para {username}: {otp}")
            return Response({"message": "OTP generado. Revisa consola"})
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=404)

class ResetPasswordView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        otp_code = request.data.get('otp_code')
        new_password = request.data.get('new_password')
        try:
            user = User.objects.get(username=username)
            profile = UserProfile.objects.get(user=user)
            if profile.otp_code != otp_code:
                return Response({"error": "OTP incorrecto"}, status=400)
            if (timezone.now() - profile.otp_created_at).total_seconds() > 300:
                return Response({"error": "OTP expirado"}, status=400)
            user.set_password(new_password)
            user.save()
            profile.otp_code = ""
            profile.save()
            return Response({"message": "Contraseña actualizada"})
        except (User.DoesNotExist, UserProfile.DoesNotExist):
            return Response({"error": "Usuario no encontrado"}, status=404)