document.addEventListener("DOMContentLoaded", function() {
    // 1. فتح تفاعل الخريطة واللمس بالكامل لضمان عدم تجميدها
    const mapElement = document.getElementById('mapCanvas');
    if (mapElement) {
        mapElement.style.pointerEvents = 'auto';
        mapElement.style.opacity = '1';
    }

    // 2. إزالة الأشرطة التحذيرية وعبارات المحاكاة من الشاشة
    const targets = document.querySelectorAll('.ribbon, .map-credit');
    targets.forEach(el => el.remove());

    // 3. تعقيم وتعديل النصوص لتصبح رسمية
    function sanitizeText(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let txt = node.nodeValue;
            txt = txt.replace(/محاكاة\s*—\s*غير رسمي.*?لا يتم إرسال أي بلاغ/g, '');
            txt = txt.replace(/محاكاة غير رسمية/g, 'خدمة موثقة');
            txt = txt.replace(/بلاغ تجريبي/g, 'بلاغ أمني رسمي');
            txt = txt.replace(/تجربة محلية آمنة/g, 'الخدمات الأمنية المعتمدة');
            txt = txt.replace(/تجربة إنشاء بلاغ/g, 'إنشاء بلاغ جديد');
            txt = txt.replace(/أنشئ بلاغك التجريبي بخطوات واضحة/g, 'أدخل تفاصيل البلاغ بدقة');
            txt = txt.replace(/بلاغاتي التجريبية/g, 'سجل بلاغاتي');
            txt = txt.replace(/عن التجربة/g, 'عن الخدمة');
            txt = txt.replace(/حي تجريبي/g, 'حي');
            txt = txt.replace(/خلفية توضيحية/g, '');
            txt = txt.replace(/تجريبي/g, 'رسمي');
            txt = txt.replace(/محاكاة/g, 'موثق');
            txt = txt.replace(/غير رسمي/g, 'رسمي');
            node.nodeValue = txt;
        } else if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            node.childNodes.forEach(child => sanitizeText(child));
        }
    }

    sanitizeText(document.body);

    // 4. مراقبة مستمرة لأي نصوص تظهر لاحقاً لضمان بقائها نظيفة ورسمية
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1 || node.nodeType === 3) {
                    sanitizeText(node);
                    if (node.classList && (node.classList.contains('ribbon') || node.classList.contains('map-credit'))) {
                        node.remove();
                    }
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});