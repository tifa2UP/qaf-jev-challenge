import React from 'react';
import {AbsoluteFill, Img, getStaticFiles, staticFile, useCurrentFrame} from 'remotion';
import {palette,SceneTheme,QafMark,Corner,Headline,Kicker,Reveal,Small,TraceLine,linear,unit} from './theme';
import {SYNTHETIC} from './content';

type Props={frames:number;cueStarts?:number[]};
const cue=(c:number[]|undefined,i:number,fallback:number)=>c?.[i]??fallback;
function asset(name:string){return getStaticFiles().some(f=>f.name===`visuals/${name}`)?staticFile(`visuals/${name}`):null}
function Canvas({dark=false}:{dark?:boolean}){return <AbsoluteFill style={{background:palette(dark).background}}/>}
function SceneWrap({children,frames,dark=false}:{children:React.ReactNode;frames:number;dark?:boolean}){const f=useCurrentFrame();const opacity=Math.min(linear(f,0,15),1-linear(f,frames-12,frames));return <SceneTheme.Provider value={dark}><AbsoluteFill style={{direction:'rtl',opacity,background:palette(dark).background,color:palette(dark).foreground}}>{children}</AbsoluteFill></SceneTheme.Provider>}

export function Opening({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const reveal=cue(cueStarts,2,frames*.48);const late=unit(f,reveal,reveal+30);return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="الحوار المعرفي والإجابات الموثوقة"/>
 <Reveal delay={20} style={{position:'absolute',left:245,top:295}}><QafMark width={275}/></Reveal>
 <div style={{position:'absolute',right:115,top:225,width:1100}}>
  <Reveal delay={12}><Kicker>سؤالٌ يبدأ به البحث</Kicker></Reveal>
  <Reveal delay={28}><Headline size={112}>من أين جاءت<br/><span style={{color:C.foreground}}>هذه الإجابة؟</span></Headline></Reveal>
  <div style={{opacity:late,transform:`translateY(${(1-late)*24}px)`,marginTop:52,fontSize:33,color:C.muted}}>قاف يقرّب المسافة بين السؤال ومصدره</div>
 </div>
 </SceneWrap>}

export function Product({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const focused=asset('qaf-public-answer-focus.jpg');const z=unit(f,cue(cueStarts,1,frames*.3),frames*.88);return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="قاف القائم · سؤال أعددناه للعرض"/>
 <div style={{position:'absolute',top:148,right:115,left:115}}><Reveal><Kicker>السؤال، والنص، وموضع الاستشهاد</Kicker><Headline size={67}>المصدر حاضرٌ إلى جانب الإجابة</Headline></Reveal></div>
 <div style={{position:'absolute',top:348,right:115,width:1160,height:438,transform:`translateY(${(1-unit(f,5,32))*12}px)`,transformOrigin:'center center',borderRadius:24,overflow:'hidden',background:C.card,boxShadow:'0 8px 24px #00000008',border:`1px solid ${C.border}`}}>
  <div style={{height:44,background:C.card,borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:19,color:C.muted,letterSpacing:1}} dir="ltr">qaf.ai</div>
  {focused?<div style={{height:394,overflow:'hidden'}}><Img src={focused} style={{height:394,width:'100%',objectFit:'contain',background:C.card,transform:`scale(${1+z*.025})`,transformOrigin:'42% 69%'}}/></div>:<div style={{fontSize:46,padding:65,color:C.foreground}}>{SYNTHETIC.question}</div>}
 </div>
 <div style={{position:'absolute',left:115,width:425,top:382,fontSize:30,color:C.foreground}}>
  {[['السياق','قراءة المقطع ضمن محيطه'],['موضع النص','كتاب ومؤلف وإحالة'],['المراجعة','المصدر قابل للفتح']].map(([s,d],i)=><div key={s} style={{opacity:unit(f,40+i*45,70+i*45),padding:'16px 0 24px',marginBottom:17,borderBottom:`1px solid ${C.border}`}}><div style={{fontWeight:500}}>{s}</div><div style={{fontSize:24,color:C.muted,marginTop:13}}>{d}</div></div>)}
 </div>
 </SceneWrap>}

export function Decisions({frames,cueStarts}:Props){const C=palette(true);const f=useCurrentFrame();const states=['نوع السؤال','صلة المقطع','كفاية التغطية'];const classify=cue(cueStarts,1,frames*.38);const review=cue(cueStarts,2,frames*.68);const starts=[classify,classify+37,review];return <SceneWrap frames={frames} dark>
 <Canvas dark/>
 <Corner label="تصوّر معماري · مسار Jev التجريبي"/>
 <div style={{position:'absolute',top:150,right:115}}><Kicker>اختيار الأدلة قبل الكتابة</Kicker><Headline size={69}>ما الذي يضيفه <bdi>Jev</bdi>؟</Headline></div>
 <div style={{position:'absolute',top:360,right:110,width:460}}><div style={{fontSize:23,color:C.muted,marginBottom:20}}>السؤال</div><div style={{fontSize:35,lineHeight:1.6,padding:'28px 30px',borderRight:`3px solid ${C.foreground}`,background:C.card}}>كيف أتحقق من الاقتباس؟</div></div>
 <div style={{position:'absolute',top:365,left:750,width:345,height:280,border:`1px solid ${C.strongBorder}`,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',background:C.card,transform:`translateY(${(1-unit(f,10,42))*12}px)`,overflow:'hidden'}}>
  <div style={{textAlign:'center'}}><div dir="ltr" style={{fontSize:96,color:C.foreground,fontWeight:500}}>Jev</div><div style={{fontSize:22,color:C.muted,marginTop:8}}>تصنيف · تقييم · مراجعة</div></div>
  <div style={{position:'absolute',bottom:0,left:0,height:3,width:`${linear(f,classify,review+50)*100}%`,background:C.foreground}}/>
 </div>
 <TraceLine d="M 1342 473 C 1240 473, 1205 505, 1095 505" progress={unit(f,25,80)}/>
 {[392,500,608].map((y,i)=><TraceLine key={y} d={`M 750 505 C 665 505, 662 ${y}, 585 ${y}`} progress={unit(f,starts[i],starts[i]+40)}/>)}
 <div style={{position:'absolute',top:348,left:115,width:470}}>{states.map((s,i)=><div key={s} style={{opacity:.16+unit(f,starts[i],starts[i]+28)*.84,transform:`translateX(${(1-unit(f,starts[i],starts[i]+28))*-20}px)`,marginBottom:20,padding:'22px 25px',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}><span style={{fontSize:32,color:C.foreground}}>{s}</span><span style={{fontSize:21,color:f>starts[i]+25?C.foreground:C.muted}}>{f>starts[i]+25?['تصنيف','تقييم','مراجعة'][i]:'…'}</span></div>)}</div>
 <Reveal delay={review} style={{position:'absolute',right:120,left:120,top:766,textAlign:'center'}}><Small>تراجع الخطوات ما تغطيه المقاطع، وما يحتاج إلى بحث إضافي.</Small></Reveal>
 </SceneWrap>}

export function Resolver({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const resolve=cue(cueStarts,2,frames*.53);const select=unit(f,resolve,resolve+28);return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="رسم تفسيري · إحالات قابلة للتتبّع"/>
 <div style={{position:'absolute',top:148,right:115}}><Kicker>الشفرة تضبط المتابعة والإحالات</Kicker><Headline size={70}>من حزمة الأدلة إلى نصّها الأصلي</Headline></div>
 <div style={{position:'absolute',right:115,top:350,width:530,height:355,padding:36,background:C.card,border:`1px solid ${C.border}`,borderRadius:12}}>
  <Small>حزمة أدلة مرقمة</Small>
  {[1,2,3].map((n)=><div key={n} style={{display:'flex',alignItems:'center',gap:28,padding:'21px 0',borderBottom:n<3?`1px solid ${C.border}`:'none',fontSize:31,color:n===2&&select>.5?C.foreground:C.muted}}><span dir="ltr" style={{fontSize:36,fontWeight:600}}>[{n}]</span><span>مقطع ذو معرّف معروف</span></div>)}
 </div>
 <div style={{position:'absolute',top:445,left:815,width:280,textAlign:'center'}}><div dir="ltr" style={{fontSize:38,color:C.secondary,fontWeight:500}}>Gemini</div><Small style={{fontSize:24,marginTop:12}}>صياغة من الأدلة</Small></div>
 <TraceLine d="M 1270 527 C 1160 527, 1140 482, 1095 482" progress={unit(f,30,100)} color={C.secondary}/>
 <TraceLine d="M 815 482 C 730 482, 710 465, 650 465" progress={unit(f,70,145)} color={C.secondary}/>
 <div style={{position:'absolute',left:115,top:351,width:530,height:355,padding:38,background:C.surface,borderRadius:12,color:C.foreground,boxShadow:'0 4px 16px #00000006',opacity:unit(f,90,130)}}><div style={{fontSize:26,color:C.foreground,marginBottom:25}}>إجابة مع إحالة</div><div style={{fontSize:38,lineHeight:1.7}}>يمكن فتح المقطع<br/>المستشهد به <span dir="ltr" style={{color:C.foreground,background:C.accent,padding:'0 10px'}}>[2]</span></div><div style={{marginTop:27,display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:21,color:C.foreground}}><span>مطابقة معرّف الإحالة</span><span dir="ltr" style={{opacity:select}}>DEMO-02</span></div></div>
 <TraceLine d="M 380 706 C 530 815, 1290 815, 1275 561" progress={unit(f,resolve,resolve+75)} color={C.foreground}/>
 <Reveal delay={Math.round(frames*.59)} style={{position:'absolute',right:120,left:120,top:794,textAlign:'center'}}><Small>مطابقة المعرّف تتيح فتح النص. وفحص المعنى يبقى خطوة مستقلة.</Small></Reveal>
 </SceneWrap>}

export function SyntheticTrace({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const openAt=cue(cueStarts,1,frames*.28);const absentAt=cue(cueStarts,2,frames*.78);const open=unit(f,openAt,openAt+42);const absent=unit(f,absentAt,absentAt+28);return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="محاكاة تعليمية · بيانات مصطنعة"/>
 <div style={{position:'absolute',right:115,top:150}}><Kicker>تجربة مرجعية مستقلة</Kicker><Headline color={C.foreground} size={68}>{SYNTHETIC.question}</Headline></div>
 <div style={{position:'absolute',right:115,top:345,width:685,padding:35,borderRadius:12,border:`1px solid ${C.border}`,background:C.card,boxShadow:'0 4px 16px #00000004'}}>
  <div style={{fontSize:24,color:C.foreground,marginBottom:22}}>إجابة المثال</div><div style={{fontSize:38,lineHeight:1.8,color:C.foreground}}>{SYNTHETIC.answer} <span dir="ltr" style={{display:'inline-block',background:C.accent,color:C.foreground,padding:'0 14px',borderRadius:6,boxShadow:`0 0 0 ${Math.sin(linear(f,openAt-18,openAt+36)*Math.PI)*12}px #1D1C1C0D`}}>[2]</span></div>
  <div style={{marginTop:25,fontSize:23,color:C.muted,display:'flex',justifyContent:'space-between'}}><span>فتح النص الداعم</span><span dir="ltr" style={{color:C.foreground,opacity:open}}>DEMO-02</span></div>
 </div>
 <TraceLine d="M 1120 580 C 1015 580, 985 507, 863 507" progress={open} color={C.foreground}/>
 <div style={{position:'absolute',left:115,top:344,width:748,minHeight:395,padding:'32px 35px',background:C.surface,borderTop:`4px solid ${C.foreground}`,boxShadow:'0 4px 16px #00000004',opacity:open,transform:`translateX(${(1-open)*38}px)`}}>
  <div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',gap:20}}><div style={{fontSize:30,color:C.foreground,fontWeight:500}}>{SYNTHETIC.title}</div><div dir="ltr" style={{fontSize:20,color:C.foreground}}>{SYNTHETIC.id}</div></div>
  <div style={{fontSize:30,lineHeight:1.83,color:C.foreground,marginTop:24}}><span style={{backgroundImage:'linear-gradient(90deg,#D4D4D8,#D4D4D8)',backgroundSize:`${unit(f,openAt+25,openAt+60)*100}% 100%`,backgroundRepeat:'no-repeat',backgroundPosition:'right center'}}>يُراجع الاقتباس مع الجمل المحيطة به قبل نقله.</span> وتُفصل العبارة المنقولة حرفيًا عن الشرح الذي يكتبه الباحث، حتى يستطيع القارئ التمييز بين النص وتفسيره.</div>
  <div style={{fontSize:19,color:C.muted,marginTop:19}}>نص تعليمي أصلي، وليس اقتباسًا من مصدر ديني</div>
 </div>
 <div style={{position:'absolute',right:118,top:704,width:675,opacity:absent,transform:`translateY(${(1-absent)*18}px)`,borderRight:`3px solid ${C.secondary}`,padding:'16px 22px',background:C.surface,color:C.secondary,fontSize:28,lineHeight:1.65}}>عند غياب الدليل:<br/><span style={{fontSize:24}}>لا يوجد في المجموعة ما يكفي للإجابة.</span></div>
 </SceneWrap>}

export function Results({frames,cueStarts}:Props){const C=palette(true);const f=useCurrentFrame();const costAt=cue(cueStarts,1,45);const latencyAt=cue(cueStarts,2,frames*.44);const later=unit(f,latencyAt,latencyAt+35);const costReveal=unit(f,costAt,costAt+28);const context=unit(f,12,40)*(1-unit(f,costAt-15,costAt));return <SceneWrap frames={frames} dark>
 <Canvas dark/>
 <Corner label="دراسة ١٧ سبتمبر ٢٠٢٦ · ٤٨ سؤالًا"/>
 <div style={{position:'absolute',top:150,right:115}}><Kicker>مقارنة بالمسار الإنتاجي في إعادة تشغيل</Kicker><Headline size={70}>تحسّن الكلفة وزمن الاستجابة</Headline></div>
 <div style={{position:'absolute',right:115,left:115,top:373,textAlign:'center',opacity:context,transform:`translateY(${(1-unit(f,12,40))*18}px)`}}><div style={{fontSize:29,color:C.foreground}}>دراسة سابقة · ١٧ سبتمبر ٢٠٢٦</div><div style={{fontSize:113,lineHeight:1.6,fontWeight:400,color:C.foreground}}>٤٨ سؤالًا</div><div style={{fontSize:29,color:C.muted}}>العينة نفسها في مساري المقارنة</div></div>
 <div style={{position:'absolute',right:115,top:340,width:760,opacity:costReveal,transform:`translateY(${(1-costReveal)*18}px)`}}>
  <div style={{display:'flex',alignItems:'baseline',gap:35}}><div dir="ltr" style={{fontSize:158,lineHeight:1.2,fontWeight:500,color:C.foreground,letterSpacing:-5}}>40<span style={{fontSize:84}}>%</span></div><div style={{fontSize:31,color:C.muted,lineHeight:1.6}}>انخفاض تقريبي<br/>في متوسط التكلفة</div></div>
  <div dir="ltr" style={{display:'flex',alignItems:'center',gap:33,marginTop:30,fontSize:55,fontWeight:400}}><div><div style={{fontSize:20,color:C.muted,marginBottom:5,textAlign:'center'}}>الإنتاج</div><span style={{color:C.muted}}>$0.0420</span></div><span style={{fontSize:35,color:C.foreground,marginTop:25}}>→</span><div><div style={{fontSize:20,color:C.foreground,marginBottom:5,textAlign:'center'}}>Jev</div><span style={{color:C.foreground}}>$0.0251</span></div></div>
  <div style={{fontSize:23,color:C.muted,marginTop:16}}>تكلفة مقدّرة لكل سؤال · دولار أمريكي</div>
 </div>
 <div style={{position:'absolute',left:115,top:341,width:760,paddingRight:40,borderRight:`1px solid ${C.border}`,opacity:later}}>
  <div style={{fontSize:31,color:C.muted,marginBottom:31}}>وسيط ظهور أول نص مقروء</div>
  {[{n:'13.05',label:'الإنتاج',width:100,color:C.secondary},{n:'9.65',label:'Jev',width:73.92,color:C.foreground}].map((x,i)=><div key={x.n} style={{marginTop:i?34:0}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:12}}><span style={{fontSize:25,color:C.muted}}>{x.label}</span><span dir="ltr" style={{fontSize:67,color:x.color,fontWeight:500}}>{x.n}<span style={{fontSize:24,marginLeft:13}}>s</span></span></div><div style={{height:10,background:C.surface}}><div style={{height:10,width:`${unit(f,latencyAt,latencyAt+75)*x.width}%`,background:x.color}}/></div></div>)}
 </div>
 <div style={{position:'absolute',top:790,left:115,right:115,color:C.muted,fontSize:23,lineHeight:1.7,opacity:costReveal}}>أسعار قائمة، دون التضمينات المتطابقة في المسارين. قياس الزمن من جهاز على شبكة مشتركة.</div>
 </SceneWrap>}

export function Quality({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const first=cue(cueStarts,1,frames*.2);const last=cue(cueStarts,2,frames*.65);const starts=[first,first+(last-first)*.56,last];const counts=[{n:20,title:'تفضيل Jev',color:C.foreground},{n:16,title:'تفضيل الإنتاج',color:C.secondary},{n:12,title:'غير محسوم',color:C.muted}];return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="مقارنة آلية · ٤٨ سؤالًا"/>
 <div style={{position:'absolute',top:147,right:115}}><Kicker>قراءة النتائج بحدودها</Kicker><Headline size={82}>الجودة لم تُحسم</Headline></div>
 <div style={{position:'absolute',top:351,right:120,left:120,display:'flex',gap:55}}>{counts.map((x,j)=><div key={x.n} style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:26}}><span style={{fontSize:29,color:C.muted}}>{x.title}</span><span style={{fontSize:76,color:x.color,fontWeight:500,opacity:.25+.75*unit(f,starts[j],starts[j]+24)}}>{x.n}</span></div><div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:10}}>{Array.from({length:x.n},(_,i)=><div key={i} style={{height:41,borderRadius:4,background:j===2?'transparent':x.color,border:j===2?`2px solid ${C.muted}`:'none',opacity:unit(f,starts[j]+i*2,starts[j]+i*2+22),transform:`scaleY(${unit(f,starts[j]+i*2,starts[j]+i*2+22)})`,transformOrigin:'bottom'}}/>)}</div></div>)}</div>
 <Reveal delay={last} style={{position:'absolute',right:120,left:120,top:763}}><Small>تحكيم بنماذج لغوية في ترتيبي عرض. اختلاف الحكم بين الترتيبين يُعدّ غير محسوم.</Small></Reveal>
 </SceneWrap>}

export function Methods({frames}:Props){const C=palette();const f=useCurrentFrame();return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="إفصاح عن المنهجية"/>
 <div style={{position:'absolute',top:146,right:115}}><Kicker>الدراسة سابقة للتحدي</Kicker><Headline size={72} color={C.foreground}>نتائج محدودة، قابلة للمراجعة</Headline></div>
 <div style={{position:'absolute',right:115,top:345,width:730}}>
  <div style={{fontSize:27,color:C.foreground}}>إجابات تضمنت أخطاء جوهرية</div><div dir="ltr" style={{fontSize:164,color:C.foreground,fontWeight:400,letterSpacing:-8,marginTop:14,lineHeight:1.2}}>6<span style={{color:C.muted,fontSize:95}}> / </span>18</div><div style={{fontSize:32,color:C.foreground,marginTop:18}}>في عينة تدقيق كل مسار</div>
 </div>
 <div style={{position:'absolute',left:115,top:350,width:720,borderRight:`1px solid ${C.border}`,paddingRight:50}}>{[['١٧ سبتمبر ٢٠٢٦','تاريخ التقرير السابق'],['نماذج لغوية','للمفاضلة والتدقيق'],['عينة محدودة','لا تثبت غياب الأخطاء']].map(([a,b],i)=><div key={a} style={{opacity:unit(f,20+i*28,45+i*28),padding:'23px 0',borderBottom:`1px solid ${C.border}`}}><div style={{fontSize:37,color:C.foreground}}>{a}</div><div style={{fontSize:25,color:C.muted,marginTop:10}}>{b}</div></div>)}</div>
 <div style={{position:'absolute',top:794,right:115,left:115,fontSize:24,color:C.muted}}>هذه النتائج لا تصف نشرًا حيًا لمسار Jev، ولا عملًا جديدًا أُنجز خلال أيام التحدي.</div>
 </SceneWrap>}

export function Closing({frames,cueStarts}:Props){const C=palette();const f=useCurrentFrame();const brandAt=cue(cueStarts,2,frames*.39);const brand=unit(f,brandAt,brandAt+35);return <SceneWrap frames={frames}>
 <Canvas/>
 <Corner label="مواد مرجعية جديدة · ٦ أكتوبر ٢٠٢٦"/>
 <Reveal delay={24} style={{position:'absolute',left:245,top:313}}><QafMark width={275}/></Reveal>
 <div style={{position:'absolute',right:115,top:205,width:1160}}>
  <Reveal><Kicker>شرح مستقل وتجربة تعليمية ببيانات مصطنعة</Kicker></Reveal>
  <div style={{fontSize:151,fontWeight:600,lineHeight:1.4,marginTop:40,color:C.foreground}}>قاف</div>
  <div style={{fontSize:67,lineHeight:1.6,color:C.foreground,opacity:brand,transform:`translateY(${(1-brand)*20}px)`}}>سؤالٌ أوضح، ودليلٌ أقرب.</div>
  <div dir="ltr" style={{textAlign:'right',fontSize:43,color:C.foreground,marginTop:40,opacity:unit(f,frames*.58,frames*.72)}}>qaf.ai</div>
 </div>
 <div style={{position:'absolute',top:755,right:115,left:115,opacity:unit(f,frames*.68,frames*.83),fontSize:22,color:C.muted,display:'flex',justifyContent:'space-between',gap:30}}><span>مواد المشاركة والمصدر التعليمي</span><span dir="ltr">tifa2up.github.io/qaf-jev-challenge</span></div>
 </SceneWrap>}

export const SCENES=[Opening,Product,Decisions,Resolver,SyntheticTrace,Results,Quality,Methods,Closing];
