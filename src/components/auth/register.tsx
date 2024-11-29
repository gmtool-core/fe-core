"use client";

import { Button, Col, Divider, Form, Input, Row, notification } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log("values", values);
    const { email, password, name } = values;
    const res:any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      method: "POST",
      body: { email, password, name },
    });
    console.log(res,'resss');
    if(res?.data) {
      router.push(`/verify/${res?.data.id}`)
    }else{
      notification.error({
        message: "Register error",
        description: res?.message
      })
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Ký Tài Khoản</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Đã có tài khoản? <Link href={"/auth/login"}>Đăng nhập</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Register;