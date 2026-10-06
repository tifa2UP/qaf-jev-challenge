import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Html5Audio, Sequence, cancelRender, continueRender, delayRender, staticFile, useCurrentFrame} from 'remotion';
import timing from './timing.json';
import {SCRIPT} from './content';
import {Opening, SCENES} from './scenes';
import {C, linear} from './theme';
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

function Subtitles({scene}:{scene:TimedScene}){const f=useCurrentFrame();const cue=cuesFor(scene).find(c=>f>=c.start&&f<c.end);return <>
 <div style={{position:'absolute',bottom:0,left:0,right:0,height:238,background:'linear-gradient(0deg,#040D15F5 0%,#040D15C9 57%,#040D1500 100%)'}}/>
 {cue&&<div dir="rtl" style={{position:'absolute',bottom:64,left:165,right:165,textAlign:'center',fontSize:46,fontWeight:450,lineHeight:1.55,color:'#FFFFFF',textShadow:'0 3px 20px #000A',opacity:Math.min(linear(f,cue.start,cue.start+3),1-linear(f,cue.end-2,cue.end))}}>{cue.ar}</div>}
 </>}

function TimedShot({scene}:{scene:TimedScene}){const Shot=SCENES[scene.id-1];return <AbsoluteFill>
 <Shot frames={scene.frames} cueStarts={cuesFor(scene).map(c=>c.start)}/>
 <Subtitles scene={scene}/>
 {timing.audioReady&&<Sequence from={scene.audioOffset} durationInFrames={scene.audioFrames}><Html5Audio src={staticFile(scene.audioFile)} volume={1}/></Sequence>}
 </AbsoluteFill>}

function useFilmFont(){const [handle]=useState(()=>delayRender('Load licensed Arabic film typography'));
 useEffect(()=>{const face=new FontFace('Readex Pro',`url(${staticFile('fonts/ReadexPro.ttf')})`,{weight:'100 900'});face.load().then(loaded=>{(document.fonts as FontFaceSet & {add:(face:FontFace)=>void}).add(loaded);continueRender(handle)}).catch(cancelRender)},[handle]);
}

export function Poster(){useFilmFont();return <AbsoluteFill style={{fontFamily:'"Readex Pro",sans-serif',background:C.deep,color:C.white}}>
 <Opening frames={400} cueStarts={[0,0,65]}/>
 <div dir="rtl" style={{position:'absolute',right:115,bottom:132,left:115,display:'flex',alignItems:'baseline',gap:30,fontSize:47,color:C.white}}><span>قاف × <bdi>Jev</bdi></span><span style={{fontSize:26,color:C.muted}}>من السؤال إلى الدليل</span></div>
 </AbsoluteFill>}

export function Film(){const f=useCurrentFrame();useFilmFont();
 const endOpacity=1-linear(f,timing.totalFrames-19,timing.totalFrames-1);
 return <AbsoluteFill style={{fontFamily:'"Readex Pro",sans-serif',background:C.deep,color:C.white,opacity:endOpacity}}>
  {timing.scenes.map(s=><Sequence key={s.id} from={s.start} durationInFrames={s.frames}><TimedShot scene={s as TimedScene}/></Sequence>)}
  {timing.audioReady&&<Soundscape/>}
 </AbsoluteFill>;
}
