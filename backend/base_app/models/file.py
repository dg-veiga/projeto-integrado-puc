from django.db import models
from django.utils.translation import gettext as _

from base_app.models import CreatedAtUpdatedAtModel


class File(CreatedAtUpdatedAtModel):
    pass


class Picture(File):
    pass


class UserProfilePicture(Picture):
    pass


class PetPicture(Picture):
    pass


class PetFile(File):
    pass


class EventFile(File):
    pass


class EventPicture(Picture):
    pass
