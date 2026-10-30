# خطة منهج تعليم Django بالعربية

هذا الملف هو المرجع المشترك للمنهج: ترتيب الدروس، ومحتوى كل درس، وملفات الوثائق التي يعتمد عليها. قبل أن تكتب درساً، ابحث عنه هنا. وإذا أردت تغيير ترتيب أو إضافة درس، فاقترح ذلك في issue أولاً.

## الرؤية والقرارات المحسومة

موقع عربي مجاني يأخذ مطوّر Python من أول مشروع Django حتى نشر تطبيق حقيقي في الإنتاج، ومرجعه وثائق Django 6.1 الرسمية.

| القرار | الاختيار | السبب |
| --- | --- | --- |
| الجمهور | يعرف أساسيات Python | لا نكرر كورس Python، نسد الفجوات فقط |
| شكل المحتوى | نص مكتوب مع رسومات | النص أسهل في البحث والتحديث، والرسم يشرح ما يصعب شرحه بالكلام |
| التسعير | مجاني بالكامل | لا حسابات ولا دفع عند الإطلاق |
| نسخة المرجع | Django 6.1 (فرع `stable/6.1.x`، آخر إصدار 6.1.2) | فرع `main` هو 6.2 alpha وقد يتغير |
| نسخة Python | 3.12 أو أحدث | Django 6.1 يدعم Python من 3.12 إلى 3.15 |
| لغة الكتابة | الشرح بالعربية، الكود والمصطلحات بالإنجليزية | الطالب سيقرأ الوثائق والأخطاء بالإنجليزية |
| منصة الموقع | Astro Starlight | اجتاز كل متطلبات قسم «الموقع التقني» |
| الرخصة | الدروس CC BY-SA 4.0، والكود MIT | أي شخص يعيد استخدام الدروس بشرط ذكر المصدر ونشر تعديله بنفس الرخصة |
| المساهمات | مفتوحة عبر Pull Requests من البداية | الطريقة في `CONTRIBUTING.md` |

المرجع الهيكلي: كورس The Ultimate Django من Mosh (على Django 3.2). نأخذ منه الترتيب فقط، والشرح والأمثلة من تأليفنا.

## مبادئ المنهج

ستة مبادئ تحكم كل درس، وأي درس يخالفها يُعاد تصميمه.

1. **مشروع واحد مستمر.** الطالب يبني تطبيقاً واحداً يكبر مع كل مرحلة، بدل أمثلة متفرقة لا ترتبط ببعضها.
2. **كل درس مربوط بمصدره.** كل درس يذكر مسار ملف الوثائق الذي اعتمد عليه ونسخة Django، مثل `topics/db/queries.txt` على 6.1.
3. **الاختبارات من البداية.** كل مرحلة تضيف اختبارات لما بنته، بدل قسم اختبارات منفصل في النهاية.
4. **Django التقليدي أولاً.** القوالب والـ Forms والـ CBVs تُشرح بعمق قبل أي REST API.
5. **الحديث هو الأساس.** نشرح الطريقة الحالية في 6.1 مباشرة (مثل `MAILERS` وإطار Tasks)، ونذكر الطريقة القديمة فقط لأن الطالب سيراها في مشاريع قديمة.
6. **العربية ميزة، ليست ترجمة.** المشروع نفسه عربي، فيتعلم الطالب i18n وRTL عملياً لا نظرياً.

## المشروع المستمر: منصة وظائف عربية

المقترح منصة وظائف عربية يبنيها الطالب من المرحلة 1 حتى النشر، لأنها تحتاج تقريباً كل ميزات Django. هذا مقترح لم يُحسم بعد.

لماذا ليس متجراً مثل Mosh؟ المتجر مكرر في أغلب الكورسات. أما المنصة فتفرض مواضيع مهمة بشكل طبيعي:

- نوعان من المستخدمين (باحث وشركة): Custom User Model وصلاحيات.
- رفع السيرة الذاتية: رفع الملفات والتحقق منها.
- إشعار الشركة عند التقديم: البريد والمهام الخلفية.
- البحث في الوظائف بالعربية: البحث النصي والفهارس.
- واجهة بلغتين: i18n وRTL.

| المرحلة | ما يصبح عليه المشروع في نهايتها |
| --- | --- |
| 0 · التمهيد | لا مشروع بعد: الطالب جاهز بأدواته ويفهم الويب |
| 1 · مبتدئ | قائمة وظائف وصفحة تفاصيل، تُدار من لوحة الإدارة |
| 2 · متوسط | الباحث والشركة يسجّلان، والوظائف تُنشر ويُقدَّم عليها، مع بحث وتصفية |
| 3 · متقدم | رفع السير الذاتية، إشعارات في الخلفية، واجهة عربية وإنجليزية |
| 4 · احتراف | منشورة على خادم حقيقي، مع API |

كل مرحلة تضيف للمشروع نفسه، فلا يعود الطالب للصفر أبداً.

## المرحلة 0 — التمهيد

الهدف: سد الفجوات التي يتعثر بها من يعرف Python ولا يعرف الويب، في 5 دروس قصيرة. الطالب الذي يعرف هذه المواضيع يتجاوزها.

| # | الدرس | ما يتعلمه الطالب | المرجع |
| --- | --- | --- | --- |
| 0.1 | كيف يعمل الويب | الطلب والرد، طرق HTTP، أكواد الحالة، الـ cookies | مصدر خارجي |
| 0.2 | بيئة العمل | Python 3.12+، venv، pip، المحرر، التثبيت على Windows | `intro/install.txt`، `topics/install.txt`، `howto/windows.txt` |
| 0.3 | git الأساسي | commit، branch، الرفع إلى GitHub | مصدر خارجي |
| 0.4 | Python الذي يحتاجه Django | الكلاسات والوراثة، `super()`، الـ decorators، `*args` و`**kwargs` | وثائق Python |
| 0.5 | HTML بقدر الحاجة | العناصر الأساسية، النماذج (forms)، `dir="rtl"` | مصدر خارجي |

درس 0.4 هو الأهم: كل model كلاس، وكل class-based view وراثة، و`@login_required` مثال على الـ decorators.

## المرحلة 1 — مبتدئ

الهدف: أول نسخة تعمل من المنصة، قائمة وظائف وصفحة تفاصيل تُدار من لوحة الإدارة، في 12 درساً.

| # | الدرس | ما يتعلمه الطالب | المرجع |
| --- | --- | --- | --- |
| 1.1 | ما هو Django | معمارية MTV، رحلة الطلب داخل Django (رسم) | `intro/overview.txt` |
| 1.2 | أول مشروع وأول تطبيق | `startproject`، `startapp`، هيكل الملفات، `runserver` | `intro/tutorial01.txt`، `ref/django-admin.txt` |
| 1.3 | Custom User Model من البداية | خطوة جاهزة الآن، والشرح الكامل في المرحلة 2 | `topics/auth/customizing.txt` |
| 1.4 | الـ views والـ URLs | دالة view، `path()`، المتغيرات في الرابط، `include()` | `topics/http/views.txt`، `topics/http/urls.txt` |
| 1.5 | القوالب | المتغيرات، الوسوم، الفلاتر، وراثة القوالب | `topics/templates.txt`، `ref/templates/language.txt` |
| 1.6 | الملفات الثابتة | CSS والصور أثناء التطوير | `howto/static-files/index.txt` |
| 1.7 | أول الـ Models | الحقول الأساسية، choices، `__str__` | `topics/db/models.txt`، `ref/models/fields.txt` |
| 1.8 | العلاقات | `ForeignKey`، `ManyToManyField`، `OneToOneField` | `topics/db/models.txt`، `topics/db/examples` |
| 1.9 | الـ migrations | الإنشاء، التطبيق، التراجع، قراءة ملف migration | `topics/migrations.txt` |
| 1.10 | الـ shell وأول الاستعلامات | استيراد الـ models تلقائياً (منذ 5.2)، `all()`، `filter()`، `get()` | `intro/tutorial02.txt`، `topics/db/queries.txt` |
| 1.11 | لوحة الإدارة | التسجيل، `list_display`، البحث، الفلاتر | `ref/contrib/admin/index.txt`، `intro/tutorial07.txt` |
| 1.12 | أول اختبار وأدوات التشخيص | `TestCase`، صفحة الأخطاء، Django Debug Toolbar | `intro/tutorial05.txt`، `topics/testing/overview.txt` |

درس 1.3 مبكر عن قصد: الوثائق تنصح بـ Custom User Model قبل أول migration، وتغييره لاحقاً صعب.

## المرحلة 2 — متوسط

الهدف: منصة يسجّل فيها الباحث والشركة، وتُنشر فيها الوظائف ويُقدَّم عليها. هذه أكبر مرحلة (20 درساً)، والـ ORM وحده ثمانية دروس لأنه قلب Django.

| # | الدرس | ما يتعلمه الطالب | المرجع |
| --- | --- | --- | --- |
| 2.1 | QuerySets والـ Managers | متى يُنفَّذ الاستعلام (lazy)، كاش الـ QuerySet (رسم) | `topics/db/queries.txt`، `ref/models/querysets.txt` |
| 2.2 | الفلترة المتقدمة | field lookups، كائنات `Q` و`F` | `ref/models/querysets.txt`، `ref/models/expressions.txt` |
| 2.3 | الترتيب واختيار الحقول | `order_by`، التقطيع، `values`، `only`، `defer` | `ref/models/querysets.txt` |
| 2.4 | مشكلة N+1 | `select_related`، `prefetch_related`، وFetch modes الجديدة في 6.1 | `topics/db/fetch-modes.txt`، `topics/db/optimization.txt` |
| 2.5 | التجميع والتلخيص | `aggregate`، `annotate`، دوال قاعدة البيانات | `topics/db/aggregation.txt`، `ref/models/database-functions.txt` |
| 2.6 | الكتابة في قاعدة البيانات | الإنشاء، التعديل، الحذف، الـ transactions | `topics/db/queries.txt`، `topics/db/transactions.txt` |
| 2.7 | ميزات الـ Models الحديثة | `GeneratedField`، `db_default`، الـ constraints، `on_delete` على مستوى قاعدة البيانات | `ref/models/fields.txt`، `ref/models/constraints.txt` |
| 2.8 | Custom Managers | استعلامات متكررة في مكان واحد، مثل الوظائف المفتوحة فقط | `topics/db/managers.txt` |
| 2.9 | Forms | التعريف، التحقق، العرض، رسائل الأخطاء | `topics/forms/index.txt`، `ref/forms/validation.txt` |
| 2.10 | ModelForms وFormsets | نموذج من model، عدة نماذج في صفحة | `topics/forms/modelforms.txt`، `topics/forms/formsets.txt` |
| 2.11 | Class-based views | من الدالة إلى الكلاس ولماذا | `topics/class-based-views/intro.txt` |
| 2.12 | Generic views | List، Detail، Create، Update، Delete | `topics/class-based-views/generic-display.txt`، `generic-editing.txt` |
| 2.13 | Mixins | إعادة استخدام السلوك بين الـ views | `topics/class-based-views/mixins.txt` |
| 2.14 | التقسيم إلى صفحات | `Paginator`، وسم `{% querystring %}` (منذ 5.1) | `topics/pagination.txt`، `ref/templates/builtins.txt` |
| 2.15 | Sessions وMessages | حفظ حالة المستخدم، رسائل "تم الحفظ" | `topics/http/sessions.txt`، `ref/contrib/messages.txt` |
| 2.16 | المصادقة | التسجيل، الدخول، الخروج، استعادة كلمة المرور | `topics/auth/default.txt` |
| 2.17 | Custom User Model بالتفصيل | نوعا المستخدم، الملفات الشخصية (profiles) | `topics/auth/customizing.txt` |
| 2.18 | الصلاحيات | المجموعات، الصلاحيات المخصصة، `LoginRequiredMiddleware` (منذ 5.1) | `topics/auth/default.txt`، `ref/middleware.txt` |
| 2.19 | الاختبارات بعمق | الـ test client، fixtures، اختبار النماذج والصلاحيات | `topics/testing/tools.txt`، `topics/testing/overview.txt` |
| 2.20 | لوحة الإدارة المتقدمة | actions، facet filters (منذ 5.0)، inlines | `ref/contrib/admin/actions.txt`، `ref/contrib/admin/filters.txt` |

درس 2.4 يستحق عناية خاصة: مشكلة N+1 أشهر مشكلة أداء في Django، وFetch modes الجديدة في 6.1 تحل أغلب حالاتها بسطر واحد، فالدرس يشرح الطريقتين ومتى نستخدم كلاً منهما.

## المرحلة 3 — متقدم

الهدف: منصة ترفع السير الذاتية، وترسل الإشعارات في الخلفية، وتعمل بالعربية والإنجليزية، وتبقى سريعة وآمنة، في 17 درساً.

| # | الدرس | ما يتعلمه الطالب | المرجع |
| --- | --- | --- | --- |
| 3.1 | رفع الملفات | رفع السيرة الذاتية، التحقق من النوع والحجم | `topics/files.txt`، `topics/http/file-uploads.txt` |
| 3.2 | إعدادات التخزين | إعداد `STORAGES` (بدل الإعدادات القديمة)، تخزين مخصص | `ref/settings.txt`، `howto/custom-file-storage.txt` |
| 3.3 | البريد الإلكتروني | إعداد `MAILERS` الجديد في 6.1، رسائل من قوالب، المرفقات | `topics/email.txt`، `howto/mailers-migration.txt` |
| 3.4 | المهام الخلفية | إطار Tasks المدمج (منذ 6.0)، ولماذا يحتاج الإنتاج backend خارجياً | `topics/tasks.txt`، `ref/tasks.txt` |
| 3.5 | Middleware | كيف يمر الطلب عبر الطبقات (رسم)، كتابة middleware | `topics/http/middleware.txt` |
| 3.6 | Signals | متى نستخدمها ومتى نتجنبها | `topics/signals.txt` |
| 3.7 | أوامر الإدارة المخصصة | مثل أمر يغلق الوظائف المنتهية | `howto/custom-management-commands.txt` |
| 3.8 | القوالب المتقدمة | وسوم وفلاتر مخصصة، Template Partials (منذ 6.0) | `howto/custom-template-tags.txt`، `topics/templates.txt` |
| 3.9 | الكاش | مستويات الكاش، Redis backend المدمج | `topics/cache.txt` |
| 3.10 | الأداء | القياس قبل التحسين، الفهارس، تحسين الاستعلامات | `topics/performance.txt`، `topics/db/optimization.txt` |
| 3.11 | الأمان | CSRF، XSS، clickjacking، وContent Security Policy (منذ 6.0) | `topics/security.txt`، `howto/csp.txt`، `ref/csrf.txt` |
| 3.12 | ترجمة الواجهة | `gettext`، ملفات `.po`، تبديل اللغة | `topics/i18n/translation.txt` |
| 3.13 | RTL والتنسيق المحلي | `get_current_language_bidi`، التواريخ والأرقام، المناطق الزمنية | `topics/i18n/formatting.txt`، `topics/i18n/timezones.txt` |
| 3.14 | PostgreSQL | لماذا ننتقل إليه، الإعداد، connection pools | `ref/databases.txt` |
| 3.15 | البحث في النصوص العربية | البحث النصي في PostgreSQL وحدوده مع العربية | `topics/db/search.txt`، `ref/contrib/postgres/search.txt` |
| 3.16 | async | views غير متزامنة وواجهة ORM غير المتزامنة، ومتى تفيد فعلاً | `topics/async.txt` |
| 3.17 | Logging | إعداد السجلات وقراءتها | `topics/logging.txt`، `howto/logging.txt` |

دروس 3.12 إلى 3.15 هي ميزة الموقع: بناء تطبيق عربي حقيقي، لا مجرد ترجمة الواجهة.

## المرحلة 4 — احتراف

الهدف: المنصة منشورة على خادم حقيقي، مع API يخدم تطبيق جوال، في 11 درساً. نصف هذه المرحلة خارج وثائق Django، فهي تحتاج مراجع إضافية يُثبَّت إصدارها أيضاً.

| # | الدرس | ما يتعلمه الطالب | المرجع |
| --- | --- | --- | --- |
| 4.1 | تجهيز الإنتاج | فصل الإعدادات، الأسرار في متغيرات البيئة، `check --deploy` | `howto/deployment/checklist.txt` |
| 4.2 | الملفات الثابتة في الإنتاج | `collectstatic` وتقديمها | `howto/static-files/deployment.txt` |
| 4.3 | WSGI وASGI | الفرق بينهما، تشغيل التطبيق بخادم إنتاجي | `howto/deployment/wsgi`، `howto/deployment/asgi` |
| 4.4 | Docker | Dockerfile، docker compose مع PostgreSQL وRedis | مصدر خارجي |
| 4.5 | النشر على خادم | VPS، nginx، HTTPS، نشر التحديثات | مصدر خارجي |
| 4.6 | التكامل المستمر (CI) | تشغيل الاختبارات تلقائياً مع كل push | مصدر خارجي |
| 4.7 | مقدمة REST | الموارد، JSON، طرق HTTP، تثبيت Django REST Framework | وثائق DRF |
| 4.8 | Serializers وViewSets | التحويل والتحقق، ViewSets، Routers، التصفية والتقسيم | وثائق DRF |
| 4.9 | تأمين الـ API | المصادقة بالـ tokens، الصلاحيات المخصصة | وثائق DRF |
| 4.10 | الترقية بين إصدارات Django | قراءة release notes، تحذيرات الإلغاء (deprecation) | `howto/upgrade-version.txt` |
| 4.11 | المساهمة في Django نفسه | أول ticket، كتابة patch، المساهمة في ترجمة Django للعربية | `intro/contributing.txt`، `internals/contributing/localizing.txt` |

الـ API مؤجل عن قصد إلى هنا: DRF مكتبة منفصلة تبني على كل ما سبق (الـ ORM والـ CBVs والصلاحيات).

## قالب الدرس ومسرد المصطلحات

كل درس ملف MDX في مجلد مرحلته، مثل `src/content/docs/stage-2/n-plus-one.mdx`. البيانات في أعلاه (`lesson.docs` و`lesson.django`) هي التي تجعل التحديث السنوي آلياً تقريباً. القالب الكامل وأدوات الدرس في [دليل الكتابة](src/content/docs/writing-guide.mdx)، والخطوات في [CONTRIBUTING.md](CONTRIBUTING.md).

```yaml
---
title: مشكلة N+1
description: جملة واحدة تظهر في نتائج البحث.
sidebar:
  order: 4
lesson:
  id: '2.4'
  minutes: 30
  objectives:
    - تعرف سبب مشكلة N+1.
  prerequisites: ['2.1', '2.3']
  docs:
    - topics/db/fetch-modes.txt
    - topics/db/optimization.txt
  django: '6.1'
---
```

ترتيب أقسام الدرس المعتاد: مقدمة قصيرة، ثم الشرح مع الرسم، ثم الكود خطوة بخطوة، ثم الأخطاء الشائعة، ثم تمرين وأسئلة سريعة، ثم الخلاصة. «ماذا ستتعلم» و«المرجع الرسمي» يُصنعان تلقائياً من البيانات.

قاعدة المصطلحات: المصطلح بالإنجليزية مع شرح عربي عند أول ظهور، والكود دائماً بالإنجليزية. بداية المسرد:

| المصطلح | كيف نكتبه في الشرح | الشرح العربي عند أول ظهور |
| --- | --- | --- |
| project / app | المشروع / التطبيق | المشروع يجمع عدة تطبيقات، وكل تطبيق جزء مستقل |
| view | الـ view | دالة أو كلاس يستقبل الطلب ويرجع الرد |
| model | الـ model | كلاس يمثل جدولاً في قاعدة البيانات |
| template | القالب | ملف HTML فيه متغيرات ووسوم |
| form | الـ form | نموذج إدخال مع تحقق من البيانات |
| QuerySet | الـ QuerySet | استعلام لا يُنفَّذ حتى نحتاج نتيجته |
| migration | الـ migration | ملف يصف تغييراً في بنية قاعدة البيانات |
| middleware | الـ middleware | طبقة يمر بها كل طلب وكل رد |
| field / lookup | الحقل / الـ lookup | العمود في الجدول / شرط المقارنة مثل `__icontains` |
| deployment | النشر | وضع التطبيق على خادم يصل إليه الناس |

## الموقع التقني

الموقع مبني بـ Astro Starlight، والدروس ملفات MDX في هذا المستودع، والاستضافة مجانية (GitHub Pages أو Cloudflare Pages، لم تُحسم بعد). اخترنا Starlight بعد أن اجتاز كل المتطلبات التالية، و[دليل الكتابة](src/content/docs/writing-guide.mdx) يعرض كل حالة منها:

| المتطلب | لماذا | كيف نختبره |
| --- | --- | --- |
| اتجاه RTL كامل | القوائم والتنقل والجداول من اليمين | صفحة تجريبية بالعربية |
| كود LTR داخل صفحة RTL | الكود يجب أن يبقى من اليسار ومحاذاً لليسار | كتلة كود Python طويلة |
| كود قصير داخل جملة عربية | بدون عزل (bidi isolation) تقفز علامات الترقيم والأقواس من مكانها | جملة فيها `filter(title__icontains="x")` |
| بحث يفهم العربية | الطالب يبحث بالعربي وبالمصطلح الإنجليزي | البحث عن "النماذج" وعن "ModelForm" |
| رسومات SVG | رسوم الدروس بنص عربي وتدفق من اليمين لليسار | رسم رحلة الطلب في الدرس 1.1 |
| خط عربي مريح للقراءة الطويلة | المحتوى نصي بالكامل | قراءة درس كامل على الجوال |

الرسومات المخطط لها حتى الآن: رحلة الطلب داخل Django (1.1)، كاش الـ QuerySet (2.1)، مشكلة N+1 قبل الحل وبعده (2.4)، طبقات الـ middleware (3.5)، شكل النشر من nginx إلى قاعدة البيانات (4.5).

## خطة التحديث مع إصدارات Django

مراجعة كبيرة واحدة عند صدور 6.2 LTS (متوقع أبريل 2027)، ثم مراجعة واحدة كل سنة. بدءاً من Django 2028 يصدر إصدار واحد في يناير تقريباً، بدعم أمني 3 سنوات ودون إصدارات LTS منفصلة.

| الموعد | الإصدار | ما نفعله في الدروس |
| --- | --- | --- |
| الآن | Django 6.1 | كل الدروس تُكتب عليه |
| أبريل 2027 (متوقع) | Django 6.2 LTS | مراجعة كبيرة لكل الدروس |
| يناير من كل سنة، بدءاً من 2028 | Django 2028 وما بعده | مراجعة سنوية للدروس المتأثرة فقط |

الميزة التي تناسبنا: الميزة الملغاة تبقى تعمل مع تحذير في الإصدار التالي، ولا تُحذف إلا في الذي بعده. فالدرس القديم لا ينكسر فجأة.

خطوات كل مراجعة:

1. جلب فرع الإصدار الجديد إلى المرجع المحلي.
2. معرفة ملفات الوثائق التي تغيرت بين الفرعين.
3. مطابقتها مع `lesson.docs` في الدروس، بسكربت صغير، لمعرفة الدروس المتأثرة.
4. قراءة ملف release notes، خصوصاً قسمي backwards incompatible changes وdeprecated features.
5. تحديث الدروس المتأثرة، ورفع `lesson.django` فيها، وتحديث نسخة Django في `verify/requirements.txt` وفي `scripts/fetch-django-docs.mjs`.

```bash
cd .reference/django
git remote set-branches --add origin stable/6.2.x
git fetch --depth 1 origin stable/6.2.x
git diff --stat origin/stable/6.1.x origin/stable/6.2.x -- docs/
```

## خارطة التنفيذ والأسئلة المفتوحة

المنهج 65 درساً (5 + 12 + 20 + 17 + 11)، والإطلاق العلني بعد المرحلتين 0 و1 لجمع آراء الطلاب مبكراً. كل خطوة لها شرط انتقال واضح.

1. ✅ **الأساس:** اختيار أداة الموقع، إكمال المسرد، تثبيت قالب الدرس.
   - شرط الانتقال: صفحة تجريبية تجتاز كل متطلبات قسم "الموقع التقني".
2. ✅ **درس نموذجي واحد:** درس 2.4 (مشكلة N+1) كاملاً بالرسم والتمرين.
   - شرط الانتقال: معرفة الوقت الفعلي لكتابة درس، فهو الذي يحدد الجدول الزمني الحقيقي.
3. ⏳ **المرحلتان 0 و1 ثم الإطلاق** (الدرس 0.1 منشور): 17 درساً، مع كود المشروع في مستودع مستقل وtag لكل درس (مثل `lesson-1.4`) ليقارن الطالب كوده به.
   - شرط الانتقال: الموقع منشور وفيه مكان لأسئلة الطلاب.
4. **المرحلة 2** (20 درساً).
5. **المرحلة 3** (17 درساً).
6. **المرحلة 4** (11 درساً).

أسئلة مفتوحة تحتاج قراراً:

- [ ] هل نعتمد منصة الوظائف كمشروع مستمر؟
- [ ] اسم الموقع والنطاق (domain)؟
- [x] رخصة المحتوى ورخصة الكود: الدروس CC BY-SA 4.0، والكود MIT.
- [x] هل نقبل مساهمات خارجية عبر Pull Requests من البداية؟ نعم.
- [ ] أين يُنشر الموقع: GitHub Pages أم Cloudflare Pages؟
- [ ] أين يسأل الطلاب: GitHub Discussions أم Discord أم Telegram؟
- [ ] إذا صدر 6.2 في أبريل 2027 قبل اكتمال المرحلة 2، هل نكمل بقية الدروس عليه مباشرة؟
