# Generated by Django 4.2.5 on 2023-10-07 14:47

import base_app.models.pet
from django.db import migrations, models
import project.core_models.storage_backends


class Migration(migrations.Migration):

    dependencies = [
        ('base_app', '0005_file_pet_breed_pet_species_eventfile_petfile_picture_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='picture',
            field=models.ImageField(blank=True, null=True, storage=project.core_models.storage_backends.PublicMediaStorage(), upload_to=base_app.models.pet.pet_picture_path, verbose_name='Foto de Perfil'),
        ),
        migrations.DeleteModel(
            name='PetPicture',
        ),
    ]
