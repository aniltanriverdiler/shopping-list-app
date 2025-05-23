import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/types";
import { categories, shops } from "./data/mockData";
import { Col, Container, Row } from "react-bootstrap";
import ProductTable from "./components/ProductTable";
import Confetti from "react-confetti";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const handleToggleBought = (id: string) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id
          ? { ...product, isBought: !product.isBought }
          : product
      );

      const wasAllBoughtBefore = prevProducts.every(
        (product) => product.isBought
      );
      const isAllBoughtNow = updatedProducts.every(
        (product) => product.isBought
      );

      if (!wasAllBoughtBefore && isAllBoughtNow) {
        alert("Alışveriş Tamamlandı 🎉");
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 9000);
      }

      return updatedProducts;
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <>
      {showConfetti && <Confetti />}
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
