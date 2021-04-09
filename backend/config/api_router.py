from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from overflowedminds_backend.users.api.views import UserViewSet
from overflowedminds_backend.writings.api.views import WritingsViewSet

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("writings", WritingsViewSet)


app_name = "api"
urlpatterns = router.urls
