import {mkdir,rm} from 'node:fs/promises';
import {spawn} from 'node:child_process';
import {resolve,join} from 'node:path';

const root=resolve(import.meta.dirname,'..');
const temporary=join(root,'out/previews/qaf-jev-render.mp4');
const output=join(root,'out/qaf-jev-ar.mp4');
await mkdir(join(root,'out/previews'),{recursive:true});
const run=(file,args)=>new Promise((resolve,reject)=>{
 const process=spawn(file,args,{cwd:root,stdio:'inherit'});
 process.on('error',reject);
 process.on('exit',code=>code===0?resolve():reject(new Error(`${file} exited ${code}`)));
});
await run(process.execPath,[join(root,'node_modules/@remotion/cli/remotion-cli.js'),
 'render','src/index.tsx','QafJevArabic',temporary,
 '--codec=h264','--crf=19','--concurrency=4']);
// Move MP4 metadata to the beginning so hosted playback need not download the full film.
await run('ffmpeg',['-hide_banner','-loglevel','warning','-y','-i',temporary,
 '-map','0','-c','copy','-movflags','+faststart',output]);
await rm(temporary);
console.log(`Web-ready MP4: ${output}`);
