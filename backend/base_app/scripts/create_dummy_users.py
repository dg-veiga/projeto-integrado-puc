from base_app.models import User


def create_dummy_users():
    # apagando usuários existentes
    User.objects.all().delete()

    User.objects.create_superuser(email='admin@admin.com', username='admin@admin.com', password='(Admin#123)')

    for i in range(1, 21):
        index = str(i).zfill(2)
        User.objects.create_user(
            email=f'petowner{index}@mail.com', password=f'petOwner#{index}').save()
            
if __name__ == 'django.core.management.commands.shell':
    create_dummy_users()
