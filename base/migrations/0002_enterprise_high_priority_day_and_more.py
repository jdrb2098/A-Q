# Generated by Django 4.1.3 on 2023-08-05 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='enterprise',
            name='high_priority_day',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='enterprise',
            name='low_priority_day',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='enterprise',
            name='medium_priority_day',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='solped',
            name='bill_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='solped',
            name='finish_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='solped',
            name='release_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='solped',
            name='supplier_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='solped',
            name='status',
            field=models.IntegerField(blank=True, choices=[(1, 'Solped Generada'), (2, 'Autorizada'), (3, 'Cotizado'), (4, 'Aprobada'), (5, 'ODC Generada'), (6, 'En Proveedor'), (7, 'Liberar ODC'), (8, 'Facturada'), (9, 'Finalizar ODC'), (10, 'Cancelada'), (11, 'Retorno a Solped')], default=1, null=True),
        ),
    ]
