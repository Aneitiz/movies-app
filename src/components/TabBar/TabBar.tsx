import React from 'react'
import './TabBar.css'
import { Tabs } from 'antd'

import { TabConfig } from '../../constants'

type TabBarProps = {
  onChangeTab: any
}
const TabBar: React.FC<TabBarProps> = ({ onChangeTab }) => {
  return (
    <Tabs
      className="header__tabs"
      defaultActiveKey="search"
      items={TabConfig}
      size="large"
      onChange={onChangeTab}
      destroyInactiveTabPane={true}
    />
  )
}

export default TabBar
