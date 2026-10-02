import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';
import { gsap } from './scroll';

// GSAP plugins only the sections below the first screen use; loaded together with them.
gsap.registerPlugin(SplitText, DrawSVGPlugin);

export { SplitText };
