from base_app.models import User


def create_dummy_users():
    # apagando usuários existentes
    User.objects.filter(is_superuser=False).delete()

    for i in range(1, 51):
        User.objects.create_user(
            email=f'user{str(i)}@mail.com', password=f'user#{str(i)}').save()
            
if __name__ == 'django.core.management.commands.shell':
    create_dummy_users()
