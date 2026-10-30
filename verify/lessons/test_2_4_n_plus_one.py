"""Lesson 2.4: src/content/docs/stage-2/n-plus-one.mdx

Every query count the lesson states, on 10 jobs spread over 5 companies.
"""

from django.core.exceptions import FieldError, FieldFetchBlocked
from django.db import models
from django.test import TestCase

from jobs.models import Company, Job, Tag


def company_names(jobs):
    return [job.company.name for job in jobs]


def tag_names(jobs):
    return [[tag.name for tag in job.tags.all()] for job in jobs]


class NPlusOneTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        companies = [Company.objects.create(name=f"C{i}") for i in range(5)]
        tags = [Tag.objects.create(name=name) for name in ("python", "django", "remote")]
        for i in range(10):
            job = Job.objects.create(title=f"J{i}", company=companies[i % 5])
            job.tags.set(tags[:2])

    # ForeignKey

    def test_plain_loop_is_n_plus_one(self):
        with self.assertNumQueries(11):
            company_names(Job.objects.all())

    def test_select_related(self):
        with self.assertNumQueries(1):
            company_names(Job.objects.select_related("company"))

    def test_fetch_peers(self):
        with self.assertNumQueries(2):
            company_names(Job.objects.fetch_mode(models.FETCH_PEERS))

    def test_fetch_raise(self):
        with self.assertRaisesMessage(FieldFetchBlocked, "Fetching of Job.company blocked."):
            company_names(Job.objects.fetch_mode(models.FETCH_RAISE))

    def test_fetch_raise_on_single_object(self):
        with self.assertRaises(FieldFetchBlocked):
            Job.objects.fetch_mode(models.FETCH_RAISE)[0].company

    def test_fetch_raise_with_select_related(self):
        with self.assertNumQueries(1):
            company_names(Job.objects.fetch_mode(models.FETCH_RAISE).select_related("company"))

    def test_company_id_needs_no_query(self):
        with self.assertNumQueries(1):
            [job.company_id for job in Job.objects.all()]

    def test_company_dot_id_does(self):
        with self.assertNumQueries(11):
            [job.company.id for job in Job.objects.all()]

    # ManyToMany

    def test_plain_m2m_loop(self):
        with self.assertNumQueries(11):
            tag_names(Job.objects.all())

    def test_prefetch_related(self):
        with self.assertNumQueries(2):
            tag_names(Job.objects.prefetch_related("tags"))

    def test_fetch_peers_does_not_cover_m2m(self):
        with self.assertNumQueries(11):
            tag_names(Job.objects.fetch_mode(models.FETCH_PEERS))

    def test_select_related_rejects_m2m(self):
        msg = "Invalid field name(s) given in select_related: 'tags'. Choices are: company"
        with self.assertRaisesMessage(FieldError, msg):
            list(Job.objects.select_related("tags"))

    def test_filter_after_prefetch_queries_again(self):
        with self.assertNumQueries(12):
            [list(job.tags.filter(name="python")) for job in Job.objects.prefetch_related("tags")]

    def test_select_and_prefetch_together(self):
        with self.assertNumQueries(2):
            jobs = Job.objects.select_related("company").prefetch_related("tags")
            company_names(jobs)
            tag_names(jobs)

    # Reverse ForeignKey (company.jobs)

    def test_reverse_fk_plain(self):
        with self.assertNumQueries(6):
            [[job.title for job in company.jobs.all()] for company in Company.objects.all()]

    def test_reverse_fk_prefetch(self):
        with self.assertNumQueries(2):
            companies = Company.objects.prefetch_related("jobs")
            [[job.title for job in company.jobs.all()] for company in companies]

    def test_fetch_peers_does_not_cover_reverse_fk(self):
        with self.assertNumQueries(6):
            companies = Company.objects.fetch_mode(models.FETCH_PEERS)
            [[job.title for job in company.jobs.all()] for company in companies]


class LessonTestExampleTests(TestCase):
    """The test the lesson teaches, run as written (3 jobs, one company)."""

    @classmethod
    def setUpTestData(cls):
        company = Company.objects.create(name="شركة النيل")
        for i in range(3):
            Job.objects.create(title=f"وظيفة {i}", company=company)

    def test_company_names_in_one_query(self):
        with self.assertNumQueries(1):
            for job in Job.objects.select_related("company"):
                job.company.name

    def test_fetch_peers_uses_two_queries(self):
        with self.assertNumQueries(2):
            for job in Job.objects.fetch_mode(models.FETCH_PEERS):
                job.company.name

    def test_plain_loop_is_n_plus_one(self):
        with self.assertNumQueries(4):
            for job in Job.objects.all():
                job.company.name
