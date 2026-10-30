<div dir="rtl">

# Django بالعربي

تعلّم Django من الصفر إلى الاحتراف، بالعربية ومجاناً.

دروس مكتوبة مع رسومات، لمن يعرف أساسيات Python. يبني الطالب خلال المسار منصة وظائف عربية واحدة تكبر مع كل مرحلة، من أول مشروع حتى نشرها على خادم حقيقي. المرجع وثائق Django 6.1 الرسمية، وكل معلومة عن Django في الدروس مثبتة باختبار يعمل على Django 6.1.

| المرحلة | عدد الدروس | في نهايتها |
| --- | --- | --- |
| 0 · التمهيد | 5 | الطالب جاهز بأدواته ويفهم الويب |
| 1 · مبتدئ | 12 | قائمة وظائف وصفحة تفاصيل تُدار من لوحة الإدارة |
| 2 · متوسط | 20 | تسجيل وتقديم على الوظائف، مع بحث وتصفية |
| 3 · متقدم | 17 | رفع ملفات، مهام خلفية، واجهة بلغتين |
| 4 · احتراف | 11 | المنصة منشورة على خادم حقيقي، مع API |

الخطة الكاملة، درساً درساً مع مصادره، في [CURRICULUM.md](CURRICULUM.md).

## شارك في كتابة الموقع

المشروع مفتوح للمساهمة، ولا يلزم أن تكون خبيراً:

- **وجدت خطأ؟** افتح [issue](../../issues/new/choose)، أو اضغط «عدل الصفحة» أسفل أي درس وصحّحه مباشرة على GitHub.
- **تريد كتابة درس؟** اختر درساً من [CURRICULUM.md](CURRICULUM.md)، واحجزه في issue، ثم اتبع [CONTRIBUTING.md](CONTRIBUTING.md).

### نفس الموارد لكل من يكتب

كل ما استُخدم في كتابة الدروس موجود في المستودع، فيكتب كل مساهم، ومساعد الذكاء الاصطناعي الذي يستخدمه، من نفس المصادر وبنفس الأسلوب:

| المورد | ما فائدته |
| --- | --- |
| [CURRICULUM.md](CURRICULUM.md) | ترتيب الدروس، ومحتوى كل درس، وملفات الوثائق التي يعتمد عليها |
| [دليل الكتابة](src/content/docs/writing-guide.mdx) | قواعد الكتابة بالعربية مع الكود، وكل أدوات الدرس (تمارين، أسئلة، رسومات) |
| `npm run docs:fetch` | ينزّل وثائق Django 6.1 الرسمية إلى `.reference/django/docs` (حوالي 15 MB) |
| [verify/](verify/) | اختبارات تثبت كل معلومة عن Django في الدروس، مثل عدد الاستعلامات في درس N+1 |
| [AGENTS.md](AGENTS.md) | خريطة المشروع وأوامره ومشاكله المعروفة لمساعدي الذكاء الاصطناعي. تقرؤه أغلب أدوات البرمجة بالذكاء الاصطناعي تلقائياً |
| [CLAUDE.md](CLAUDE.md) ومهارة [new-lesson](.claude/skills/new-lesson/SKILL.md) | لمستخدمي Claude Code: اطلب «اكتب الدرس 0.2» فيتبع نفس خطوات كتابة بقية الدروس |

هذه الملفات تختصر على المساعد استكشاف المشروع من الصفر، فيستهلك tokens أقل.

## تشغيل الموقع على جهازك

تحتاج Node.js 22.23.4 أو أحدث، وPython 3.12 أو أحدث لتشغيل الاختبارات.

```bash
git clone https://github.com/TajAlasfiyaa/django-ar.git
cd django-ar
npm install
npm run docs:fetch
npm run dev
```

ثم افتح `http://localhost:4321`. ولتشغيل اختبارات الدروس:

```bash
python -m venv .venv
.venv/bin/pip install -r verify/requirements.txt
.venv/bin/python verify/runtests.py
```

على Windows استبدل `.venv/bin/` بـ `.venv\Scripts\`.

## الرخصة

- الدروس والرسومات (`src/content/` و`src/assets/`): [CC BY-SA 4.0](LICENSE-CONTENT.md). انسخها وعدّلها وانشرها، بشرط ذكر المصدر ونشر تعديلك بنفس الرخصة.
- الكود: [MIT](LICENSE).

</div>

---

## English

**Django in Arabic** is a free site that teaches Django 6.1, in Arabic, to developers who already know Python. Lessons are written text with diagrams, built around one project (an Arabic job board) that grows from a first app to a production deployment. Every Django claim in a lesson is backed by a test in [`verify/`](verify/) that runs against Django 6.1.

- Curriculum: [CURRICULUM.md](CURRICULUM.md) (Arabic).
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md) (Arabic). AI agents: start with [AGENTS.md](AGENTS.md).
- Stack: Astro 7 + Starlight. `npm install && npm run docs:fetch && npm run dev`.
- License: lessons and diagrams under [CC BY-SA 4.0](LICENSE-CONTENT.md), code under [MIT](LICENSE).
