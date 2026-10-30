# The jobs-platform models as the lessons show them. Add fields here when a lesson adds them.
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=200)


class Tag(models.Model):
    name = models.CharField(max_length=50)


class Job(models.Model):
    title = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="jobs")
    tags = models.ManyToManyField(Tag, blank=True)
    is_open = models.BooleanField(default=True)
