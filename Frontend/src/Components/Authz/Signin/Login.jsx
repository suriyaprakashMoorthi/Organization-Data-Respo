import React from "react";
import { Button, Form, Input, Card } from "antd";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
message.config({
  top: 80,
  marginLeft: 0,
  duration: 2,
  maxCount: 3,
  prefixCls: "my-message",
});

import ServiceObj from "../../Services/Services";
const BASEPATH = import.meta.env.VITE_REACT_APP_BASEPATH;

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    var bodyData = {
      emp_id: values.emp_id,
      emp_password: values.pwd,
    };

    const loginRes = await ServiceObj.loginpost("authz/login", bodyData);
    if (loginRes.status == "ok") {
      let token = loginRes.token;
      ServiceObj.setToken(token);
      localStorage.setItem("id", values.emp_id);
      message.success("Login successfully!");
      navigate(`${BASEPATH}/dashboard`);
    }
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Login Failed!");
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="card">
        <Card
          title="LOGIN"
          bordered={false}
          style={{
            width: 650,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Employee ID"
              name="emp_id"
              rules={[
                {
                  required: true,
                  message: "Enter your EmployeeId!",
                },
              ]}
            >
              <Input maxLength={4} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="pwd"
              rules={[
                {
                  required: true,
                  message: "Enter your password!",
                },
              ]}
            >
              <Input.Password maxLength={4} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 14,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>

          <p style={{ marginLeft: 90 }}>
            Don't have an account? <Link to={`${BASEPATH}/signup`}>Signup</Link>
          </p>
        </Card>
      </div>
    </>
  );
};

export default Login;
