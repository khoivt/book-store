import React, { useState } from "react";
import type { FormProps } from "antd";
import { App, Button, Form, Input } from "antd";
import "./register.scss";
import { Typography } from "antd";
import { loginAPI, registerAPI } from "@/services/api";
import { useNavigate } from "react-router-dom";

type FieldType = {
  fullName: string;
  password: string;
  email: string;
  phone: string;
};

const RegisterPage = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();
  const { Text, Link, Title } = Typography;
  const { message } = App.useApp();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setIsSubmit(true);
    const res = await registerAPI(values);
    if (res.error) {
      message.error(res.message);
      setIsSubmit(false);
    } else {
      message.success("Your account has been registered successfully!");
      navigate("/login");
    }
  };

  return (
    <div className="module">
      <main className="formContainer">
        <div className="header">
          <Title>Register a new account</Title>
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
            label="Username"
            name="fullName"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

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

          <Form.Item<FieldType>
            label="Phone"
            name="phone"
            rules={[
              {
                type: "string",
                pattern:
                  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/,
                required: true,
                message: "Please input valid phone number!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className="submitBtn">
            <Button type="primary" htmlType="submit" loading={isSubmit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="footer">
          <Text>
            If you already have an account, go to{" "}
            <Link href="/login">log in</Link>
          </Text>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
