from django.test import Client, TestCase
from rest_framework.test import APIClient
from base_app.models import User, Pet
from project.core_models.aws_config import AWSConfig
from typing import List
from django.conf import settings

class TestCommon(TestCase):

    def setUp(self):
        super().setUp()
        self.client = Client()
        self.api_client = APIClient()

        aws_config: AWSConfig = settings.ROOT_OBJECT.aws_config
        aws_config.create_bucket()

    def _tokens(self, user: User, password: str):
        response = self.client.post(
            '/api/token/', {'username': user.email, 'password': password})
        self.assertEqual(user.id, response.data['id'])
        return response.data['access'], response.data['refresh']

    def create_user_and_get_tokens(self, email: str, password: str):
        """
        Constrói um base_app.User e retorna os tokens de acesso e de refresh.

        Args:
            email (str): Email do usuário
            password (str): Senha

        Returns:
            access, refresh (str, str): Tuple com tokens de acesso e de refresh
        """
        user = User.objects.create_user(
            email=email, password=password, is_active=True)
        user.save()
        user = User.objects.get(username=email)
        user.refresh_from_db()
        return self._tokens(user, password)

    def create_pet_for_owner(self, users: List[User], pet_data: dict):
        pet_data = pet_data.copy()
        # pet_data.update({'owner': [u.id for u in users]})
        pet = Pet.objects.create(**pet_data)
        pet.owner.set([u.id for u in users])
        return pet
