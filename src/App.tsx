import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/types";
import { categories, shops } from "./data/mockData";
import { Col, Container, Row } from "react-bootstrap";
import ProductTable from "./components/ProductTable";
import { Prev } from "react-bootstrap/esm/PageItem";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleToggleBought = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      )
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <>
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={8}>
            <h1>Ürün Ekle</h1>
            <ProductForm
              onAdd={handleAddProduct}
              shops={shops}
              categories={categories}
            />
            <ProductTable
              products={products}
              categories={categories}
              shops={shops}
              onToggleBought={handleToggleBought}
              onDelete={handleDeleteProduct}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
