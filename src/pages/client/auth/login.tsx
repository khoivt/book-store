import { loginAPI } from "@/services/api";
import type { FormProps } from "antd";
import { App, Button, Form, Input, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import { useCurrentApp } from "@/components/context/app.context";

type FieldType = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const { setIsAuthenticated, setUser } = useCurrentApp();
  const { Text, Link, Title } = Typography;
  const { notification, message } = App.useApp();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const { email, password } = values;
    const res = await loginAPI(email, password);
    
    if (res.data) {
      message.success("Login Successfully");
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token || "");
      navigate("/");
    } else {
      notification.error({
        message: "Login Failed!",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        placement: "topRight",
      });
      setIsSubmit(false);
    }
  };

  return (
    <div className="module">
      <main className="formContainer">
        <div className="header">
          <Title>Login</Title>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="submitBtn">
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="footer">
          <Text>
            If you don't have an account, go to{" "}
            <Link href="/register">Register</Link>
          </Text>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
