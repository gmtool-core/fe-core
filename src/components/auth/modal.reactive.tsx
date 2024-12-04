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

const ModalReactive = ({
  isModalOpen,
  setIsModalOpen,
  userEmail,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
  userEmail: string;
}) => {
  const [current, setCurrent] = useState(0);
  const [form] = useForm();
  const hasMounted = useHasMounted();
  const [userId, setUserId] = useState(null);

  const onFinishStep0 = async (values: any) => {
    const { email } = values;
    console.log(email);
    const res: any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/retry-active`,
      method: "POST",
      body: { email },
    });
    if (res?.data) {
      setCurrent(1);
      setUserId(res?.data.id);
    } else {
      notification.error({
        message: "Resend Code Error",
        description: res?.message,
      });
    }
  };
  const onFinishStep1 = async (values: any) => {
    const { code } = values;

    const res: any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`,
      method: "POST",
      body: { code, id: userId },
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

  useEffect(() => {
    if (userEmail) {
      form.setFieldValue("email", userEmail);
    }
  }, [userEmail]);
  if (!hasMounted) return <></>;
  return (
    <>
      <Modal
        title="Active account"
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={null}
      >
        <Steps
          current={current}
          items={[
            {
              title: "Login",
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
              <p>Your account is not active</p>
            </div>
            <Form
              name="verify"
              onFinish={onFinishStep0}
              autoComplete="off"
              layout="vertical"
              form={form}
            >
              <Form.Item name="email">
                <Input disabled value={userEmail} />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Resend
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
                    message: "Please input your email!",
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
            <p>Your account is activated successfully !!! Please login again.</p>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalReactive;
