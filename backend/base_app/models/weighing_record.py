from base_app.models.abstract import CreatedAtUpdatedAtModel
from django.db import models
from django.utils.translation import gettext as _


class WeighingRecord(CreatedAtUpdatedAtModel):

    pet = models.ForeignKey(
        'base_app.Pet',
        verbose_name=_('Pet'),
        on_delete=models.CASCADE,
        blank=False,
        null=False
    )

    weight = models.FloatField(
        verbose_name=_('Peso'),
        blank=False,
        null=False
    )

    date = models.DateField(
        verbose_name=_('Data do evento'),
        auto_now=False,
        blank=False,
        null=True)

    observation = models.TextField(
        verbose_name=_('Observação'),
        blank=True,
        null=True)

    class Meta:
        verbose_name = _('Registro de pesagem')
        verbose_name_plural = _('Registros de pesagem')
        ordering = ('pet', '-created_at',)
