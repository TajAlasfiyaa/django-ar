"""Runs the checks behind the lessons against the Django version in requirements.txt.

    python verify/runtests.py                               # every lesson
    python verify/runtests.py lessons.test_2_4_n_plus_one   # one lesson
"""

import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import django
from django.conf import settings

settings.configure(
    INSTALLED_APPS=["jobs"],
    DATABASES={"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}},
    DEFAULT_AUTO_FIELD="django.db.models.BigAutoField",
)
django.setup()

from django.test.runner import DiscoverRunner

print(f"Django {django.get_version()}")
runner = DiscoverRunner(verbosity=2, top_level=str(HERE))
sys.exit(runner.run_tests(sys.argv[1:] or ["lessons"]))
