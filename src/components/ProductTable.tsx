import type React from "react";
import { Button, Table } from "react-bootstrap";
import type { CategoryProps, Product, ShopProps } from "../types/types";
import { FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import IconButton from "./IconButton";

const TableSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  color: #1f2937;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;

  &::before {
    content: "📝";
    font-size: 1.2rem;
  }
`;

const StyledTable = styled(Table)`
  margin-bottom: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  thead {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);

    th {
      border: none;
      color: white;
      font-weight: 600;
      padding: 1rem 0.75rem;
      font-size: 0.95rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      text-align: center;

      &:first-child {
        border-top-left-radius: 12px;
      }

      &:last-child {
        border-top-right-radius: 12px;
      }
    }
  }

  tbody {
    tr {
      transition: all 0.3s ease;
      border: none;

      &:hover {
        background-color: #f8fafc;
        transform: scale(1.01);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      &.purchased {
        background-color: #f0fdf4;

        &:hover {
          background-color: #dcfce7;
        }
      }

      td {
        border: none;
        padding: 1rem 0.75rem;
        vertical-align: middle;
        text-align: center;
        font-size: 0.95rem;
        border-bottom: 1px solid #f1f5f9;

        &.purchased {
          text-decoration: line-through;
          color: #6b7280;
          opacity: 0.7;
        }
      }
    }
  }
`;

const StatusButton = styled(Button)`
  border-radius: 20px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 120px;
  justify-content: center;

  &.purchased {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #059669 0%, #047857 100%);
      transform: translateY(-1px);
    }
  }

  &.not-purchased {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;

    &:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-1px);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;

  .empty-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .empty-title {
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
  }

  .empty-description {
    font-size: 1rem;
    opacity: 0.8;
  }
`;

const ProductName = styled.span`
  font-weight: 600;
  color: #1f2937;
`;

const CategoryBadge = styled.span`
  background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ShopBadge = styled.span`
  background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

type ProductTableProps = {
  products: Product[];
  categories: CategoryProps[];
  shops: ShopProps[];
  onToggleBought: (id: string) => void;
  onDelete: (id: string) => void;
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
  shops,
  onToggleBought,
  onDelete,
}) => {
  const getShopName = (id: number) =>
    shops.find((s) => s.id === id)?.shopName || "Unknown";
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.categoryName || "Unknown";

  if (products.length === 0) {
    return (
      <TableSection>
        <SectionTitle>Shopping List</SectionTitle>
        <EmptyState>
          <div className="empty-icon">🛒</div>
          <div className="empty-title">Your shopping list is empty</div>
          <div className="empty-description">
            Add some products to get started!
          </div>
        </EmptyState>
      </TableSection>
    );
  }

  return (
    <TableSection>
      <SectionTitle>Shopping List ({products.length} items)</SectionTitle>
      <div style={{ overflowX: "auto" }}>
        <StyledTable responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Store</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={product.isBought ? "purchased" : ""}
              >
                <td className={product.isBought ? "purchased" : ""}>
                  {index + 1}
                </td>
                <td className={product.isBought ? "purchased" : ""}>
                  <ProductName>{product.productName}</ProductName>
                </td>
                <td className={product.isBought ? "purchased" : ""}>
                  <ShopBadge>{getShopName(product.shopId)}</ShopBadge>
                </td>
                <td className={product.isBought ? "purchased" : ""}>
                  <CategoryBadge>
                    {getCategoryName(product.categoryId)}
                  </CategoryBadge>
                </td>
                <td>
                  <StatusButton
                    className={product.isBought ? "purchased" : "not-purchased"}
                    size="sm"
                    onClick={() => onToggleBought(product.id)}
                  >
                    {product.isBought ? (
                      <>
                        <FaCheck /> Purchased
                      </>
                    ) : (
                      <>
                        <FaTimes /> Pending
                      </>
                    )}
                  </StatusButton>
                </td>
                <td>
                  <IconButton
                    icon={<FaTrash />}
                    variant="danger"
                    onClick={() => onDelete(product.id)}
                    title="Delete product"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
    </TableSection>
  );
};

export default ProductTable;
