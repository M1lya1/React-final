import React from 'react'
import { Alert, Spin } from 'antd';
import 'antd/dist/antd.css';

const Loading = () => {
  return (
    <Spin tip="Loading..." size= 'large'>
    <Alert
      message=""
      description=""
      type="info"
    />
  </Spin>
  )
}

export default Loading
