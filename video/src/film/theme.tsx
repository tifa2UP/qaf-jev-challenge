import React from 'react';
import {Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

export const C={navy:'#071923',deep:'#040D15',paper:'#F3EEE2',ink:'#17332F',white:'#F7F3E8',muted:'#A9BFC1',green:'#5BD6B0',greenDark:'#166E58',purple:'#BEAAEB',gold:'#D3B983',line:'#355052'};
export const ease=Easing.bezier(0.16,1,0.3,1);
export const unit=(frame:number,start=0,end=30)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
export const linear=(frame:number,start=0,end=30)=>interpolate(frame,[start,end],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
export const arNum=(n:number)=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[Number(d)]);

export function Reveal({children,delay=0,style={}}:{children:React.ReactNode;delay?:number;style?:React.CSSProperties}){const f=useCurrentFrame();const p=unit(f,delay,delay+35);return <div style={{opacity:p,transform:`translateY(${(1-p)*35}px)`,...style}}>{children}</div>}
export function Kicker({children,light=false}:{children:React.ReactNode;light?:boolean}){return <div style={{fontSize:25,fontWeight:500,color:light?C.greenDark:C.green,marginBottom:18,letterSpacing:.1}}>{children}</div>}
export function Headline({children,size=77,color=C.white,style={}}:{children:React.ReactNode;size?:number;color?:string;style?:React.CSSProperties}){return <div style={{fontSize:size,fontWeight:550,lineHeight:1.35,letterSpacing:-1,...style,color}}>{children}</div>}
export function Small({children,color=C.muted,style={}}:{children:React.ReactNode;color?:string;style?:React.CSSProperties}){return <div style={{fontSize:26,lineHeight:1.7,color,...style}}>{children}</div>}
export function Corner({label,light=false}:{label:string;light?:boolean}){return <div style={{position:'absolute',top:58,left:95,right:95,display:'flex',justifyContent:'space-between',alignItems:'center',direction:'rtl',fontSize:22,color:light?C.greenDark:C.muted}}><span>{label}</span><span dir="ltr" style={{fontWeight:600,letterSpacing:3,color:light?C.ink:C.white}}>QAF</span></div>}
export function PaperLines({width=600,rows=6}:{width?:number;rows?:number}){return <div>{Array.from({length:rows},(_,i)=><div key={i} style={{height:8,width:width*(.62+(i%3)*.13),marginTop:16,background:'currentColor',opacity:.18}}/>)}</div>}
export function Visual({name,style={}}:{name:string;style?:React.CSSProperties}){return <Img src={staticFile('visuals/'+name)} style={{width:'100%',height:'100%',objectFit:'cover',...style}}/>}
export function TraceLine({d,progress=1,color=C.green,width=3}:{d:string;progress?:number;color?:string;width?:number}){return <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1-progress}/></svg>}
