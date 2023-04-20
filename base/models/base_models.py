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


class Category(models.Model):
    category_id = models.AutoField(primary_key=True, editable=False)
    reference_code = models.CharField(max_length=3)
    name = models.CharField(max_length=255)


class SubCategory(models.Model):
    subcategory_id = models.AutoField(primary_key=True, editable=False)
    reference_code = models.CharField(max_length=3)
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class MeasurementUnits(models.Model):
    id_measurement_unit = models.AutoField(primary_key=True, editable=False, db_column='T055IdUnidadMedida')
    name = models.CharField(max_length=50, db_column='T055nombre',unique=True)
    abbreviation = models.CharField(max_length=5, db_column='T055abreviatura',unique=True)
    id_magnitude = models.PositiveSmallIntegerField(choices=magnitudes_CHOICES, db_column='T055Id_Magnitud')
    preloaded = models.BooleanField(default=False, db_column='T055registroPrecargado')
    active = models.BooleanField(default=True, db_column='T055activo')
    item_already_used = models.BooleanField(default=False, db_column='T055itemYaUsado')

    def __str__(self):
        return str(self.name)

    class Meta:
        db_table = 'T055UnidadesMedida'
        verbose_name = 'Unidad medida'
        verbose_name_plural = 'Unidades medida'


# el cliente nunca va a usar el precio del producto, solo si lo compró antes, o sea que el producto no debería tener precio, sino el precio se define es en el histórico de compra ?
class Product(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    # price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    reference_code = models.CharField(max_length=10, editable=True, null=True, blank=True)  #Solo se pueden agregar 4 caraccteres
    # quantity = models.IntegerField(null=True, blank=True, default=0)
    measurement_unit = models.ForeignKey(MeasurementUnits, on_delete=models.CASCADE, blank=True, null=True)
    # unit_price = models.DecimalField(max_digits=9, decimal_places=2, null=True, blank=True)
    is_good = models.BooleanField(default=False)
    is_service = models.BooleanField(default=False)

    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, blank=True, null=True)
    product_id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    