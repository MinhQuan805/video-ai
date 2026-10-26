import {Easing, interpolate, spring} from 'remotion';

export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const softOut = Easing.bezier(0.16, 1, 0.3, 1);
const softTravel = Easing.bezier(0.65, 0, 0.25, 1);

export const ease = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: softOut});

export const travel = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: softTravel});

export const settle = (frame: number, start: number, fps: number, duration = 26) =>
  frame < start ? 0 : spring({frame: frame - start, fps, durationInFrames: duration,
    config: {mass: 0.8, damping: 16, stiffness: 125}});

export const layer = (frame: number, start: number, fps: number, distance = 26) => {
  const p = settle(frame, start, fps);
  const visibility = ease(frame, start, start + 13);
  return {opacity: visibility, transform: `translateY(${(1 - p) * distance}px) scale(${0.975 + p * 0.025})`,
    filter: `blur(${(1 - visibility) * 3}px)`};
};
