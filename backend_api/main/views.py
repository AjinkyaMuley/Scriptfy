from django.shortcuts import render
from rest_framework import generics,permissions,pagination,viewsets
from . import serializers
from . import models

from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models import Count
from django.contrib.auth.hashers import make_password
# Create your views here.

class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorSerializer


class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer

@csrf_exempt
def vendor_register(request):

    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    address = request.POST.get('address')
    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            password=password
        )

        if user:
            # Create Customer
            try:
                vendor = models.Vendor.objects.create(
                    user=user,
                    mobile=mobile,
                    address = address
                )
                msg={
                    'bool' : True,
                    'user' : user.id,
                    'vendor' : vendor.id,
                    'msg' : 'Thank You for registering. You can login now.'
                }
            except IntegrityError:
                msg={
                    'bool' : False,
                    'msg' : 'Mobile already exists'
                }
        else:
            msg={
                'bool' : False,
                'msg' : 'Oops... Something went wrong'
            }

    except IntegrityError:
        msg={
            'bool' : False,
            'msg' : 'Email or username already exists'
        }

    return JsonResponse(msg)


@csrf_exempt
def vendor_change_password(request,vendor_id):
    password = request.POST.get('password')
    vendor = models.Vendor.objects.get(id=vendor_id)
    user = vendor.user
    user.password = make_password(password)
    user.save()

    msg = {'bool' : True , 'msg' : 'Password Updated'}
    
    return JsonResponse(msg)

@csrf_exempt
def vendor_login(request):

    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username,password=password)

    if user:
        vendor = models.Vendor.objects.get(user=user)
        msg={
            'bool' : True,
            'user' : user.username,
            'id' : vendor.id,
        }
    else:
        msg={
            'bool' : False,
            'msg' : 'Invalid username or password'
        }

    return JsonResponse(msg)


class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get('category')  # Use .get() to avoid KeyError
        if category_id:
            try:
                category = models.ProductCategory.objects.get(id=category_id)
                qs = qs.filter(category=category)
            except models.ProductCategory.DoesNotExist:
                qs = qs.none()  # Return empty queryset if category does not exist

        if 'fetch_limit' in self.request.GET:
            limit = int(self.request.GET['fetch_limit'])
            qs = qs.order_by('-id')[:limit]
        return qs


class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer
    

class ProductImgsDetail(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['product_id']
        qs = qs.filter(product__id = product_id)
        return qs


class ProductImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class = serializers.ProductImageSerializer

class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag = self.kwargs['tag']
        qs = qs.filter(tags__icontains=tag)
        return qs
    
class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination
    page_size = 10

    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        prodcut = models.Product.objects.get(id=product_id)
        qs = qs.filter(category=prodcut.category).exclude(id=product_id)
        return qs


class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer


# Customers


class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

@csrf_exempt
def customer_login(request):

    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username,password=password)

    if user:
        customer = models.Customer.objects.get(user=user)
        msg={
            'bool' : True,
            'user' : user.username,
            'id' : customer.id,
        }
    else:
        msg={
            'bool' : False,
            'msg' : 'Invalid username or password'
        }

    return JsonResponse(msg)



@csrf_exempt
def customer_change_password(request,customer_id):
    password = request.POST.get('password')
    customer = models.Customer.objects.get(id=customer_id)
    user = customer.user
    user.password = make_password(password)
    user.save()

    msg = {'bool' : True , 'msg' : 'Password Updated'}
    
    return JsonResponse(msg)

@csrf_exempt
def customer_register(request):

    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    username = request.POST.get('username')
    password = request.POST.get('password')

    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            username=username,
            password=password
        )

        if user:
            # Create Customer
            try:
                customer = models.Customer.objects.create(
                    user=user,
                    mobile=mobile
                )
                msg={
                    'bool' : True,
                    'user' : user.id,
                    'customer' : customer.id,
                    'msg' : 'Thank You for registering. You can login now.'
                }
            except IntegrityError:
                msg={
                    'bool' : False,
                    'msg' : 'Mobile already exists'
                }
        else:
            msg={
                'bool' : False,
                'msg' : 'Oops... Something went wrong'
            }

    except IntegrityError:
        msg={
            'bool' : False,
            'msg' : 'Email or username already exists'
        }

    return JsonResponse(msg)


# Orders

class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

    def post(self, request, *args, **kwargs):
        # Print all the data sent in the request
        print(request.data)  # This should show the 'customer' data and other fields
        return super().post(request, *args, **kwargs)
    
#   Order Items
class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer


class CustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(order__customer__id=customer_id)
        return qs



class VendorOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs


class VendorCustomerList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs = qs.filter(product__vendor__id=vendor_id)
        return qs

class VendorProductList(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs = qs.filter(vendor__id=vendor_id)
        return qs


class VendorCustomerOrderList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['vendor_id']
        customer_id = self.kwargs['customer_id']
        qs = qs.filter(order__customer__id=customer_id,product__vendor__id = vendor_id)
        return qs


class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id = self.kwargs['pk']
        order = models.Order.objects.get(id=order_id)
        order_items = models.OrderItems.objects.filter(order=order)
        return order_items
    

class CustomerAddressViewSets(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAddressSerializer
    queryset = models.CustomerAddress.objects.all()

    
    

class ProductRatingViewSets(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = models.ProductRating.objects.all()



class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer


class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer


class OrderModify(generics.RetrieveUpdateAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer


@csrf_exempt
def update_order_status(request,order_id):
    if request.method == 'POST':
        updateRes=models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool' : False,
        }

        if updateRes:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)


@csrf_exempt
def update_product_download_count(request,product_id):
    if request.method == 'POST':
        product = models.Product.objects.get(id=product_id)
        product.downloads += 1
        updateRes=models.Product.objects.filter(id=product_id).update(downloads=product.downloads)
        msg={
            'bool' : False,
        }

        if updateRes:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)


#   WishList
class WishList(generics.ListCreateAPIView):
    queryset = models.WishList.objects.all()
    serializer_class = serializers.WishListSerializer


@csrf_exempt
def check_in_wishlist(request):
    if request.method == 'POST':
        product_id = request.POST.get('product')
        customer_id = request.POST.get('customer')
        checkWishList = models.WishList.objects.filter(product__id=product_id,customer__id=customer_id).count()

        msg={
            'bool' : False,
        }
        if checkWishList > 0:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)

class CustomerWishItemList(generics.ListAPIView):
    queryset = models.WishList.objects.all()
    serializer_class = serializers.WishListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id)
        return qs
    


@csrf_exempt
def remove_from_wishlist(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlist_id')
        res = models.WishList.objects.filter(id=wishlist_id).delete()

        msg={
            'bool' : False,
        }
        if res:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)

class CustomerAddressList(generics.ListAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id).order_by('id')
        return qs


@csrf_exempt
def mark_default_address(request,pk):
    if request.method == 'POST':
        address_id = request.POST.get('address_id')
        models.CustomerAddress.objects.update(default_address=False)
        res = models.CustomerAddress.objects.filter(id=address_id).update(default_address=True)

        msg={
            'bool' : False,
        }
        if res:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)


@csrf_exempt
def customer_dashboard(request, pk):
    customer_id = pk
    totalAddress = models.CustomerAddress.objects.filter(customer__id=customer_id).count()
    totalOrders = models.Order.objects.filter(customer__id=customer_id).count()
    totalWishList = models.WishList.objects.filter(customer__id=customer_id).count()

    msg = {
        'totalAddress': totalAddress,
        'totalWishList': totalWishList,
        'totalOrders': totalOrders,
    }
    return JsonResponse(msg)


@csrf_exempt
def deleteCustomerOrders(request, customer_id):
    if request.method == 'DELETE':
        orders = models.Order.objects.filter(customer__id=customer_id).delete()

        msg={
            'bool' : False,
        }
        if orders:
            msg = {
                'bool': True,
            }

    return JsonResponse(msg)


@csrf_exempt
def vendor_dashboard(request, pk):
    vendor_id = pk
    totalProducts = models.Product.objects.filter(vendor__id=vendor_id).count()
    totalOrders = models.OrderItems.objects.filter(product__vendor__id=vendor_id).count()
    totalCustomers = models.OrderItems.objects.filter(product__vendor__id=vendor_id).values('order__customer').count()

    msg = {
        'totalProducts': totalProducts,
        'totalCustomers': totalCustomers,
        'totalOrders': totalOrders,
    }
    return JsonResponse(msg)