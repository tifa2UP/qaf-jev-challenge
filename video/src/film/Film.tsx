import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Html5Audio, Sequence, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import timing from './timing.json';
import {SCRIPT} from './content';
import {Opening, SCENES} from './scenes';
import {FONT, palette, linear} from './theme';
import {Soundscape} from './Soundscape';

type Cue={start:number;end:number;ar:string;en:string};
type TimedScene={id:number;start:number;frames:number;audioOffset:number;audioFrames:number;audioFile:string;cues:Cue[]};

export const TIMING=timing;
export function cuesFor(scene:TimedScene):Cue[]{
 if(scene.cues.length)return scene.cues;
 const copy=SCRIPT[scene.id-1].cues;
 const weights=copy.map(c=>c[0].split(/\s+/).length);
 const total=weights.reduce((a,b)=>a+b,0);
 let cursor=scene.audioOffset;
 return copy.map((c,i)=>{const start=cursor;cursor+=scene.audioFrames*weights[i]/total;return {start:Math.round(start),end:Math.round(cursor),ar:c[0],en:c[1]}});
}

function Subtitles({scene}:{scene:TimedScene}){const f=useCurrentFrame();const dark=[3,6].includes(scene.id);const c=palette(dark);const cue=cuesFor(scene).find(c=>f>=c.start&&f<c.end);return <>
 <div style={{position:'absolute',bottom:0,left:0,right:0,height:238,background:dark?'linear-gradient(0deg,#0A0A0A 0%,#0A0A0AF0 57%,#0A0A0A00 100%)':'linear-gradient(0deg,#FBFBFB 0%,#FBFBFBF0 57%,#FBFBFB00 100%)'}}/>
 {cue&&<div dir="rtl" style={{position:'absolute',bottom:64,left:165,right:165,textAlign:'center',fontSize:44,fontWeight:500,lineHeight:1.55,color:c.foreground,opacity:Math.min(linear(f,cue.start,cue.start+3),1-linear(f,cue.end-2,cue.end))}}>{cue.ar}</div>}
 </>}

function TimedShot({scene}:{scene:TimedScene}){const Shot=SCENES[scene.id-1];return <AbsoluteFill style={{background:palette([3,6].includes(scene.id)).background}}>
 <Shot frames={scene.frames} cueStarts={cuesFor(scene).map(c=>c.start)}/>
 <Subtitles scene={scene}/>
 {timing.audioReady&&<Sequence from={scene.audioOffset} durationInFrames={scene.audioFrames}><Html5Audio src={staticFile(scene.audioFile)} volume={1}/></Sequence>}
 </AbsoluteFill>}

function useFilmFont(){const [handle]=useState(()=>delayRender('Load Qaf production fonts'));
 useEffect(()=>{
  const names=[['Regular',400],['Medium',500],['SemiBold',600],['Bold',700]] as const;
  const faces=names.flatMap(([name,weight])=>[
   new FontFace('Inter',`url(${staticFile(`brand/Inter-${name}.woff2`)})`,{weight:String(weight)}),
   new FontFace('IBM Plex Sans Arabic',`url(${staticFile(`brand/IBMPlexSansArabic-${name}.woff2`)})`,{weight:String(weight),unicodeRange:'U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF',sizeAdjust:'110%'} as FontFaceDescriptors),
  ]);
  Promise.all(faces.map(face=>face.load())).then(loaded=>{loaded.forEach(face=>(document.fonts as FontFaceSet & {add:(face:FontFace)=>void}).add(face));continueRender(handle)}).catch(cancelRender);
 },[handle]);
}

export function Poster(){useFilmFont();return <AbsoluteFill style={{fontFamily:FONT,background:palette().background,color:palette().foreground}}>
 <Opening frames={400} cueStarts={[0,0,65]}/>
 <div dir="rtl" style={{position:'absolute',right:115,bottom:132,left:115,display:'flex',alignItems:'baseline',gap:30,fontSize:47,color:palette().foreground}}><span>قاف × <bdi>Jev</bdi></span><span style={{fontSize:26,color:palette().muted}}>من السؤال إلى الدليل</span></div>
 </AbsoluteFill>}

export function Film(){const f=useCurrentFrame();useFilmFont();
 const endOpacity=1-linear(f,timing.totalFrames-19,timing.totalFrames-1);
 return <AbsoluteFill style={{fontFamily:FONT,background:palette().background,color:palette().foreground,opacity:endOpacity}}>
  {timing.scenes.map(s=><Sequence key={s.id} from={s.start} durationInFrames={s.frames}><TimedShot scene={s as TimedScene}/></Sequence>)}
  {timing.audioReady&&<Soundscape/>}
 </AbsoluteFill>;
}
