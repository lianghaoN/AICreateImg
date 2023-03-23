import React, { useCallback, useState } from 'react';
import './App.css';
import { Switch, Tag, Space, Button, Tabs, message } from 'antd';
import {
  AreaChartOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { tagData, TagDataType } from './utils/tagData';
import { delSymbol, getNum } from './utils';

const tagColor = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];

const navItem = [
  {
    value: 'add',
    label: '增加权重',
  },
  {
    value: 'reduce',
    label: '降低权重',
  },
];

function App() {
  const [nav, setNav] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<
    { value: string; label: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>('常用');
  const [messageApi, contextHolder] = message.useMessage();

  const navChange = useCallback(
    (checked: boolean, value: string) => {
      if (checked) setNav([...nav, value]);
      else setNav(nav.filter((item) => item !== value));
    },
    [nav],
  );

  const tabsOnChange = (key: string) => {
    setActiveTab(key);
  };

  const tagClick = useCallback(
    (value: string, label: string) => {
      const selectItem = activeTag.find(
        (item) => delSymbol(item.value) === value,
      );
      if (selectItem?.label) {
        setActiveTag(
          activeTag.filter((item) => delSymbol(item.value) !== value),
        );
      } else {
        setActiveTag([...activeTag, { value, label }]);
      }
    },
    [activeTag],
  );

  const tagAddReduce = useCallback(
    (value: string, label: string, type: 'add' | 'reduce') => {
      const selectItem = activeTag.find(
        (item) => delSymbol(item.value) === value,
      );
      const num = getNum(selectItem?.value || '');
      if (num === 0 && type === 'reduce') {
        return messageApi.open({
          type: 'warning',
          content: '权重已经是最小了哦',
        });
      }
      setActiveTag([
        ...activeTag.filter((item) => delSymbol(item.value) !== value),
        {
          value:
            type === 'add'
              ? '{' + selectItem?.value + '}'
              : selectItem?.value.slice(1, -1) || '',
          label:
            type === 'reduce' && num === 1
              ? label
              : label + '' + (type === 'add' ? num + 1 : num - 1),
        },
      ]);
    },
    [activeTag, messageApi],
  );

  const tabContentNode = () =>
    tagData
      .find((item: TagDataType) => item.classify === activeTab)
      ?.tags?.map((innerItem, innerIndex) => (
        <div key={innerIndex} className="tagItem">
          {innerItem.classify && (
            <div className="partTitle">
              <div className="line" />
              {innerItem.classify}
            </div>
          )}
          <div className="tagsContainer">
            {innerItem.tags.map((mostItem) => (
              <div className="tagCon" key={mostItem.value}>
                {nav.includes('add') &&
                  activeTag.find(
                    (item) => delSymbol(item.value) === mostItem.value,
                  )?.label && (
                    <Button
                      shape="circle"
                      icon={<PlusOutlined />}
                      size={'small'}
                      onClick={() =>
                        tagAddReduce(mostItem.value, mostItem.label, 'add')
                      }
                    />
                  )}
                <Tag
                  className={`tagsItem ${
                    !!activeTag.find(
                      (item) => delSymbol(item.value) === mostItem.value,
                    )?.label
                      ? 'activeTag'
                      : ''
                  }`}
                  onClick={() => tagClick(mostItem.value, mostItem.label)}
                >
                  {mostItem.label}
                </Tag>
                {nav.includes('reduce') &&
                  activeTag.find(
                    (item) => delSymbol(item.value) === mostItem.value,
                  )?.label && (
                    <Button
                      shape="circle"
                      icon={<MinusOutlined />}
                      size={'small'}
                      onClick={() =>
                        tagAddReduce(mostItem.value, mostItem.label, 'reduce')
                      }
                    />
                  )}
              </div>
            ))}
          </div>
        </div>
      ));

  const getTagColor = () => tagColor[Math.floor(Math.random() * 11)];

  const createImg = useCallback(() => {
    console.log(activeTag.map((item) => item.value).join(', '));
    // return activeTag.map((item) => item.value).join(', ');
  }, [activeTag]);

  return (
    <div className="main">
      {contextHolder}
      <div className="content">
        <header className="headerTitle">AI头像生成器 V1.0</header>
        <article className="tagContainer">
          <nav className="navContainer">
            {navItem.map((item) => (
              <div key={item.value} className="navItem">
                <div className="navLabel">{item.label}:</div>
                <Switch
                  onChange={(checked) => navChange(checked, item.value)}
                  className={'antSwitch'}
                />
              </div>
            ))}
            <Button
              type="primary"
              className="createBtn"
              icon={<AreaChartOutlined />}
              disabled={!activeTag.length}
              onClick={createImg}
            >
              一键生成
            </Button>
          </nav>
          <div className="container">
            <div className="activeTags">
              <Space size={[0, 8]} wrap>
                {activeTag?.map((item) => (
                  <Tag color={getTagColor()} key={item.value}>
                    {item.label}
                  </Tag>
                ))}
              </Space>
            </div>
            <div className="imgContainer" />
          </div>
        </article>
        <article className="tabContainer">
          <Tabs
            onChange={tabsOnChange}
            type="card"
            items={tagData?.map((item) => ({
              label: item.classify,
              key: item.classify,
              children: tabContentNode(),
            }))}
          />
        </article>
      </div>
    </div>
  );
}

export default App;
