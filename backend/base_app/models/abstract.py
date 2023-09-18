from django.db import models
from django.utils.translation import gettext as _


class CreatedAtUpdatedAtModel(models.Model):

    created_at = models.DateTimeField(
        verbose_name=_('Data de Criação'),
        auto_now_add=True,
        null=True)

    updated_at = models.DateTimeField(
        verbose_name=_('Última alteração'),
        auto_now=True,
        null=True)

    class Meta:
        abstract = True
