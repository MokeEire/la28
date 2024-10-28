import { PUBLIC_MAPTILER_KEY } from '$env/static/public';

export const hasMaptilerKey = PUBLIC_MAPTILER_KEY && PUBLIC_MAPTILER_KEY !== 'key';
export const streetsStyle = `https://api.maptiler.com/maps/streets-v2/style.json?key=${PUBLIC_MAPTILER_KEY}`;

export const mapClasses =
  'relative w-[50%] min-w-[700px] aspect-[9/16] max-h-[560px] sm:max-h-[560px] sm:aspect-video mx-auto my-5';