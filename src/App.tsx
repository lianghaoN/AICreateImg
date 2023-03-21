import React, {useCallback, useState} from 'react';
import './App.css';
import { Switch, Tag, Space } from 'antd';

function App() {
    const [nav,setNav] = useState<string[]>([]);
    const [activeTag, setActiveTag] = useState<{value:string,label:string}[]>([]);
    console.log(setActiveTag);

    const navItem = [
        {
            value:'add',
            label:'增加权重'
        },
        {
            value:'reduce',
            label:'降低权重'
        },
    ]

    const navChange = useCallback((checked:boolean,value:string)=>{
        if(checked) setNav([...nav,value]);
        else setNav(nav.filter((item => item !== value)));
    },[nav])

    console.log(nav,'nav')
  return (
    <div className="main">
        <div className="content">
            <header className="headerTitle">AI头像生成器 V1.0</header>
            <section>
                <article className="tagContainer">
                    <nav className="navContainer">
                        {navItem.map(item=>(
                            <div key={item.value} className="navItem">
                                <div className="navLabel">{item.label}:</div>
                                <Switch onChange={(checked)=>navChange(checked,item.value)} className={"antSwitch"} />
                            </div>
                        ))}
                    </nav>
                    <div className="activeTags">
                        <Space size={[0, 8]} wrap>
                            {activeTag?.map(item=>(
                              <Tag color="volcano" key={item.value}>{item.value}</Tag>
                            ))}
                        </Space>
                    </div>
                </article>
                <article className="imgContainer" />
            </section>
        </div>
    </div>
  );
}

export default App;
