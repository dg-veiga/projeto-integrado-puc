from django.db import models
from django.utils.translation import gettext as _


class Pet(models.Model):

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

    birth_date = models.DateField(
        verbose_name=_('Data do evento'),
        null=True)
    
    adoption_date = models.DateField(
        verbose_name=_('Data de adoção'),
        null=True)
    
    class Meta:
        verbose_name = _('Pet')
        verbose_name_plural = _('Pets')
