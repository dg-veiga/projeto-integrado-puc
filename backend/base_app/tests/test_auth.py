from django.test import TestCase

# Create your tests here.


class TestAuth(TestCase):

    def test_allow_any_route(self):
        response = self.client.get('/api/allow_any_route/')
        self.assertEqual('success', response.json()['detail'])
