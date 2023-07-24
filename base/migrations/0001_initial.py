# Generated by Django 4.1.3 on 2023-07-23 19:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(db_column='TzemailUsuario', max_length=254, unique=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('first_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('username', models.CharField(default='0', max_length=50)),
                ('phone', models.CharField(blank=True, max_length=20, null=True)),
                ('identification_card', models.CharField(blank=True, db_column='cedula', max_length=10, null=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Area',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('reference_code', models.CharField(max_length=3)),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='CostCenter',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=250)),
                ('budget', models.DecimalField(blank=True, decimal_places=2, max_digits=11, null=True)),
                ('area', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.area')),
                ('request_authorizer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Document',
            fields=[
                ('document', models.FileField(blank=True, null=True, upload_to='')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Enterprise',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('event_title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('view_document', models.BooleanField(default=True)),
                ('can_upload_documents', models.BooleanField(default=True)),
                ('documents', models.FileField(blank=True, null=True, upload_to='')),
                ('icoterms', models.TextField(blank=True, choices=[('EXW', 'EXW Ex Works / En Fábrica'), ('FCA-F', 'FCA Fábrica o Almacén '), ('FCA-T', 'FCA Terminal'), ('CPT', 'CPT Carriage Paid To / Transporte pagado hasta'), ('TIP', 'CIP Carriage and Insurance Paid / Transporte y seguro pagados hasta'), ('DAP', 'DAP Delivered At Place/ Entregado en punto de destino'), ('DPU', 'DPU Delivered at place Unloaded/ Entregado en el lugar de descarga'), ('DDP', 'DDP Delivered Duty Paid/ Entregado con derechos pagados'), ('FAS', 'FAS Free Alongside Ship/ Libre al costado del buque'), ('FOB', 'FOB Free On Board/ Libre a bordo'), ('CFR', 'CFR Cost and Freight/ Coste y Flete'), ('CIF', 'CIF Cost, Insurance and Freight/ Coste, Seguro y Flete')], null=True)),
                ('is_private', models.BooleanField(default=False)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('end_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='MeasurementUnits',
            fields=[
                ('id_measurement_unit', models.AutoField(db_column='T055IdUnidadMedida', editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='T055nombre', max_length=50, unique=True)),
                ('abbreviation', models.CharField(db_column='T055abreviatura', max_length=5, unique=True)),
                ('id_magnitude', models.PositiveSmallIntegerField(choices=[(1, 'Longitud'), (2, 'Volumen'), (3, 'Cantidad'), (4, 'Peso'), (5, 'Superficie'), (6, 'Temperatura'), (7, 'Tiempo')], db_column='T055Id_Magnitud')),
                ('preloaded', models.BooleanField(db_column='T055registroPrecargado', default=False)),
                ('active', models.BooleanField(db_column='T055activo', default=True)),
                ('item_already_used', models.BooleanField(db_column='T055itemYaUsado', default=False)),
            ],
            options={
                'verbose_name': 'Unidad medida',
                'verbose_name_plural': 'Unidades medida',
                'db_table': 'T055UnidadesMedida',
            },
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('tax_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('shipping_price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('delivery_time', models.DateTimeField(blank=True, null=True)),
                ('warranty', models.TextField(blank=True, null=True)),
                ('is_selected', models.BooleanField(default=False)),
                ('selected_date', models.DateTimeField(blank=True, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('brand', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('reference_code', models.CharField(blank=True, max_length=10, null=True)),
                ('is_good', models.BooleanField(default=False)),
                ('is_service', models.BooleanField(default=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.category')),
                ('measurement_unit', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.measurementunits')),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('postal_code', models.CharField(blank=True, max_length=200, null=True)),
                ('country', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Solped',
            fields=[
                ('description', models.TextField()),
                ('resolution_deadline', models.DateField()),
                ('total_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('authorization_date', models.DateTimeField(blank=True, null=True)),
                ('quote_date', models.DateTimeField(blank=True, null=True)),
                ('approval_date', models.DateTimeField(blank=True, null=True)),
                ('odc_date', models.DateTimeField(blank=True, null=True)),
                ('priority_level', models.TextField(choices=[(1, 'Alta'), (2, 'Media'), (3, 'Baja')])),
                ('status', models.IntegerField(blank=True, choices=[(1, 'Solped Generada'), (2, 'Autorizada'), (3, 'Cancelada'), (4, 'Cotizado'), (5, 'Aprobada'), (6, 'ODC Generada')], default=1, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('assigned_negotiator', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='negociador', to=settings.AUTH_USER_MODEL)),
                ('cost_center', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.costcenter')),
                ('creator_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creador', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SolpedItem',
            fields=[
                ('quantity', models.IntegerField(blank=True, default=0, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('unit_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
                ('solped', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.solped')),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('is_principal', models.BooleanField(default=False)),
                ('enterprise', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.enterprise')),
                ('shipping_address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.shippingaddress')),
                ('user_in_charge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SuppliersEvent',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('event', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.event')),
                ('supplier', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SubCategory',
            fields=[
                ('subcategory_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('reference_code', models.CharField(max_length=3)),
                ('name', models.CharField(max_length=255)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.category')),
            ],
        ),
        migrations.CreateModel(
            name='SolpedItemDocument',
            fields=[
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('document', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.document')),
                ('solped_item', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.solpeditem')),
            ],
        ),
        migrations.AddField(
            model_name='solped',
            name='warehouse',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.warehouse'),
        ),
        migrations.AddField(
            model_name='product',
            name='sub_category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.subcategory'),
        ),
        migrations.CreateModel(
            name='OfferItem',
            fields=[
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('unit_price', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('new_brand', models.CharField(blank=True, max_length=255, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('offer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.offer')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
            ],
        ),
        migrations.AddField(
            model_name='offer',
            name='solped',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.solped'),
        ),
        migrations.CreateModel(
            name='ObservationsSolped',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('observation', models.TextField()),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('solped', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.solped')),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='solped',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.solped'),
        ),
        migrations.AddField(
            model_name='area',
            name='enterprise',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.enterprise'),
        ),
        migrations.AddField(
            model_name='user',
            name='area',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.area'),
        ),
        migrations.AddField(
            model_name='user',
            name='enterprise',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.enterprise'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]
