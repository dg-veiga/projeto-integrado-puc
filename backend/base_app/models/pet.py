from django.db import models
from django.utils.translation import gettext as _
from base_app.utils.hash import generate_hash
from project.core_models.storage_backends import PublicMediaStorage

# from base_app.models.file import PetPicture

def pet_picture_path(instance, filename):
    ext = filename.split('.')[-1]
    return f'pet_pictures/{instance.pk}/{generate_hash()}.{ext}'


class Pet(models.Model):

    class PetSpecies(models.IntegerChoices):
        DOG = 1, _('Cachorro')
        CAT = 2, _('Gato')

    name = models.CharField(
        verbose_name=_('Título'),
        max_length=255,
        blank=False,
        null=False
    )

    owner = models.ManyToManyField(
        'base_app.User',
        related_name='owners',
        verbose_name=_('Donos'))

    viewer = models.ManyToManyField(
        'base_app.User',
        related_name='viewers',
        verbose_name=_('Amigos interesados'))

    species = models.PositiveSmallIntegerField(
        verbose_name=_('Espécie'),
        choices=PetSpecies.choices,
        blank=False, null=True)
    
    breed = models.CharField(
        verbose_name=_('Raça'),
        max_length=255,
        blank=True,
        null=False,
        default='SRD'
    )

    birth_date = models.DateField(
        verbose_name=_('Data do evento'),
        null=True)

    adoption_date = models.DateField(
        verbose_name=_('Data de adoção'),
        null=True)

    picture = models.ImageField(verbose_name=_('Foto de Perfil'),
                                null=True, blank=True, upload_to=pet_picture_path, 
                                storage=PublicMediaStorage())

    class Meta:
        verbose_name = _('Pet')
        verbose_name_plural = _('Pets')
