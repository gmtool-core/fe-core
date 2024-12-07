"use client";

import { Button, Form, Input, Modal, Select, Steps, message, notification } from "antd";

import { createUserAction } from "@/utils/actions";
import { useForm } from "antd/es/form/Form";
import { useHasMounted } from "@/utils/customHook";
import { useState } from "react";

const typeOptions = [
  {
    label: "User",
    value: 0,
  },
  {
    label: "Admin",
    value: 1,
  },
];

const activeOptions = [
  {
    label: "No",
    value: false,
  },
  {
    label: "Yes",
    value: true,
  },
];

const ModalCreateUser = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: any;
}) => {
  const [form] = useForm();
  const hasMounted = useHasMounted();

  const resetModal = () => {
    setIsModalOpen(!isModalOpen);
    form.resetFields();
  };

  const onFinish = async (values: any) => {
    const { confirmPassword, ...data } = values;
    if(confirmPassword !== data.password) {
        notification.error({
            message: "Create user error !!!",
            description: "Password and confirm password is not the same."
        })
    } else {
        const res = await createUserAction(data);
        if(res?.data) {
            resetModal();
            message.success("Create succeed !")
        } else {
            notification.error({
                message: "Create user error !!!",
                description: res?.message
            })
        }
    }
    
    
    // const res = await createUserAction(values);
  };

  if (!hasMounted) return <></>;
  return (
    <>
      <Modal
        title="Create user"
        open={isModalOpen}
        onOk={resetModal}
        onCancel={resetModal}
        maskClosable={false}
        footer={null}
      >
        <Form
          name="verify"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter your name!",
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
                message: "Please enter your confirm password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type">
            <Select defaultValue="User" options={typeOptions} />
          </Form.Item>
          <Form.Item label="Active" name="isActive">
            <Select defaultValue="No" options={activeOptions} />
          </Form.Item>
          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
