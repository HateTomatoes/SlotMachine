/**
 * Created by 讨厌西红柿 on 2019-10-29
 **/
import React from 'react';
import { Transition } from 'react-transition-group';

const duration = 500;       // 转一圈的时间

const step_length = 1920;       // 一圈总步长

const toRem = (px)=>{
    return `${px/100}rem`;
};

const defaultStyle = (circle)=>( {
    transition: `all ${duration*circle}ms cubic-bezier(0.445, 0.05, 0.55, 0.95)`,
    backgroundPositionY: 0
});

const stepCircle = (state,circle)=>{
    let f = circle - parseInt(circle);
    let transitionStyles = {
        entering: {backgroundPositionY: toRem(step_length * circle)},
        entered: {backgroundPositionY: toRem(step_length * circle)},
        exiting: {backgroundPositionY: toRem(step_length * f), transition: null},
        exited: {backgroundPositionY: toRem(step_length * f), transition: null}
    };
    return transitionStyles[state];
};

export const AnimatorStatus = {
    entering: 'entering',
    entered: 'entered',
    exiting: 'exiting',
    exited: 'exited'
};

function RollingStep({enter, circle, animatorHook, ...other}) {

    const timeout = {
        appear: 0,
        enter: duration*circle,
        exit: 0,
    };

    return (
        <Transition in={enter} timeout={timeout} {...other}>
            {state => {
                animatorHook && animatorHook(state);
                return <dd style={{...defaultStyle(circle), ...stepCircle(state, circle)}}/>
            }}
        </Transition>
    )
}

export default RollingStep;