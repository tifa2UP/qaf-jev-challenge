import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {Film,Poster,TIMING} from './film/Film';
const Root=()=> <><Composition id="QafJevArabic" component={Film} width={1920} height={1080} fps={TIMING.fps} durationInFrames={TIMING.totalFrames}/><Composition id="QafJevPoster" component={Poster} width={1920} height={1080} fps={TIMING.fps} durationInFrames={400}/></>;
registerRoot(Root);
