import type React from "react";
import { Table } from "react-bootstrap";
import type { CategoryProps, Product, ShopProps } from "../types/types";

type ProductTableProps = {
  products: Product[];
  categories: CategoryProps[];
  shops: ShopProps[];
};

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  categories,
  shops,
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
          <th>Ürün ID</th>
          <th>Ürün Adı</th>
          <th>Market</th>
          <th>Kategori</th>
          <th>Durum</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <td>{index + 1}</td>
            <td>{product.id}</td>
            <td>{product.productName}</td>
            <td>{getShopName(product.shopId)}</td>
            <td>{getCategoryName(product.categoryId)}</td>
            <td>
              {product.isBought ? (
                <span className="text-success">Alındı</span>
              ) : (
                <span className="text-danger">Alınmadı</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
