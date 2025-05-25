import type React from "react";
import { Button, Table } from "react-bootstrap";
import type { CategoryProps, Product, ShopProps } from "../types/types";
import { FaTrash } from "react-icons/fa";
import IconButton from "./IconButton";

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
    shops.find((s) => s.id === id)?.shopName || "Bilinmiyor";
  const getCategoryName = (id: number) =>
    categories.find((c) => c.id === id)?.categoryName || "Bilinmiyor";

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Market</th>
          <th>Category</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id} className={product.isBought ? "text-muted" : ""}>
            <td
              className={
                product.isBought
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {index + 1}
            </td>
            <td
              className={
                product.isBought
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {product.id}
            </td>
            <td
              className={
                product.isBought
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {product.productName}
            </td>
            <td
              className={
                product.isBought
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {getShopName(product.shopId)}
            </td>
            <td
              className={
                product.isBought
                  ? "text-decoration-line-through text-muted"
                  : ""
              }
            >
              {getCategoryName(product.categoryId)}
            </td>
            <td>
              <Button
                variant={product.isBought ? "success" : "outline-danger"}
                size="sm"
                onClick={() => onToggleBought(product.id)}
              >
                {product.isBought ? "✓ Purchased" : "✗ Not Purchased"}
              </Button>
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
    </Table>
  );
};

export default ProductTable;
