#encoding:utf-8
from django.db import models
from django.contrib.auth.models import User

class Document(models.Model):
	#docfile = models.FileField(upload_to='documents/%Y/%m/%d')
    docfile = models.FileField(upload_to='files')
    def __unicode__(self):
	return self.docfile.name 

