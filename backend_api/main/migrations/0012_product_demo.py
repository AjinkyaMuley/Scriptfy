# Generated by Django 5.1.1 on 2024-09-14 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_product_image_product_slug_product_tags_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='demo',
            field=models.URLField(blank=True, null=True),
        ),
    ]
