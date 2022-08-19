import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {actionFullReg} from '../redux/actions/actions'
import { connect } from 'react-redux'

const RegistrationForm = ({onRegistration}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [samePassword, setSamePassword] = useState('')
  return (
    <div>
         <div className="form">
            <Form
            
            className="login-form"
            initialValues={{
            remember: true,
            }}
            
        >
            <Form.Item
            name="login"
            rules={[
                {
                required: true,
                message: 'Please input your Login!',
                },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Login" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    />
            </Form.Item>
            <Form.Item
            name="Confirm password"
            rules={[
                {
                required: true,
                message: 'Please input your Password!',
                },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    type="password"
                    placeholder="Confirm password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </Form.Item>
            <Form.Item
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your Password!',
                },
            ]}
            >
            <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                value={samePassword}
                onChange={(e) => setSamePassword(e.target.value)}
            />
            </Form.Item>
            
    
            <Form.Item>
            {/* <Link to="/Home"> */}
                <Button type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        onClick={() => onRegistration(login, password)}
                        >
                    Sign up
                </Button>
            
    
            </Form.Item>
        </Form>
      </div>
    </div>
  )
}

const CRegistrationForm = connect(null, {onRegistration: actionFullReg})(RegistrationForm)

export default CRegistrationForm
