from rest_framework.permissions import BasePermission


class OwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return False
        # return request.user in obj.owner.all()


class ViewerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.viewer.all()


class UserRetrieveUpdatePermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj


class PetRetrieveAsOwnerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.owner.all()


class PetRetrieveAsViewerPermission(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user in obj.viewer
