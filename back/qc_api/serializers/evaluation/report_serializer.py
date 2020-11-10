""" Serialization utils for report model."""
from rest_framework import serializers
from qc_api.models.evaluation.report import Report


class ReportSerializer(serializers.ModelSerializer):
    """ Serializer for Report Model"""
    class Meta:
        model = Report
        fields = '__all__'
        read_only_fields = '__all__'