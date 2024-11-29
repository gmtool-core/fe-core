'use client'

import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                GM Core ©{new Date().getFullYear()} Created by Hieu
            </Footer>
        </>
    )
}

export default AdminFooter;