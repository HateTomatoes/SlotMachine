import React, {Component} from 'react';
import s from './Tiger.module.css';

import _ from 'lodash';

import RollingStep from './components/RollingStep';

const APPLE = 0;
const GRAPE = 1;
const PEAR = 2;
const LEMON = 3;

const BASE_CIRCLE = 5;   // 基础旋转次数
// const CHANCE = [APPLE, GRAPE, PEAR, LEMON, LEMON, LEMON, LEMON, LEMON, LEMON, LEMON];  // 步数概率
const CHANCE = [APPLE, GRAPE, PEAR, LEMON];  // 步数概率，这里可以调整各个水果的中奖概率
const STEPS = [APPLE, GRAPE, PEAR, LEMON];     // 基础步数
const WINNING_STEP = LEMON;     // 中奖步数


const adjustStep = (targetStep) => {
    let step_length = STEPS.length;
    return targetStep / step_length;
};

const calcStep = (winning, winStep=WINNING_STEP) => {
    let result = [];
    if (winning) {
        let circle1 = adjustStep(winStep) + BASE_CIRCLE;
        let circle2 = adjustStep(winStep) + BASE_CIRCLE + 2;
        let circle3 = adjustStep(winStep) + BASE_CIRCLE + 4;
        result = [circle1, circle2, circle3];
    } else {
        // 第一个格子随便转，四个水果概率相等
        let step_f = _.random(0, CHANCE.length - 1);
        let firstChance = CHANCE[step_f];
        let circle1 = adjustStep(firstChance) + BASE_CIRCLE;

        // 第二个格子转到与第一个格子相同的水果的概率为70%
        let ary = _.concat(CHANCE, new Array(6).fill(firstChance));
        step_f = _.random(0, ary.length - 1);
        let secondChance = ary[step_f];
        let circle2 = adjustStep(secondChance) + BASE_CIRCLE + 2;

        let circle3 = 0;
        // 第三次 && firstChance === WINNING_STEP
        if (firstChance === secondChance) {
            // 如果前两次都随机到WINNING_STEP，则把WINNING_STEP移出数组再进行随机，不然就特么中奖了要
            let next = _.without(CHANCE, firstChance);
            step_f = _.random(0, next.length - 1);
            circle3 = adjustStep(next[step_f]) + BASE_CIRCLE + 4;
        } else {
            step_f = _.random(0, CHANCE.length - 1);
            circle3 = adjustStep(CHANCE[step_f]) + BASE_CIRCLE + 4;
        }
        result = [circle1, circle2, circle3];
    }

    return result;
};

const rollingData = (enter, circle) => {
    return {enter, circle};
};

const defaultData = [
    rollingData(false, adjustStep(APPLE)),
    rollingData(false, adjustStep(GRAPE)),
    rollingData(false, adjustStep(PEAR))
];

class Tiger extends Component {

    static APPLE = APPLE;
    static GRAPE = GRAPE;
    static PEAR = PEAR;
    static LEMON = LEMON;

    constructor(props) {
        super(props);
        this.state = {
            rollingStep: defaultData,
        };

        this.animationStatus = "initialize";    // 记录游戏状态
    }

    get __canDoAnimation() {
        return this.animationStatus !== 'start' && this.animationStatus !== 'running';
    }

    clickOnBtn = () => {
        this.__canDoAnimation && this.beginGame();
    };

    beginGame(winning, winStep) {
        if (!this.__canDoAnimation) {
            return;
        }
        this.animationStatus = 'start';
        this.__run(calcStep(winning, winStep));
    }

    winning(winStep = LEMON){
        this.beginGame(true, winStep);
    }

    losing(){
        this.beginGame(false);
    }


    __run(circles) {
        this.animationStatus = "running";
        console.log(circles);
        let {rollingStep} = this.state;
        circles.forEach((circle, index) => {
            setTimeout(() => {
                let data = rollingStep[index];
                data.enter = true;
                data.circle = circle;
                this.setState({rollingStep});
            }, 200 * index);
        });
    }

    animationEnd(node, index) {
        if (index === 2) {
            this.animationStatus = "end";
        }
    };

    animationOnEntered(node, isAppearing, index) {
        let {rollingStep} = this.state;
        rollingStep[index].enter = false;
        this.setState({rollingStep});
    }

    render() {
        let { rollingStep } = this.state;
        return (
            <div className={s.root}>
                <div className={s.slotMach}>
                    <img src={require('./img/tinsel1.png')} alt=''/>
                    <div className={s.rollingArea}>
                        <dl className={s.scrollList}>
                            {
                                rollingStep.map((data, index) => (
                                    <RollingStep enter={data.enter}
                                                 circle={data.circle}
                                                 key={index}
                                                 onEntered={(node, isAppearing) => this.animationOnEntered(node, isAppearing, index)}
                                                 onExited={(node) => this.animationEnd(node, index)}/>
                                ))
                            }
                        </dl>
                        <img src={require('./img/shadow.png')} alt={''}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tiger;