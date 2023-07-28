from dataclasses import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Product, Solped, SolpedItem, ShippingAddress, Enterprise, User, Category, SubCategory, MeasurementUnits, Warehouse, CostCenter, SuppliersEvent, ObservationsSolped, Event, Document


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']

    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class EnterpriseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enterprise
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    # reviews = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'


class SolpedSerializer(serializers.ModelSerializer):
    status_name = serializers.SerializerMethodField()
    priority_name = serializers.SerializerMethodField()
    def get_status_name(self, obj):
        status_choices = {
            1: 'Solped Generada',
            2: 'Autorizada',
            3: 'Cotizada',
            4: 'Aprobada',
            5: 'ODC Generada',
            9: 'Cancelada',
        }
        return status_choices.get(obj.status)

    def get_priority_name(self, obj):
        priority_level_CHOICES = {
            1: 'Alta',
            2: 'Media',
            3: 'Baja'
        }
        return priority_level_CHOICES.get(obj.priority_level)
    class Meta:
        model = Solped
        fields = '__all__'


class SolpedItemsSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    documents = DocumentSerializer(source='document_set', many=True, read_only=True)
    class Meta:
        model = SolpedItem
        fields = '__all__'


class ObservationsSolpedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ObservationsSolped
        fields = '__all__'