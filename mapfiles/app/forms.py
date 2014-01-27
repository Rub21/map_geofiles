#encoding:utf-8 
from django.forms import ModelForm
from django import forms


class DocumentForm(forms.Form):
    docfile = forms.FileField(
        label='Select a file',
        help_text='max. 3 megabytes'
    )