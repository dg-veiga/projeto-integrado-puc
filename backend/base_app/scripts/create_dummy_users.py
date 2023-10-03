from base_app.models import User


def create_dummy_users():
    # apagando usuários existentes
    User.objects.filter(is_superuser=False).delete()

    for i in range(1, 11):
        index = str(i).zfill(2)
        User.objects.create_user(
            email=f'petowner{index}@mail.com', password=f'petOwner#{index}').save()
        User.objects.create_user(
            email=f'petviewer{index}@mail.com', password=f'petViewer#{index}').save()
            
if __name__ == 'django.core.management.commands.shell':
    create_dummy_users()
