---
title: المرحلة 2 · متوسط
description: الـ ORM بعمق، الـ Forms، الـ class-based views، المصادقة والاختبارات.
stage: 2
sidebar:
  label: نظرة عامة
  order: 0
---

في نهاية هذه المرحلة يسجّل الباحث والشركة في المنصة، وتُنشر الوظائف ويُقدَّم عليها، مع بحث وتصفية. هذه أكبر مرحلة، والـ ORM وحده ثمانية دروس لأنه قلب Django.

:::note[الدروس قيد الكتابة]
تظهر الدروس في القائمة الجانبية فور نشرها.
:::

| # | الدرس | ما ستتعلمه |
| --- | --- | --- |
| 2.1 | QuerySets والـ Managers | متى يُنفَّذ الاستعلام، وكاش الـ QuerySet |
| 2.2 | الفلترة المتقدمة | field lookups، كائنات `Q` و`F` |
| 2.3 | الترتيب واختيار الحقول | `order_by`، التقطيع، `values`، `only`، `defer` |
| 2.4 | [مشكلة N+1](/stage-2/n-plus-one/) | `select_related`، `prefetch_related`، وFetch modes الجديدة في 6.1 |
| 2.5 | التجميع والتلخيص | `aggregate`، `annotate`، دوال قاعدة البيانات |
| 2.6 | الكتابة في قاعدة البيانات | الإنشاء، التعديل، الحذف، الـ transactions |
| 2.7 | ميزات الـ models الحديثة | `GeneratedField`، `db_default`، الـ constraints |
| 2.8 | Custom Managers | استعلامات متكررة في مكان واحد |
| 2.9 | Forms | التعريف، التحقق، العرض، رسائل الأخطاء |
| 2.10 | ModelForms وFormsets | نموذج من model، وعدة نماذج في صفحة |
| 2.11 | Class-based views | من الدالة إلى الكلاس، ولماذا |
| 2.12 | Generic views | List، Detail، Create، Update، Delete |
| 2.13 | Mixins | إعادة استخدام السلوك بين الـ views |
| 2.14 | التقسيم إلى صفحات | `Paginator`، ووسم `{% querystring %}` |
| 2.15 | Sessions وMessages | حفظ حالة المستخدم، ورسائل «تم الحفظ» |
| 2.16 | المصادقة | التسجيل، الدخول، الخروج، استعادة كلمة المرور |
| 2.17 | Custom User Model بالتفصيل | نوعا المستخدم، والملفات الشخصية |
| 2.18 | الصلاحيات | المجموعات، الصلاحيات المخصصة، `LoginRequiredMiddleware` |
| 2.19 | الاختبارات بعمق | الـ test client، fixtures، اختبار النماذج والصلاحيات |
| 2.20 | لوحة الإدارة المتقدمة | actions، facet filters، inlines |
