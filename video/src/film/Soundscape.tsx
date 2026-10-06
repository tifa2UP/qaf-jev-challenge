import React from 'react';
import {AbsoluteFill, Html5Audio, Sequence, staticFile, useCurrentFrame} from 'remotion';
import timing from './timing.json';
import {linear} from './theme';

// Original procedural sound textures by this project's creator. No sampled music.
export function Soundscape(){
 const f=useCurrentFrame();
 const speaking=timing.scenes.some(s=>f>=s.start+s.audioOffset&&f<s.start+s.audioOffset+s.audioFrames);
 const fadeIn=linear(f,0,50);
 const fadeOut=1-linear(f,timing.totalFrames-100,timing.totalFrames-1);
 const volume=(speaking?.38:.58)*fadeIn*fadeOut;
 const citationA=timing.scenes[3];
 const citationB=timing.scenes[4];
 const closing=timing.scenes[8];
 const cueAt=(scene:typeof citationA,index:number,fallback:number)=>
  (scene.cues as {start:number}[])[index]?.start??Math.round(scene.frames*fallback);
 return <AbsoluteFill>
  <Html5Audio src={staticFile('audio/sfx-room.wav')} volume={volume} loop/>
  {[timing.scenes[1].start-7,timing.scenes[4].start-7].map((start,i)=><Sequence key={i} from={start} durationInFrames={25}><Html5Audio src={staticFile('audio/sfx-page.wav')} volume={.75}/></Sequence>)}
  {[citationA.start+cueAt(citationA,2,.55),citationB.start+cueAt(citationB,1,.27)].map((start,i)=><Sequence key={i} from={start} durationInFrames={15}><Html5Audio src={staticFile('audio/sfx-citation.wav')} volume={.8}/></Sequence>)}
  <Sequence from={closing.start+cueAt(closing,2,.57)} durationInFrames={84}><Html5Audio src={staticFile('audio/sfx-resolve.wav')} volume={.72}/></Sequence>
 </AbsoluteFill>
}
