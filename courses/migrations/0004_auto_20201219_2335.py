# Generated by Django 3.1.3 on 2020-12-19 20:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('courses', '0003_auto_20201219_1744'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Catergory',
        ),
        migrations.AddField(
            model_name='course',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.category'),
        ),
    ]
