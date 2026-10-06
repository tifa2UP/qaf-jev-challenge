import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Composition, Sequence, continueRender, delayRender, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';

const C = {bg:'#0A142B',ink:'#F5F7FE',muted:'#B5C1DB',teal:'#4CD9CC',purple:'#BAA3FF',line:'#30405F',quiet:'#71809B'};
const FPS=30;
const TOTAL=90*FPS;
const font='"Readex Pro", sans-serif';
const fade=(f:number,a=0,b=18)=>interpolate(f,[a,b],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});

function Frame({children,chapter,localDuration}:{children:React.ReactNode;chapter:string;localDuration:number}) {
 const f=useCurrentFrame();
 const opacity=Math.min(fade(f),interpolate(f,[localDuration-18,localDuration],[1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'}));
 return <AbsoluteFill style={{opacity,padding:'70px 100px 90px',direction:'rtl'}}>
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:24,color:C.muted}}>
   <span>{chapter}</span><span dir="ltr" style={{fontWeight:600,color:C.ink,letterSpacing:1}}>QAF AI / JEV</span>
  </div>
  <div style={{position:'absolute',top:117,right:100,left:100,height:1,background:C.line}}/>
  {children}
  <div style={{position:'absolute',bottom:45,right:100,left:100,display:'flex',justifyContent:'space-between',gap:20,fontSize:20,color:C.muted}}>
   <span>عرض توضيحي مستقل · دون محادثات مستفيدين</span><span dir="ltr">qaf.ai</span>
  </div>
 </AbsoluteFill>
}
function Eyebrow({children}:{children:React.ReactNode}){return <div style={{fontSize:27,color:C.teal,fontWeight:500,marginBottom:22}}>{children}</div>}
function Title({children,small=false}:{children:React.ReactNode;small?:boolean}){return <h1 style={{fontSize:small?64:76,lineHeight:1.42,fontWeight:650,margin:0,color:C.ink}}>{children}</h1>}
function Lead({children}:{children:React.ReactNode}){return <div style={{fontSize:36,lineHeight:1.8,color:C.muted,marginTop:28}}>{children}</div>}
function Reveal({children,delay=0}:{children:React.ReactNode;delay?:number}){const f=useCurrentFrame();const p=fade(f,delay,delay+23);return <div style={{opacity:p,transform:`translateY(${(1-p)*20}px)`}}>{children}</div>}

function Cover(){return <Frame chapter="تحدي الذكاء الاصطناعي في خدمة المحتوى الإسلامي" localDuration={12*FPS}>
 <div style={{marginTop:155,maxWidth:1500}}>
  <Eyebrow>مسار الحوار المعرفي والإجابات الموثوقة</Eyebrow>
  <Reveal><div style={{fontSize:160,fontWeight:650,lineHeight:1.3}}>قاف <span dir="ltr" style={{color:C.teal,fontSize:112}}>AI</span></div></Reveal>
  <Reveal delay={18}><div style={{fontSize:60,color:C.purple,marginTop:28}}>مسار <bdi>Jev</bdi> التجريبي للبحث في الأدلة</div></Reveal>
  <Reveal delay={38}><Lead>شرح معماري ونتائج دراسة سابقة<br/>مع فصل واضح عن مواد المشاركة الجديدة</Lead></Reveal>
 </div>
 <div style={{position:'absolute',left:104,bottom:158,color:C.muted,fontSize:25}}>عبد اللطيف عبد الفتاح</div>
 </Frame>}

function Problem(){const points=[['الوصول إلى النص','ما المقاطع ذات الصلة بالسؤال؟'],['فحص السياق','هل تكفي الأدلة لصياغة الإجابة؟'],['إتاحة المراجعة','كيف يرجع القارئ إلى موضع الاستشهاد؟']];return <Frame chapter="١ · الحاجة" localDuration={12*FPS}>
 <div style={{marginTop:82}}><Eyebrow>للباحث والقارئ في المعرفة الإسلامية</Eyebrow><Title>الإجابة تبدأ بالبحث في المصادر</Title></div>
 <div style={{marginTop:64}}>{points.map(([a,b],i)=><Reveal key={a} delay={25+i*52}><div style={{display:'flex',alignItems:'center',gap:34,padding:'28px 0',borderBottom:`1px solid ${C.line}`}}><span style={{width:62,fontSize:29,color:C.teal}}>0{i+1}</span><div style={{width:340,fontSize:37,fontWeight:550}}>{a}</div><div style={{fontSize:32,color:C.muted}}>{b}</div></div></Reveal>)}</div>
 </Frame>}

function Architecture(){const f=useCurrentFrame();const steps=[['السؤال','تصنيف الحاجة ونوع الطلب'],['Jev','تقييم المقاطع ومراجعة كفايتها'],['حزمة الأدلة','تجميع مقاطع مرقّمة'],['Gemini','صياغة الإجابة من الأدلة']];return <Frame chapter="٢ · آلية العمل" localDuration={18*FPS}>
 <div style={{marginTop:76}}><Eyebrow>رسم تفسيري للمسار الموصوف في التقرير</Eyebrow><Title small>قرارات الاسترجاع تسبق صياغة الإجابة</Title></div>
 <div style={{display:'flex',gap:48,marginTop:95,alignItems:'stretch'}}>{steps.map(([title,desc],i)=><div key={title} style={{flex:1,opacity:fade(f,20+i*38,50+i*38),transform:`translateY(${(1-fade(f,20+i*38,50+i*38))*16}px)`}}><div style={{color:i%2?C.purple:C.teal,fontSize:24,marginBottom:25}}>0{i+1}</div><div style={{borderTop:`4px solid ${i%2?C.purple:C.teal}`,paddingTop:30,fontSize:40,fontWeight:600,height:95}}>{title}</div><div style={{fontSize:29,lineHeight:1.75,color:C.muted}}>{desc}</div></div>)}</div>
 <Reveal delay={175}><div style={{marginTop:72,fontSize:33,lineHeight:1.8,color:C.ink,maxWidth:1620}}>تضبط الشفرة خطوات المتابعة، وتربط أرقام الإحالات بالمقاطع المعروفة.</div><div style={{fontSize:27,color:C.muted,marginTop:18}}>ربط المعرّفات وحده لا يضمن صحة المعنى أو الاستنتاج.</div></Reveal>
 </Frame>}

function Metric({heading,unit,jev,prod,maximum,format}:{heading:string;unit:string;jev:number;prod:number;maximum:number;format:(v:number)=>string}){const f=useCurrentFrame();const p=fade(f,30,95);return <div style={{flex:1,padding:'0 28px'}}>
 <div style={{fontSize:31,fontWeight:550,lineHeight:1.65}}>{heading}</div><div style={{fontSize:23,color:C.muted,marginTop:6}}>{unit}</div>
 {[{label:'Jev التجريبي',value:jev,color:C.teal},{label:'مسار الإنتاج',value:prod,color:C.purple}].map(x=><div key={x.label} style={{marginTop:42}}><div style={{display:'flex',alignItems:'baseline',justifyContent:'space-between',marginBottom:17}}><span style={{fontSize:29,color:C.muted}}>{x.label}</span><span dir="ltr" style={{fontSize:53,color:x.color,fontWeight:600,fontVariantNumeric:'tabular-nums'}}>{format(x.value)}</span></div><div style={{height:19,background:'#182741'}}><div style={{height:'100%',background:x.color,width:`${p*x.value/maximum*100}%`}}/></div></div>)}
 </div>}
function Efficiency(){return <Frame chapter="٣ · نتائج الدراسة السابقة" localDuration={18*FPS}>
 <div style={{marginTop:73}}><Eyebrow>٤٨ سؤالًا · تقرير ١٧ سبتمبر ٢٠٢٦</Eyebrow><Title small>تكلفة أقل، وظهور أسرع للنص في التجربة</Title></div>
 <div style={{display:'flex',gap:90,marginTop:68}}><Metric heading="متوسط التكلفة المقدّرة لكل سؤال" unit="دولار أمريكي" jev={.0251} prod={.0420} maximum={.045} format={v=>'$'+v.toFixed(4)}/><div style={{width:1,background:C.line}}/><Metric heading="وسيط ظهور أول نص مقروء" unit="ثانية" jev={9.65} prod={13.05} maximum={14} format={v=>v.toFixed(2)}/></div>
 <Reveal delay={100}><div style={{marginTop:70,fontSize:25,lineHeight:1.75,color:C.muted}}>مقارنة إعادة تشغيل محدودة. التكلفة تستثني التضمينات المتطابقة في المسارين.<br/>قياس الزمن من جهاز على شبكة مشتركة، وليس قياسًا لنشر حي.</div></Reveal>
 </Frame>}

function Quality(){const f=useCurrentFrame();const scores=[{n:20,label:'أفضلية Jev',c:C.teal},{n:16,label:'أفضلية الإنتاج',c:C.purple},{n:12,label:'غير محسوم',c:C.quiet}];return <Frame chapter="٤ · الجودة والحدود" localDuration={18*FPS}>
 <div style={{marginTop:70}}><Eyebrow>المحكّم والمدقّق نماذج لغوية</Eyebrow><Title small>الأفضلية في جودة الإجابات لم تُحسم</Title></div>
 <div style={{display:'flex',direction:'rtl',marginTop:65,gap:7,height:38}}>{scores.map(s=><div key={s.n} style={{width:`${s.n/48*100}%`,background:s.c,opacity:fade(f,25,55)}}/>)}</div>
 <div style={{display:'flex',gap:50,marginTop:27}}>{scores.map(s=><div key={s.n} style={{flex:s.n,fontSize:28,color:C.muted}}><span style={{fontSize:62,color:s.c,fontWeight:600,display:'block'}}>{s.n}</span>{s.label}</div>)}</div>
 <Reveal delay={100}><div style={{marginTop:57,paddingTop:32,borderTop:`1px solid ${C.line}`,display:'flex',alignItems:'center',gap:50}}><div dir="ltr" style={{fontSize:85,fontWeight:600,color:C.ink}}>6 / 18</div><div style={{fontSize:31,color:C.muted,lineHeight:1.75}}>إجابات تضمنت أخطاء جوهرية في كل مسار<br/><span style={{fontSize:25}}>في عينة التدقيق. النتيجة لا تثبت غياب الهلوسة.</span></div></div></Reveal>
 <div style={{marginTop:35,fontSize:23,color:C.muted}}>٤٨ مقارنة · ١٨ إجابة مدققة لكل مسار · الدراسة سابقة للتحدي</div>
 </Frame>}

function Scope(){return <Frame chapter="٥ · ما الذي تقدمه مواد المشاركة؟" localDuration={12*FPS}>
 <div style={{marginTop:70}}><Eyebrow>إفصاح عن النطاق والتاريخ</Eyebrow><Title small>شرح مستقل، ومصادر وقيود واضحة</Title></div>
 <div style={{marginTop:48,fontSize:33,lineHeight:1.9}}>
  <Reveal delay={15}><div><span style={{color:C.teal}}>١٧ سبتمبر:</span> دراسة Jev السابقة ونتائجها المجمّعة.</div></Reveal>
  <Reveal delay={42}><div><span style={{color:C.purple}}>٦ أكتوبر:</span> مواد توضيحية ومرجع تعليمي ببيانات مصطنعة.</div></Reveal>
  <Reveal delay={65}><div style={{color:C.muted,marginTop:24,fontSize:30}}>الفيديو يشرح البنية. لا يعرض نشرًا حيًا لمسار Jev.<br/>قاف أداة مساعدة للبحث والفهم، مع الرجوع للمصادر وأهل الاختصاص.</div></Reveal>
 </div>
 <Reveal delay={95}><div style={{marginTop:60,fontSize:24,color:C.teal}}>مواد المشاركة والمصدر التعليمي</div><div dir="ltr" style={{fontSize:34,marginTop:18,textAlign:'right',color:C.ink}}>tifa2up.github.io/qaf-jev-challenge</div></Reveal>
 </Frame>}

function Video(){const f=useCurrentFrame();const [handle]=useState(()=>delayRender('Loading bundled Arabic font'));useEffect(()=>{const face=new FontFace('Readex Pro',`url(${staticFile('fonts/ReadexPro.ttf')})`,{weight:'100 900'});face.load().then(loaded=>{(document.fonts as FontFaceSet & {add:(face:FontFace)=>void}).add(loaded);continueRender(handle)}).catch(e=>{console.error(e);continueRender(handle)})},[handle]);return <AbsoluteFill style={{fontFamily:font,background:C.bg,color:C.ink}}>
 <AbsoluteFill style={{background:'radial-gradient(ellipse at 12% 30%, #3F286229 0%, transparent 62%), radial-gradient(ellipse at 88% 85%, #087B7822 0%, transparent 65%)'}}/>
 <Sequence from={0} durationInFrames={360}><Cover/></Sequence>
 <Sequence from={360} durationInFrames={360}><Problem/></Sequence>
 <Sequence from={720} durationInFrames={540}><Architecture/></Sequence>
 <Sequence from={1260} durationInFrames={540}><Efficiency/></Sequence>
 <Sequence from={1800} durationInFrames={540}><Quality/></Sequence>
 <Sequence from={2340} durationInFrames={360}><Scope/></Sequence>
 <div style={{position:'absolute',bottom:0,left:0,height:5,width:`${f/(TOTAL-1)*100}%`,background:C.teal}}/>
 </AbsoluteFill>}
const Root=()=> <Composition id="QafJevArabic" component={Video} width={1920} height={1080} fps={FPS} durationInFrames={TOTAL}/>;
registerRoot(Root);
