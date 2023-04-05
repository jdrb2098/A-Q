from django.db import models


magnitudes_CHOICES = (
    (1, 'Longitud'),
    (2, 'Volumen'),
    (3, 'Cantidad'),
    (4, 'Peso'),
    (5, 'Superficie'),
    (6, 'Temperatura'),
    (7, 'Tiempo')
)


class Categoria(models.Model):
    id_categoria = models.CharField(max_length=11, primary_key=True, editable=False)
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre


class UnidadesMedida(models.Model):
    id_unidad_medida = models.AutoField(primary_key=True, editable=False, db_column='T055IdUnidadMedida')
    nombre = models.CharField(max_length=50, db_column='T055nombre',unique=True)
    abreviatura = models.CharField(max_length=5, db_column='T055abreviatura',unique=True)
    id_magnitud = models.PositiveSmallIntegerField(choices=magnitudes_CHOICES, db_column='T055Id_Magnitud')
    precargado = models.BooleanField(default=False, db_column='T055registroPrecargado')
    activo = models.BooleanField(default=True, db_column='T055activo')
    item_ya_usado = models.BooleanField(default=False, db_column='T055itemYaUsado')

    def __str__(self):
        return str(self.nombre)

    class Meta:
        db_table = 'T055UnidadesMedida'
        verbose_name = 'Unidad medida'
        verbose_name_plural = 'Unidades medida'


class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    referenceCode=models.CharField(max_length=200, null=True, blank=True)
    cantidad = models.IntegerField(null=True, blank=True, default=0)
    unidadDeMedida = models.ForeignKey(UnidadesMedida, on_delete=models.SET_NULL, blank=True, null=True)
    valor_unitario = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    is_bien = models.BooleanField(default=False)
    is_service = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name


class SubCategoria(models.Model):
    id_sub_categoria = models.CharField(max_length=11, primary_key=True, editable=False)
    nombre = models.CharField(max_length=255)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)


class CategoriasProducto(models.Model):
    id_categorias_producto = models.AutoField(primary_key=True,editable=False)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    id_producto = models.ForeignKey(Product, on_delete=models.CASCADE)


