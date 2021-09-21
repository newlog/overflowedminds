from django.conf import settings
from django.conf.urls import url
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from overflowedminds_backend.users.api.views import UserViewSet
from overflowedminds_backend.writings.api.views import WritingsViewSet
#from overflowedminds_backend.writings.api.views import like

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

router.register("users", UserViewSet)
router.register("writings", WritingsViewSet)
# router.register('like', like)

app_name = "api"
urlpatterns = router.urls # + [
    #url('like', like)
#]
