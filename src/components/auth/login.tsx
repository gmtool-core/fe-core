"use client";

import { Button, Col, Divider, Form, Input, Row, notification } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import ModalChangePassword from "../modal/modal.changepassword";
import ModalReactive from "../modal/modal.reactive";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const onFinish = async (values: any) => {
    const { email, password } = values;
    setUserEmail("");
    const res = await authenticate(email, password);
    if (res?.error) {
      if (res?.code === 2) {
        setIsModalOpen(true);
        setUserEmail(email);
        return;
        // router.push(`/verify/${res?.data?.id}`);
      }
      notification.error({
        message: "Error login",
        description: res?.error,
      });
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <>
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
            <legend>Đăng Nhập</legend>
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

              <Form.Item>
                <div className="flex justify-between items-center">
                  <Button type="primary" htmlType="submit">
                    Login
                  </Button>
                  <Button type="link" onClick={() => setChangePassword(true)}>
                    Forgot password ?
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <Link href={"/"}>
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div style={{ textAlign: "center" }}>
              Chưa có tài khoản?{" "}
              <Link href={"/auth/register"}>Đăng ký tại đây</Link>
            </div>
          </fieldset>
        </Col>
      </Row>
      <ModalReactive
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userEmail={userEmail}
      />
      <ModalChangePassword isModalOpen={changePassword} setIsModalOpen={setChangePassword}/>
    </>
  );
};

export default Login;
