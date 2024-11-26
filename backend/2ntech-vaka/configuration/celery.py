from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Django'nun ayarlarını kullanmak için Django'nun settings modülünü ayarlayın
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'myproject.settings')

app = Celery('myproject')

# Celery ayarlarını Django settings'ten alacak şekilde yapılandırın
app.config_from_object('django.conf:settings', namespace='CELERY')

# Django uygulamalarındaki görevleri keşfedin
app.autodiscover_tasks()
