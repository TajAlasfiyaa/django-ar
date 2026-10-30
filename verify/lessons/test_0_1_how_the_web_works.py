"""Lesson 0.1: src/content/docs/stage-0/how-the-web-works.mdx"""

from django.conf import settings
from django.http import HttpResponse
from django.test import RequestFactory, SimpleTestCase


class RequestObjectTests(SimpleTestCase):
    def test_request_parts_from_the_url(self):
        request = RequestFactory().get("/jobs/?city=khartoum", headers={"accept-language": "ar"})
        self.assertEqual(request.method, "GET")
        self.assertEqual(request.path, "/jobs/")
        self.assertEqual(request.GET.get("city"), "khartoum")
        self.assertEqual(request.headers["Accept-Language"], "ar")

    def test_response_defaults_to_200(self):
        self.assertEqual(HttpResponse("<h1>الوظائف المتاحة</h1>").status_code, 200)


class SessionCookieTests(SimpleTestCase):
    def test_default_session_cookie(self):
        # The lesson's Set-Cookie line: sessionid=...; HttpOnly; Path=/; SameSite=Lax
        self.assertEqual(settings.SESSION_COOKIE_NAME, "sessionid")
        self.assertIs(settings.SESSION_COOKIE_HTTPONLY, True)
        self.assertEqual(settings.SESSION_COOKIE_PATH, "/")
        self.assertEqual(settings.SESSION_COOKIE_SAMESITE, "Lax")
