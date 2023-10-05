from django.db import models
from django.utils.translation import gettext as _

from base_app.models.abstract import CreatedAtUpdatedAtModel
from base_app.utils.hash import generate_hash
from project.core_models.storage_backends import PublicMediaStorage


def pet_picture_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'pet_pictures/{instance.pk}/{generate_hash()}.{ext}'


class File(CreatedAtUpdatedAtModel):
    pass


class Picture(File):
    pass


class UserProfilePicture(Picture):
    pass


class PetPicture(Picture):
    file = models.ImageField(
        verbose_name=_('Foto de Perfil'),
        null=True, blank=True, upload_to=pet_picture_path,
        storage=PublicMediaStorage())


class PetFile(File):
    pass


class EventFile(File):
    pass


class EventPicture(Picture):
    pass
