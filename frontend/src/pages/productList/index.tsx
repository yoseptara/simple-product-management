// ProductList.js
import { useEffect, useState } from "react";
import { Col, Row, Card, Pagination } from "antd";
import { ProductList, getProducts } from "@src/api/products.api";
import "antd/dist/antd.css";

const { Meta } = Card;

export default function ProductList() {
  const [products, setProducts] = useState<ProductList>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products, total } = await getProducts(currentPage, pageSize);
        setProducts(products);
        setTotal(total);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} span={6}>
            <Card
              hoverable
              cover={<img alt={product.name} src={product.images?.[0]?.url} />}
            >
              <Meta title={product.name} description={product.description} />
            </Card>
          </Col>
        ))}
      </Row>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}
