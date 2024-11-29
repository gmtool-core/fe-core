"use client";

import { Button, Col, Divider, Form, Input, Row, notification } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import { sendRequest } from "@/utils/api";
import { useRouter } from "next/navigation";

const Verify = (props: any) => {
    const {id} = props;
  const router = useRouter();
  const onFinish = async (values: any) => {
    console.log("values", values);
    const { id, code } = values;
    const res:any = await sendRequest({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/verify`,
      method: "POST",
      body: { id, code },
    });
    console.log(res,'resss');
    if(res?.data) {
    //   router.push(`/verify/${res?.data.id}`)
    }else{
      notification.error({
        message: "Verify error",
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
          <legend>Active account</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="ID"
              name="id"
              initialValue={id}
              hidden
            >
              <Input disabled/>
            </Form.Item>


            <p>Code is sent to your email, please check it.</p>
            <Form.Item
              label="Code"
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
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

export default Verify;
