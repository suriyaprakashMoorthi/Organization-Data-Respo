import React from "react";
import { Button, Form, Input, Card } from "antd";
import "./Signin.css";
import ServiceObj from "../../Services/Services";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const BASEPATH = import.meta.env.VITE_REACT_APP_BASEPATH;

const SignupPage = () => {
  const navigate = useNavigate();
  const onFinishSignIn = async (values) => {
    var bodyData = {
      emp_id: values.emp_id,
      emp_password: values.pwd,
    };

    try {
      const loginRes = await ServiceObj.loginpost("authz/signup", bodyData);
      if (loginRes.status == "ok") {
        let token = loginRes.token;
        ServiceObj.setToken(token);
        navigate(`${BASEPATH}/login`);
        message.success("User added successfully!");
      } else {
        message.error(loginRes.data);
      }
    } catch (err) {
      try {
        var errdata = err.response.data.message;
        message.error(errdata);
      } catch (err) {
        message.error("Signup Failed!");
      }
    }
  };
  const onFinishFailedSignIn = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="card">
        <Card
          title="SIGNUP"
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
            onFinish={onFinishSignIn}
            onFinishFailed={onFinishFailedSignIn}
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
                SignUp
              </Button>
            </Form.Item>
          </Form>

          <p style={{ marginLeft: 90 }}>
            Already have an account? <Link to={`${BASEPATH}/login`}>Login</Link>
          </p>
        </Card>
      </div>
    </>
  );
};

export default SignupPage;
