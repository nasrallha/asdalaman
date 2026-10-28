# بروفايل شركة أسد الأمن للحراسات الأمنية

صفحة واحدة بالعربي والإنجليزي، متجاوبة مع كل الشاشات. HTML + CSS + JavaScript من غير أي مكتبات.

## هيكل الملفات

```
index.html              الصفحة كلها (الأقسام بالترتيب)
css/style.css           كل الستايل (Mobile-first + Logical Properties للـ RTL/LTR)
js/translations.js      كل النصوص بالعربي والإنجليزي
js/main.js              تبديل اللغة، النافبار، القائمة، نموذج واتساب
assets/images/          الصور (تجريبية حالياً)
```

## تعديلات سريعة

- **تعديل أي نص:** من `js/translations.js`. كل نص له مفتاح، تعدّل قيمته في `ar` و `en`.
- **رقم واتساب الشركة:** من أول `js/main.js` في `CONFIG.whatsappNumber` (بالصيغة الدولية، مثلاً `966558070567`).
- **تغيير الصور:** حط الصورة الجديدة بنفس الاسم في `assets/images/`، أو غيّر المسار في `index.html`.
  - `hero.jpg` خلفية الرئيسية، `guards.jpg` قسم من نحن، `mission.jpg` كارت الأهداف، `skyline.jpg` قسم ما يميزنا
  - `service-*.jpg` و `vision-*.jpg` كروت الخدمات، `training-*.jpg` دوائر التدريب، `vehicles.jpg` شريط التغطية
  - `logo.png` اللوجو (يفضل PNG بخلفية شفافة وبجودة عالية)
- **الألوان:** من أول `css/style.css` في `:root` (`--gold`، `--navy`...).

## إضافة لغة أو قسم جديد

1. أضف العنصر في `index.html` بـ `data-i18n="key"`
2. أضف المفتاح في `translations.js` في اللغتين
3. لو قسم جديد في النافبار: ادّيله `id` وضيف لينك `<a href="#id" class="nav-link">`، والـ smooth scroll والتلوين هيشتغلوا لوحدهم
