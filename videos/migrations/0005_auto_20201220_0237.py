# Generated by Django 3.1.3 on 2020-12-19 23:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('categories', '0001_initial'),
        ('videos', '0004_auto_20201219_1944'),
    ]

    operations = [
        migrations.AlterField(
            model_name='video',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='categories.category'),
        ),
        migrations.DeleteModel(
            name='Catergory',
        ),
    ]
