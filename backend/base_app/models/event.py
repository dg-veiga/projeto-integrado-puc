from base_app.models import CreatedAtUpdatedAtModel
from django.db import models
from django.utils.translation import gettext as _


class EventType(models.IntegerChoices):
    REGULAR = 1, _('Regular event')
    HEALTH = 2, _('Health event')
    MEDICAL_APPOINTMENT = 3, _('Medical appointment')
    VACCINE = 4, _('Vaccine')
    __empty__ = _('Unknown')


class Event(CreatedAtUpdatedAtModel):

    title = models.CharField(
        verbose_name=_('Título'),
        max_length=255,
        blank=False,
        null=False
    )

    category = models.PositiveSmallIntegerField(
        verbose_name=_('Categoria de evento'),
        choices=EventType.choices,
        blank=False, default=EventType.REGULAR)

    description = models.TextField(
        verbose_name=_('Descrição'))

    event_date = models.DateField(
        verbose_name=_('Data do evento'),
        auto_now=True,
        null=True)

    event_time = models.TimeField(
        verbose_name=_('Hora do evento'),
        auto_now=True,
        null=True)

    class Meta:
        verbose_name = _('Evento')
        verbose_name_plural = _('Eventos')
        ordering = ('-created_at',)
