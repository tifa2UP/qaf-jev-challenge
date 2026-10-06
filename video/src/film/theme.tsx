import React, {createContext,useContext} from 'react';
import {Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';

// Public visual tokens independently implemented from Qaf's approved identity brief.
export const palette=(dark=false)=>dark?{
 background:'#0A0A0A',foreground:'#FBFBFB',card:'#171717',surface:'#262626',
 muted:'#A3A3A3',secondary:'#A3A3A3',border:'#F5F5F50D',strongBorder:'#F5F5F526',accent:'#262626',
}:{
 background:'#FBFBFB',foreground:'#1D1C1C',card:'#FFFFFF',surface:'#F4F4F5',
 muted:'#71717A',secondary:'#3F3F46',border:'#E8E8E9',strongBorder:'#D4D4D8',accent:'#EAEAEC',
};
export const FONT='"Inter","IBM Plex Sans Arabic",sans-serif';
export const SceneTheme=createContext(false);
export const ease=Easing.bezier(.16,1,.3,1);
export const unit=(frame:number,start=0,end=30)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const linear=(frame:number,start=0,end=30)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const arNum=(n:number)=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[Number(d)]);
export function Reveal({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){const f=useCurrentFrame();const p=unit(f,delay,delay+28);return <div style={{opacity:p,transform:`translateY(${(1-p)*20}px)`,...style}}>{children}</div>}
export function Kicker({children}:{children:React.ReactNode}){const c=palette(useContext(SceneTheme));return <div style={{fontSize:25,fontWeight:500,color:c.muted,marginBottom:18}}>{children}</div>}
export function Headline({children,size=77,color,style={}}:{children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}){const c=palette(useContext(SceneTheme));return <div style={{fontSize:size,fontWeight:600,lineHeight:1.35,letterSpacing:-.5,...style,color:color??c.foreground}}>{children}</div>}
export function Small({children,color,style={}}:{children:React.ReactNode;color?:string;style?:React.CSSProperties}){const c=palette(useContext(SceneTheme));return <div style={{fontSize:26,lineHeight:1.7,color:color??c.muted,...style}}>{children}</div>}
export function QafMark({dark=false,width=200,style={}}:{dark?:boolean;width?:number;style?:React.CSSProperties}){return <Img src={staticFile(`brand/qaf-logomark-${dark?'light':'dark'}.svg`)} style={{width,height:width*585/499,objectFit:'contain',...style}}/>}
export function QafWordmark({dark=false,height=40}:{dark?:boolean;height?:number}){return <Img src={staticFile(`brand/qaf-wordmark-${dark?'light':'dark'}.svg`)} style={{height,width:height*35/20,objectFit:'contain'}}/>}
export function Corner({label}:{label:string}){const dark=useContext(SceneTheme);const c=palette(dark);return <div style={{position:'absolute',top:48,left:96,right:96,height:56,display:'flex',justifyContent:'space-between',alignItems:'center',direction:'rtl',fontSize:22,color:c.muted}}><span>{label}</span><QafWordmark dark={dark} height={42}/></div>}
export function TraceLine({d,progress=1,color,width=2.5}:{d:string;progress?:number;color?:string;width?:number}){const c=palette(useContext(SceneTheme));return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={d} fill="none" stroke={color??c.foreground} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/></svg>}
