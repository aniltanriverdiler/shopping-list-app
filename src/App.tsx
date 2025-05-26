import { useState } from "react";
import styled from "styled-components";
import ProductForm from "./components/ProductForm";
import type { Product } from "./types/types";
import { categories, shops } from "./data/mockData";
import { Col, Container, Row } from "react-bootstrap";
import ProductTable from "./components/ProductTable";
import Confetti from "react-confetti";
import FilterBar from "./components/FilterBar";
import Fuse from "fuse.js";
import GlobalStyles from "./styles/GlobalStyles";

const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const MainCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const AppTitle = styled.h1`
  color: #2d3748;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  padding-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: space-around;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 15px;
  padding: 1rem;
  margin-bottom: 2rem;
  color: white;
  font-weight: 600;
  box-shadow: 0 8px 16px rgba(240, 147, 251, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .stat-number {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

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

      if (!wasAllBoughtBefore && isAllBoughtNow && updatedProducts.length > 0) {
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

  const totalProducts = products.length;
  const boughtProducts = products.filter((p) => p.isBought).length;
  const remainingProducts = totalProducts - boughtProducts;
  const completionPercentage =
    totalProducts > 0 ? Math.round((boughtProducts / totalProducts) * 100) : 0;

  return (
    <AppWrapper>
      {showConfetti && <Confetti />}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={10} xl={8}>
            <MainCard>
              <AppTitle>🛒 Smart Shopping List</AppTitle>

              {totalProducts > 0 && (
                <StatsBar>
                  <StatItem>
                    <div className="stat-number">{totalProducts}</div>
                    <div className="stat-label">Total Items</div>
                  </StatItem>
                  <StatItem>
                    <div className="stat-number">{boughtProducts}</div>
                    <div className="stat-label">Purchased</div>
                  </StatItem>
                  <StatItem>
                    <div className="stat-number">{remainingProducts}</div>
                    <div className="stat-label">Remaining</div>
                  </StatItem>
                  <StatItem>
                    <div className="stat-number">{completionPercentage}%</div>
                    <div className="stat-label">Complete</div>
                  </StatItem>
                </StatsBar>
              )}

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
            </MainCard>
          </Col>
        </Row>
      </Container>
      <GlobalStyles />
    </AppWrapper>
  );
}

export default App;
