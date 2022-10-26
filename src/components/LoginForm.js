import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.css';
import { useState } from 'react';
import {Link} from 'react-router-dom'
import {actionFullLogin} from '../redux/actions/actions'
import {  useDispatch } from 'react-redux'




const LoginForm = () => {
    const dispatch = useDispatch()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <div className="form">
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
            remember: true,
            }}
            
        >
            <Form.Item
            name="username"
            rules={[
                {
                required: true,
                message: 'Please input your Username!',
                },
            ]}
            >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Username" 
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </Form.Item>
            
    
            <Form.Item>
            
                <Button type="primary" 
                        htmlType="submit" 
                        className="login-form-button" 
                        onClick={() => dispatch(actionFullLogin(login, password))}
                        >
                    Log in
                </Button>
            
            Or <Link to="/Registration">register now!</Link>
            </Form.Item>
        </Form>
      </div>
    );
  };

  

export default LoginForm;
