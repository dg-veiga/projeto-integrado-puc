from base_app.utils.hash import generate_hash
from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.translation import gettext as _


def picture_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'profiles/{instance.pk}/pictures/{generate_hash()}.{ext}'


class CustomUserManager(UserManager):

    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, email, password, **extra_fields)


class User(AbstractUser):

    picture = models.ImageField(verbose_name=_('Foto de Perfil'),
                                null=True,
                                blank=True,
                                upload_to=picture_path)

    created_at = models.DateField(auto_now_add=True,
                                  verbose_name=_('Data de Criação'),
                                  null=True,
                                  blank=True)

    updated_at = models.DateTimeField(
        verbose_name=_('Última alteração'),
        auto_now=True,
        null=True)

    objects = CustomUserManager()

    class Meta:
        verbose_name = _('Usuário')
        verbose_name_plural = _('Usuários')
        ordering = ['email']
