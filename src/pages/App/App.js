import React from 'react';
import { Button } from 'antd-mobile';
import Tiger from '@components/Tiger';

const App = () => {

    const ref = React.createRef();

    const clickOnWinning = (winStep)=>{
        ref.current.winning(winStep);
    };

    const clickOnFailed = ()=>{
        ref.current.losing();
    };

    return (
        <div>
            <Tiger ref={ref} />
            <Button type="primary" onClick={()=>clickOnWinning(Tiger.APPLE)} style={{margin:24}}>赢（苹果）</Button>
            <Button type="primary" onClick={()=>clickOnWinning(Tiger.GRAPE)} style={{margin:24}}>赢（葡萄）</Button>
            <Button type="primary" onClick={()=>clickOnWinning(Tiger.PEAR)} style={{margin:24}}>赢（梨）</Button>
            <Button type="primary" onClick={()=>clickOnWinning(Tiger.LEMON)} style={{margin:24}}>赢（柠檬）</Button>
            <Button onClick={clickOnFailed} style={{margin:24}} >开始游戏(输)</Button>
        </div>
    );
};

export default App;
