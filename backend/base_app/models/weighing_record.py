from base_app.models.abstract import CreatedAtUpdatedAtModel
from django.db import models
from django.utils.translation import gettext as _


class WeighingRecord(CreatedAtUpdatedAtModel):

    weight = models.FloatField(
        verbose_name=_('Peso'),
        blank=False,
        null=False
    )

    pet = models.ForeignKey(
        'base_app.Pet',
        verbose_name=_('Pet'),
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )

    observation = models.TextField(
        verbose_name=_('Observação'))

    class Meta:
        verbose_name = _('Registro de pesagem')
        verbose_name_plural = _('Registros de pesagem')
        ordering = ('id', '-created_at',)
