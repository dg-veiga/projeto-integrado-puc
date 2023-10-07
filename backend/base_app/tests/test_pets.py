import tempfile
from PIL import Image
from base_app.tests.common import TestCommon
from base_app.models import User

class TestPetRoutes(TestCommon):
    
    def test_pet__create_pet__expected_success(self):
        access_token, _ = self.create_user_and_get_tokens(
            'user1@email.com', 'password')
        self.api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

        u1 = User.objects.get(username='user1@email.com')

        body = {
            'name': 'Paul',
            'species': 1,
            'breed': 'Rottweiler',
            'birth_date': '2020-10-03',
            'adoption_date': '2020-12-03',
        }

        response = self.api_client.post(
            f'/api/create_pet/', data=body, format='json')
        json_response = response.json()

        self.assertEqual(201, response.status_code)

    def test_pet__create_pet_with_picture__expected_success(self):
        access_token, _ = self.create_user_and_get_tokens(
            'user1@email.com', 'password')
        self.api_client.credentials(HTTP_AUTHORIZATION='Bearer ' + access_token)

        u1 = User.objects.get(username='user1@email.com')

        picture_file = tempfile.NamedTemporaryFile(suffix='.jpg')
        picture = Image.new('RGB', (255, 255))
        picture.save(picture_file.name)

        body = {
            'name': 'Paul',
            'species': 1,
            'breed': 'Rottweiler',
            'birth_date': '2020-10-03',
            'adoption_date': '2020-12-03',
            'picture': picture_file
        }

        response = self.api_client.post(
            f'/api/create_pet/', data=body, format='multipart')
        json_response = response.json()

        expected_regex_picture = f'^https://testing-bucket.s3.amazonaws.com/media/public/pet_pictures/{u1.id}/[_a-zA-Z0-9]{{1,64}}.jpg$'
        picture_url = json_response.get('picture')

        self.assertEqual(201, response.status_code)
        self.assertRegex(picture_url, expected_regex_picture)
