from rest_framework.permissions import BasePermission


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
    def has_object_permission(self, request, view, obj):
        return request.user in obj.pet.owner.all() or \
            request.user in obj.pet.viewer.all()


class PetRetrieveAsViewerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.viewer
