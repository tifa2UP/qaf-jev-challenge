import {readFile,writeFile,copyFile,mkdir} from 'node:fs/promises';
import {resolve,join} from 'node:path';
import {spawnSync} from 'node:child_process';
import ts from 'typescript';

// The only input is approved generated narration plus its public timing metadata.
// Credentials and provider configuration are intentionally outside this project.
const root=resolve(import.meta.dirname,'..');
const input=resolve(process.argv[2]??join(root,'../production-audio/final-v2'));
const copy=ts.transpileModule(await readFile(join(root,'src/film/content.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
const {SCRIPT}=await import('data:text/javascript;base64,'+Buffer.from(copy).toString('base64'));
const fps=30;
const normalize=s=>s.toLowerCase().replace(/jev/g,'جيف').replace(/gemini/g,'جيميني').normalize('NFKD').replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\p{L}\p{N}]/gu,'');
function flattenWords(words){return words.flatMap(w=>{const chunks=String(w.word??w.text??'').trim().split(/\s+/).filter(Boolean);return chunks.map((word,i)=>({word,start:w.start+(w.end-w.start)*i/chunks.length,end:w.start+(w.end-w.start)*(i+1)/chunks.length}))}).filter(w=>normalize(w.word));}
function align(target,words){
 const a=target.map(normalize),b=words.map(w=>normalize(w.word));
 const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)d[i][0]=i;
 for(let j=0;j<=b.length;j++)d[0][j]=j;
 const sub=(x,y)=>x===y?0:(x.includes(y)||y.includes(x)) ? 0.55 : 1;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+sub(a[i-1],b[j-1]));
 const map=new Map();let i=a.length,j=b.length;
 while(i>0||j>0){if(i&&j&&Math.abs(d[i][j]-d[i-1][j-1]-sub(a[i-1],b[j-1]))<1e-5){map.set(i-1,j-1);i--;j--}else if(i&&Math.abs(d[i][j]-d[i-1][j]-1)<1e-5)i--;else j--;}
 return {map,distance:d[a.length][b.length],target:a.length,recognized:b.length};
}
const scenes=[];
await mkdir(join(root,'public/audio'),{recursive:true});
for(const s of SCRIPT){
 const number=String(s.id).padStart(2,'0');
 const wav=join(input,number+'.wav');
 const probe=spawnSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',wav],{encoding:'utf8'});
 if(probe.status!==0)throw new Error(`Cannot inspect ${wav}: ${probe.stderr}`);
 const duration=Number(probe.stdout.trim());
 const transcript=JSON.parse(await readFile(join(input,number+'-transcript.json'),'utf8'));
 const words=flattenWords(transcript.words??transcript.transcription?.words??[]);
 if(!words.length)throw new Error(`Missing word timing for ${number}`);
 const tokens=s.cues.flatMap(c=>c[0].split(/\s+/).filter(Boolean));
 const alignment=align(tokens,words);
 const audioOffset=s.id===1?24:11;
 let cursor=0;
 const cues=s.cues.map(([ar,en],index)=>{
  const count=ar.split(/\s+/).filter(Boolean).length;
  let first=alignment.map.get(cursor);let last=alignment.map.get(cursor+count-1);
  for(let i=1;first===undefined&&i<count;i++)first=alignment.map.get(cursor+i);
  for(let i=1;last===undefined&&i<count;i++)last=alignment.map.get(cursor+count-1-i);
  if(first===undefined||last===undefined)throw new Error(`Unmatched cue ${number}/${index}`);
  cursor+=count;
  return {start:audioOffset+Math.floor(words[first].start*fps),end:audioOffset+Math.ceil(words[last].end*fps)+5,ar,en};
 });
 // Acoustic review located the standalone Jev intro at 0.235–0.598s; ASR omitted it.
 if(s.id===3)cues[0].start=audioOffset+Math.round(.20*fps);
 // Acoustic review located Qaf at 9.875–10.583s; ASR gave the name zero duration.
 if(s.id===9)cues[2].start=audioOffset+Math.round(9.80*fps);
 for(let i=0;i<cues.length-1;i++)cues[i].end=Math.min(cues[i+1].start-1,cues[i].end+5);
 const audioFrames=Math.ceil(duration*fps);
 const tail=s.id===9?75:15;
 scenes.push({id:s.id,start:0,frames:audioOffset+audioFrames+tail,audioOffset,audioFrames,audioFile:`audio/scene-${number}.wav`,cues,duration,alignment:{distance:alignment.distance,target:alignment.target,recognized:alignment.recognized}});
 await copyFile(wav,join(root,'public/audio',`scene-${number}.wav`));
}
const base=scenes.reduce((a,s)=>a+s.frames,0);
const target=Math.max(base,118*fps);
if(target>=120*fps)throw new Error(`Narration and pacing exceed two-minute limit: ${target/fps}s`);
const weights=[1,.8,1,1,1.3,1.2,.8,.8,1.4];
const extra=target-base;let assigned=0;
for(let i=0;i<scenes.length;i++){const n=i===scenes.length-1?extra-assigned:Math.round(extra*weights[i]/weights.reduce((a,b)=>a+b,0));scenes[i].frames+=n;assigned+=n;}
let start=0;for(const s of scenes){s.start=start;start+=s.frames;}
const output={fps,audioReady:true,totalFrames:start,scenes};
await writeFile(join(root,'src/film/timing.json'),JSON.stringify(output,null,2)+'\n');
await mkdir(join(root,'out'),{recursive:true});
const time=frames=>{const ms=Math.round(frames/fps*1000);const h=Math.floor(ms/3600000);const m=Math.floor(ms/60000)%60;const s=Math.floor(ms/1000)%60;return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms%1000).padStart(3,'0')}`;};
for(const language of ['ar','en']){
 const cues=scenes.flatMap(s=>s.cues.map(c=>({...c,start:s.start+c.start,end:s.start+c.end})));
 const settings=language==='en'?' line:78% position:50% align:center size:85%':'';
 const vtt='WEBVTT\n\n'+cues.map((c,i)=>`${i+1}\n${time(c.start)} --> ${time(c.end)}${settings}\n${c[language]}\n`).join('\n');
 await writeFile(join(root,'out',`qaf-jev-${language}.vtt`),vtt);
 await writeFile(join(root,'out',`qaf-jev-${language}.srt`),cues.map((c,i)=>`${i+1}\n${time(c.start).replace('.',',')} --> ${time(c.end).replace('.',',')}\n${c[language]}\n`).join('\n'));
}
console.log(JSON.stringify({totalSeconds:start/fps,speechSeconds:scenes.reduce((a,s)=>a+s.duration,0),scenes:scenes.map(s=>({id:s.id,start:s.start/fps,seconds:s.frames/fps,alignment:s.alignment}))},null,2));
