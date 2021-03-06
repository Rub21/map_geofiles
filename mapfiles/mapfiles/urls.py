from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',{'document_root':settings.MEDIA_ROOT,}),

    url(r'^mapfiles/$', 'app.views.list', name='list'),
    url(r'^mapfiles/proces/$', 'app.views.listdetails', name='listdetails'),
   	url(r'^mapfiles/mapping/$', 'app.views.mapping', name='mapping'),
)