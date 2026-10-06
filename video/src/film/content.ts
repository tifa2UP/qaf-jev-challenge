export const SCRIPT = [
  {id:1, label:'السؤال', cues:[
    ['من أين جاءت هذه الإجابة؟','Where did this answer come from?'],
    ['سؤالٌ واحد يختصر تحدّي الثقة في المعرفة الإسلامية.','One question captures the challenge of trust in Islamic knowledge.'],
    ['قاف يقرّب المسافة بين السؤال ومصدره.','Qaf brings questions and sources closer together.'],
  ]},
  {id:2, label:'قاف · المنتج القائم', cues:[
    ['يساعد قاف الباحث والقارئ على استكشاف المسائل،','Qaf helps researchers and readers explore a question,'],
    ['وقراءة المقاطع المستشهد بها في سياقها.','and read cited passages in their context.'],
    ['فتظل الكتب والمؤلفون ومواضع النص حاضرةً إلى جانب الإجابة.','Books, authors, and source locations remain alongside the answer.'],
  ]},
  {id:3, label:'Jev · مسار تجريبي', cues:[
    ['Jev. مسارٌ تجريبي يختار الأدلة قبل صياغة الإجابة.','Jev. An experimental workflow that selects evidence before writing.'],
    ['يصنّف السؤال، ويقيّم المقاطع المسترجعة،','It classifies the question and evaluates the retrieved passages,'],
    ['ثم يراجع التغطية ويحدّد الفجوات.','then reviews coverage and identifies the gaps.'],
  ]},
  {id:4, label:'تتبّع الإحالة', cues:[
    ['وتضبط الشفرة خطوات المتابعة.','Code controls the follow-up steps.'],
    ['بعد ذلك، يصوغ جيميني الإجابة من حزمة أدلة مرقمة.','Gemini then writes from a numbered evidence pack.'],
    ['وتحيل أرقام الاستشهاد إلى المقاطع المعروفة التي يمكن للقارئ مراجعتها.','Citation numbers resolve to known passages the reader can inspect.'],
  ]},
  {id:5, label:'محاكاة تعليمية · بيانات مصطنعة', cues:[
    ['وفي النموذج التعليمي المستقل، نسأل: كيف نتحقق من الاقتباس؟','In the independent educational demo, we ask: how do we check a quotation?'],
    ['نفتح إحالة محددة، فنرى النص الذي يوصي بقراءة الجمل المحيطة به.','We open a citation and see the passage advising us to read the surrounding sentences.'],
    ['وعند غياب الدليل، يعلن النموذج حدودَه.','When evidence is missing, the demo states its limits.'],
  ]},
  {id:6, label:'نتائج دراسة سابقة', cues:[
    ['في دراسة سابقة على ثمانية وأربعين سؤالًا،','In a previous study using 48 questions,'],
    ['انخفض متوسط التكلفة المقدرة بنحو أربعين بالمئة.','estimated mean cost was about 40% lower.'],
    ['وانخفض وسيط ظهور أول نص مقروء','Median time to the first readable answer text fell'],
    ['من نحو ثلاث عشرة ثانية إلى أقل من عشر ثوانٍ.','from about thirteen seconds to less than ten.'],
  ]},
  {id:7, label:'الجودة وحدود المقارنة', cues:[
    ['أما الجودة فلم تُحسم أفضليتها:','No quality advantage has been established:'],
    ['عشرون تفضيلًا للمسار التجريبي، وستة عشر للإنتاج،','Twenty preferences for the experimental workflow, sixteen for production,'],
    ['واثنتا عشرة حالة غير محسومة.','and twelve undecided comparisons.'],
  ]},
  {id:8, label:'منهجية الدراسة', cues:[
    ['الدراسة سابقة للتحدي، وتقييمها آلي.','The study predates the challenge, and its evaluation is automated.'],
    ['وفي عينة التدقيق، ظهرت أخطاء جوهرية','In the audit sample, serious errors were found'],
    ['في ست إجابات من ثماني عشرة لدى كل مسار.','in six of eighteen answers in each workflow.'],
  ]},
  {id:9, label:'مواد المشاركة', cues:[
    ['وتقدّم مواد المشاركة شرحًا مستقلًا وتجربة تعليمية ببيانات مصطنعة،','The submission provides an independent explanation and a demo with synthetic data,'],
    ['مع توثيق النتائج والحدود.','with documented results and limitations.'],
    ['قاف. سؤالٌ أوضح، ودليلٌ أقرب.','Qaf. A clearer question. Evidence closer at hand.'],
  ]},
] as const;

export const SOURCE = {
  url:'https://qaf-jev-v4-vs-prod.pages.dev/',
  date:'17 September 2026',
  candidate:'jev_v4w',
  sample:48,
  cost:{candidate:0.02511465425, production:0.04195861458333333},
  firstText:{candidate:9.646999999999998, production:13.049},
  preferences:{candidate:20, production:16, undecided:12},
  seriousErrors:{candidate:6, production:6, auditedPerArm:18},
};

// This is a newly written public educational fixture, not scripture or a real user conversation.
// Its wording matches demo/data.mjs (DEMO-02) in this public repository.
export const SYNTHETIC = {
  question:'كيف أتحقق من الاقتباس قبل نقله؟',
  answer:'أراجع الجمل المحيطة بالاقتباس قبل نقله.',
  id:'DEMO-02',
  title:'فحص الاقتباس في سياقه',
  text:'يُراجع الاقتباس مع الجمل المحيطة به قبل نقله. وتُفصل العبارة المنقولة حرفيًا عن الشرح الذي يكتبه الباحث، حتى يستطيع القارئ التمييز بين النص وتفسيره.',
};
