"use client";

import { Button, Form, Input, Modal, Steps, notification } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

import { sendRequest } from "@/utils/api";
import { useForm } from "antd/es/form/Form";
import { useHasMounted } from "@/utils/customHook";

const ModalChangePassword = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const hasMounted = useHasMounted();
  const [userEmail, setUserEmail] = useState("");

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    console.log(email);
    const res: any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change-password`,
      method: "POST",
      body: { email },
    });
    if (res?.data) {
      setCurrent(1);
      setUserEmail(res?.data.email);
    } else {
      notification.error({
        message: "Resend Code Error",
        description: res?.message,
      });
    }
  };
  const onFinishStep1 = async (values: any) => {
    const { code, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      notification.error({
        message: "Invalid input",
      });
    }
    const res: any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/update-password`,
      method: "POST",
      body: { code, password, confirmPassword, email: userEmail },
    });
    if (res?.data) {
      setCurrent(2);
    } else {
      notification.error({
        message: "Retry Active Error",
        description: res?.message,
      });
    }
  };

  const resetModal = () => {
    setIsModalOpen(!isModalOpen);
    setCurrent(0);
    setUserEmail("");
    form.resetFields();
  };

  if (!hasMounted) return <></>;
  return (
    <>
      <Modal
        title="Forgot password"
        open={isModalOpen}
        onOk={resetModal}
        onCancel={resetModal}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Email",
              icon: <UserOutlined />,
            },
            {
              title: "Verification",
              icon: <SolutionOutlined />,
            },
            {
              title: "Done",
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <>
            <div style={{ marginTop: 20 }}>
              <p>To change password. Please enter your email.</p>
            </div>
            <Form
              name="verify"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item name="email">
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        {current === 1 && (
          <div>
            <div style={{ marginTop: 20 }}>
              <p>Enter active code</p>
            </div>
            <Form
              name="verify2"
              onFinish={onFinishStep1}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Code"
                name="code"
                rules={[
                  {
                    required: true,
                    message: "Please enter your code!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="New password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send code
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        {current === 2 && (
          <div style={{ marginTop: 20 }}>
            <p>
              Your account is activated successfully !!! Please login again.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalChangePassword;
