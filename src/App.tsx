import React, {useCallback, useState} from 'react';
import './App.css';
import {  Space,Switch } from 'antd';

function App() {
    const [nav,setNav] = useState<string[]>([]);

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
        if(checked){
            setNav([...nav,value])
        }else{
            nav.filter((item => item !== value))
        }
    },[nav])

    console.log(nav,'nav')
  return (
    <div className="main">
        <div className="content">
            <header className="headerTitle">AI头像生成器 V1.0</header>
            <section>
                <article className="tagContainer">
                    <Space>
                        {navItem.map(item=>(
                            <Space key={item.value} className="navItem">
                                <Switch onChange={(checked)=>navChange(checked,item.value)} />
                                {item.label}
                            </Space>
                        ))}
                    </Space>
                </article>
                <article className="imgContainer" />
            </section>
        </div>
    </div>
  );
}

export default App;
