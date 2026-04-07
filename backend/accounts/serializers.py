from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

# OTP / Reset
class RequestOtpSerializer(serializers.Serializer):
    username = serializers.CharField()

class VerifyOtpSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp_code = serializers.CharField()

class ResetPasswordSerializer(serializers.Serializer):
    username = serializers.CharField()
    otp_code = serializers.CharField()
    new_password = serializers.CharField(write_only=True)