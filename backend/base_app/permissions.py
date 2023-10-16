from rest_framework.permissions import BasePermission
from base_app.models import Pet

class OwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.owner.all()


class ViewerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.viewer.all()


class UserRetrieveUpdatePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj


class EventRetrievePermission(BasePermission):
    def has_permission(self, request, view):
        if view.action == 'create':
            pet = Pet.objects.get(pk=request.data['pet'])
            return request.user in pet.owner.all()
        return super().has_permission(request, view)
    
    def has_object_permission(self, request, view, obj):
        return request.user in obj.pet.owner.all() or \
            request.user in obj.pet.viewer.all()


class PetRetrieveAsViewerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.viewer
