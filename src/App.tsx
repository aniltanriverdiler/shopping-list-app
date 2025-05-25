import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/types";
import { categories, shops } from "./data/mockData";
import { Col, Container, Row } from "react-bootstrap";
import ProductTable from "./components/ProductTable";
import Confetti from "react-confetti";
import FilterBar from "./components/FilterBar";
import Fuse from "fuse.js";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [filteredName, setFilteredName] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<
    "all" | "bought" | "notBought"
  >("all");
  const [filteredShopId, setFilteredShopId] = useState<string>("all");
  const [filteredCategoryId, setFilteredCategoryId] = useState<string>("all");

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
        alert("Shopping Completed 🎉");
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

  let resultProducts = products;

  if (filteredName.trim() !== "") {
    const fuse = new Fuse(products, {
      keys: ["productName"],
      threshold: 0.3,
    });
    const searchResults = fuse.search(filteredName.trim());
    resultProducts = searchResults.map((result) => result.item);
  }

  const filteredProducts = resultProducts.filter((product) => {
    const matchesShop =
      filteredShopId === "all" || product.shopId === parseInt(filteredShopId);
    const matchesCategory =
      filteredCategoryId === "all" ||
      product.categoryId === parseInt(filteredCategoryId);
    const matchesStatus =
      filteredStatus === "all" ||
      (filteredStatus === "bought" && product.isBought) ||
      (filteredStatus === "notBought" && !product.isBought);

    return matchesShop && matchesCategory && matchesStatus;
  });

  return (
    <>
      {showConfetti && <Confetti />}
      <Container>
        <Row className="mt-5 justify-content-md-center">
          <Col xs={8}>
            <h1>Shopping List</h1>
            <ProductForm
              onAdd={handleAddProduct}
              shops={shops}
              categories={categories}
            />
            <FilterBar
              filteredName={filteredName}
              setFilteredName={setFilteredName}
              filteredStatus={filteredStatus}
              setFilteredStatus={setFilteredStatus}
              filteredShopId={filteredShopId}
              setFilteredShopId={setFilteredShopId}
              filteredCategoryId={filteredCategoryId}
              setFilteredCategoryId={setFilteredCategoryId}
              shops={shops}
              categories={categories}
            />
            <ProductTable
              products={filteredProducts}
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
