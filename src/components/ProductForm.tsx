import type React from "react";
import type { CategoryProps, Product, ShopProps } from "../types/types";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { nanoid } from "nanoid";

type ProductFormProps = {
  onAdd: (product: Product) => void;
  shops: ShopProps[];
  categories: CategoryProps[];
};

const ProductForm: React.FC<ProductFormProps> = ({
  onAdd,
  shops,
  categories,
}) => {
  const [name, setName] = useState("");
  const [shopId, setShopId] = useState<number>(shops[0]?.id || 1);
  const [categoryId, setCategoryId] = useState<number>(categories[0]?.id || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !shopId || !categoryId) {
      alert("Please fill in all the fields.");
      return;
    }

    const newProduct: Product = {
      id: nanoid(),
      productName: name,
      shopId,
      categoryId,
      isBought: false,
    };

    console.log(newProduct);
    onAdd(newProduct);

    setName("");
    setShopId(shops[0]?.id || 1);
    setCategoryId(categories[0]?.id || 1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formProductName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the product name."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formShopSelect">
          <Form.Label>Select market:</Form.Label>
          <Form.Select
            value={shopId}
            onChange={(e) => setShopId(Number(e.target.value))}
          >
            <option value="">Please select a market.</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.shopName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategorySelect">
          <Form.Label>Select category:</Form.Label>
          <Form.Select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Please select a category.</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="success" className="mt-1 mb-3">
            Add product
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
