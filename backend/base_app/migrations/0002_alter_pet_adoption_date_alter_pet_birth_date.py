# Generated by Django 4.1.9 on 2023-09-28 02:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pet',
            name='adoption_date',
            field=models.DateField(null=True, verbose_name='Data de adoção'),
        ),
        migrations.AlterField(
            model_name='pet',
            name='birth_date',
            field=models.DateField(null=True, verbose_name='Data do evento'),
        ),
    ]