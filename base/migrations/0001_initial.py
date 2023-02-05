# Generated by Django 4.1.3 on 2023-02-05 02:44

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
                ('username', models.CharField(default='0', max_length=50)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Bodegas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=200)),
                ('is_principal', models.BooleanField(default=False)),
                ('direccion', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Categoria',
            fields=[
                ('id_categoria', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='CentroCostos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=250)),
                ('presupuesto', models.DecimalField(blank=True, decimal_places=2, max_digits=11, null=True)),
                ('autorizador_solicitudes', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Enterprise',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('description', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Evento_Proveedores',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titulo_evento', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('ver_documento', models.BooleanField(default=True)),
                ('puede_cargar_documentos', models.BooleanField(default=True)),
                ('documentos', models.FileField(blank=True, null=True, upload_to='')),
                ('icoterms', models.TextField(blank=True, choices=[('EXW', 'EXW Ex Works / En Fábrica'), ('FCA-F', 'FCA Fábrica o Almacén '), ('FCA-T', 'FCA Terminal'), ('CPT', 'CPT Carriage Paid To / Transporte pagado hasta'), ('TIP', 'CIP Carriage and Insurance Paid / Transporte y seguro pagados hasta'), ('DAP', 'DAP Delivered At Place/ Entregado en punto de destino'), ('DPU', 'DPU Delivered at place Unloaded/ Entregado en el lugar de descarga'), ('DDP', 'DDP Delivered Duty Paid/ Entregado con derechos pagados'), ('FAS', 'FAS Free Alongside Ship/ Libre al costado del buque'), ('FOB', 'FOB Free On Board/ Libre a bordo'), ('CFR', 'CFR Cost and Freight/ Coste y Flete'), ('CIF', 'CIF Cost, Insurance and Freight/ Coste, Seguro y Flete')], null=True)),
                ('is_private', models.BooleanField(default=False)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_finalizacion', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('image', models.ImageField(blank=True, default='/placeholder.png', null=True, upload_to='')),
                ('brand', models.CharField(blank=True, max_length=200, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('referenceCode', models.CharField(blank=True, max_length=200, null=True)),
                ('cantidad', models.IntegerField(blank=True, default=0, null=True)),
                ('valor_unitario', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('is_bien', models.BooleanField(default=False)),
                ('is_service', models.BooleanField(default=False)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('categoria', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='Solped',
            fields=[
                ('descripcion', models.TextField()),
                ('fecha_limite_resolucion', models.DateField()),
                ('totalPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('is_Autorized', models.BooleanField(default=False)),
                ('fachaDeAtorizacion', models.DateTimeField(blank=True, null=True)),
                ('nivel_prioridad', models.TextField(choices=[(1, 'Alta'), (2, 'Media'), (3, 'Baja')])),
                ('is_cancelada', models.BooleanField(default=False)),
                ('documento', models.FileField(blank=True, null=True, upload_to='')),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('bodega', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.bodegas')),
                ('centro_de_costos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.centrocostos')),
                ('negociador_asignado', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='negociador', to=settings.AUTH_USER_MODEL)),
                ('usuario_creador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='creador', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='UnidadesMedida',
            fields=[
                ('id_unidad_medida', models.AutoField(db_column='T055IdUnidadMedida', editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(db_column='T055nombre', max_length=50, unique=True)),
                ('abreviatura', models.CharField(db_column='T055abreviatura', max_length=5, unique=True)),
                ('id_magnitud', models.PositiveSmallIntegerField(choices=[(1, 'Longitud'), (2, 'Volumen'), (3, 'Cantidad'), (4, 'Peso'), (5, 'Superficie'), (6, 'Temperatura'), (7, 'Tiempo')], db_column='T055Id_Magnitud')),
                ('precargado', models.BooleanField(db_column='T055registroPrecargado', default=False)),
                ('activo', models.BooleanField(db_column='T055activo', default=True)),
                ('item_ya_usado', models.BooleanField(db_column='T055itemYaUsado', default=False)),
            ],
            options={
                'verbose_name': 'Unidad medida',
                'verbose_name_plural': 'Unidades medida',
                'db_table': 'T055UnidadesMedida',
            },
        ),
        migrations.CreateModel(
            name='SubCategoria',
            fields=[
                ('id_subcategoria', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.categoria')),
            ],
        ),
        migrations.CreateModel(
            name='SolpedItem',
            fields=[
                ('name', models.CharField(blank=True, max_length=200, null=True)),
                ('qty', models.IntegerField(blank=True, default=0, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('image', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.product')),
                ('solped', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.solped')),
            ],
        ),
        migrations.CreateModel(
            name='ShippingAddress',
            fields=[
                ('address', models.CharField(blank=True, max_length=200, null=True)),
                ('city', models.CharField(blank=True, max_length=200, null=True)),
                ('postalCode', models.CharField(blank=True, max_length=200, null=True)),
                ('country', models.CharField(blank=True, max_length=200, null=True)),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('cedula', models.CharField(blank=True, max_length=10, null=True)),
                ('numeroTelefonico', models.CharField(blank=True, max_length=15, null=True)),
                ('solped', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='base.solped')),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='unidadDeMedida',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.unidadesmedida'),
        ),
        migrations.CreateModel(
            name='Oferta',
            fields=[
                ('taxPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('shippingPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=7, null=True)),
                ('totalPrice', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('tiempoDeEntrega', models.DateTimeField(blank=True, null=True)),
                ('garantia', models.TextField(blank=True, null=True)),
                ('marca', models.CharField(blank=True, max_length=200, null=True)),
                ('_id', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('solped', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='base.solped')),
            ],
        ),
        migrations.CreateModel(
            name='ObservacionesSolped',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_de_creacion', models.DateTimeField(auto_now_add=True)),
                ('Observacion', models.TextField()),
                ('owner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('solped', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='base.solped')),
            ],
        ),
        migrations.CreateModel(
            name='HistoricoDeCompra',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre_material', models.CharField(max_length=255)),
                ('codigo_material', models.CharField(max_length=50)),
                ('precio_unitario', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('precio_total', models.DecimalField(blank=True, decimal_places=2, max_digits=9, null=True)),
                ('proveedor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='EventoPrivado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('evento', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='base.evento_proveedores')),
                ('preveedor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='evento_proveedores',
            name='solped',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.solped'),
        ),
        migrations.AddField(
            model_name='centrocostos',
            name='empresa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.enterprise'),
        ),
        migrations.CreateModel(
            name='CategoriasProducto',
            fields=[
                ('id_categorias_producto', models.AutoField(editable=False, primary_key=True, serialize=False)),
                ('id_categoria', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.categoria')),
                ('id_producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.product')),
            ],
        ),
        migrations.AddField(
            model_name='bodegas',
            name='empresa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.enterprise'),
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
