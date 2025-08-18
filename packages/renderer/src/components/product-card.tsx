import React from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex, Switch } from 'antd';

const ProductCard = () => {
  const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];
  return(
  
  <Card  actions={actions} style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Card title"
          description={
            <>
              <p>This is the description</p>
              <p>This is the description</p>
            </>
          }
        />
      </Card>)
      ;
};

export default ProductCard;
