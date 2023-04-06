from dataclasses import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from ..models import Product, Solped, SolpedItem, ShippingAddress, Enterprise, User, Category, SubCategory, CategoryProduct, SubCategoryProduct, MeasurementUnits, Warehouse, CostCenter, SuppliersEvent, ObservationsSolped, PrivateEvent


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


class SolpedItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolpedItem
        fields = '__all__'


class SolpedSerializer(serializers.ModelSerializer):
    solpedItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Solped
        fields = '__all__'

    def get_solpedItems(self, obj):
        items = obj.solpeditem_set.all()
        serializer = SolpedItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


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