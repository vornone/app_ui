import React from "react";
import ProductCard from "../components/product-card";
import { Row, Col, Flex, Pagination, Select, Space, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const options = [
  { label: "China", value: "china", emoji: "🇨🇳", desc: "China (中国)" },
  { label: "USA", value: "usa", emoji: "🇺🇸", desc: "USA (美国)" },
  { label: "Japan", value: "japan", emoji: "🇯🇵", desc: "Japan (日本)" },
  { label: "Korea", value: "korea", emoji: "🇰🇷", desc: "Korea (韩国)" },
];

const { Search } = Input;

const ProductPage: React.FC = () => {
  return (
    <Flex style={{ height: "100%", flexDirection: "column", gap: 16, width: "100%" }}>
      {/* Search & Filter */}
      <Flex justify="space-between" style={{ width: "100%" }}>
        <Flex gap={16} style={{ width: "100%" }}>
          <Search placeholder="Search Product" enterButton style={{ width: 300 }} />
          <Select
            mode="multiple"
            style={{ width: 500 }}
            placeholder="Select one country"
            defaultValue={["china"]}
            onChange={handleChange}
            options={options}
            optionRender={(option:any) => (
              <Space>
                <span role="img" aria-label={option.data.label}>
                  {option.data.emoji}
                </span>
                {option.data.desc}
              </Space>
            )}
          />
        </Flex>
        <Button type="primary" icon={<PlusOutlined />}>
          Add New Product
        </Button>
      </Flex>

      {/* Product Grid */}
      <Row gutter={[16, 16]}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <ProductCard />
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Flex >
        <Pagination simple defaultCurrent={2} total={50} />
      </Flex>
    </Flex>
  );
};

export default ProductPage;
