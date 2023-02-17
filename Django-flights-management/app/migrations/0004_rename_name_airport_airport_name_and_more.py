# Generated by Django 4.1.7 on 2023-02-16 17:17

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_airport_remove_flight_airline_company_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='airport',
            old_name='name',
            new_name='airport_name',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='city',
            new_name='city_name',
        ),
        migrations.RenameField(
            model_name='airport',
            old_name='country',
            new_name='country_name',
        ),
        migrations.RemoveField(
            model_name='airport',
            name='code',
        ),
        migrations.AddField(
            model_name='airport',
            name='airport_code',
            field=models.CharField(default=None, max_length=3, validators=[django.core.validators.RegexValidator('^[A-Z]*$', 'Only uppercase letters allowed.')]),
            preserve_default=False,
        ),
    ]