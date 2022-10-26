import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import {actionFullReg} from '../redux/actions/actions'
import { useDispatch } from 'react-redux'

const RegistrationForm = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [samePassword, setSamePassword] = useState('')
  return (
    
         <div className="form">
            <Form
            
            className="login-form registration"
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
            <Input prefix={<LockOutlined className="site-form-item-icon" />} 
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
            
                <Button type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        onClick={() => dispatch(actionFullReg(login, password))}
                        >
                    Sign up
                </Button>
            
    
            </Form.Item>
        </Form>
      </div>
    
  )
}



export default RegistrationForm
