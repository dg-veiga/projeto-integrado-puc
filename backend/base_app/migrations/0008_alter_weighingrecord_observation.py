# Generated by Django 4.2.5 on 2023-10-07 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_app', '0007_alter_weighingrecord_options_weighingrecord_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weighingrecord',
            name='observation',
            field=models.TextField(blank=True, null=True, verbose_name='Observação'),
        ),
    ]
