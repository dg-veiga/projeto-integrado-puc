import tempfile
from PIL import Image
from base_app.tests.common import TestCommon
from base_app.models import User, Pet


class TestWeighingRoutes(TestCommon):

    def test_pet__create_weighing_record_for_pet__expected_success(self):
        pass
        # TODO
        # access_token, _ = self.create_user_and_get_tokens(
        #     'owner1@email.com', 'password')
        # self.api_client.credentials(
        #     HTTP_AUTHORIZATION='Bearer ' + access_token)

        # u1 = User.objects.get(username='owner1@email.com')
        # pet = self.create_pet_for_owner(
        #     users=[u1],
        #     pet_data={
        #         'name': 'Ralf', 
        #         'species': 1, 
        #         'breed': 'Rottweiler',
        #         'birth_date': '2020-10-03',
        #         'adoption_date': '2020-12-03',
        #     }
        # )

        # body = {
        #     'pet': pet.id,
        #     'date': '2023-10-01',
        #     'weight': 13.79
        # }

        # response = self.api_client.post(
        #     f'/api/weight/', data=body, format='json')
        # json_response = response.json()

        # self.assertEqual(201, response.status_code)
