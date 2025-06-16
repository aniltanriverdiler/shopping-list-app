import type React from "react";
import type { CategoryProps, Product, ShopProps } from "../types/types";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";

const FormSection = styled.div`
  background: linear-gradient(135deg, #ffeef8 0%, #f0f9ff 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(167, 139, 250, 0.2);
  box-shadow: 0 4px 12px rgba(167, 139, 250, 0.1);
`;

const SectionTitle = styled.h3`
  color: #4c1d95;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;

  &::before {
    content: "➕";
    font-size: 1.2rem;
  }
`;

const StyledFormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;
`;

const StyledLabel = styled(Form.Label)`
  color: #374151;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const StyledInput = styled(Form.Control)`
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background: white;
  }

  &::placeholder {
    color: #9ca3af;
    font-style: italic;
  }
`;

const StyledSelect = styled(Form.Select)`
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
    background: white;
  }
`;

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border: none;
  border-radius: 12px;
  padding: 0.875rem 2rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
    background: linear-gradient(135deg, #059669 0%, #047857 100%);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

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

    if (!name.trim() || !shopId || !categoryId) {
      alert("Please fill in all the fields.");
      return;
    }

    const newProduct: Product = {
      id: nanoid(),
      productName: name.trim(),
      shopId,
      categoryId,
      isBought: false,
    };

    onAdd(newProduct);

    setName("");
    setShopId(shops[0]?.id || 1);
    setCategoryId(categories[0]?.id || 1);
  };

  return (
    <FormSection>
      <SectionTitle>Add New Product</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <StyledFormGroup controlId="formProductName">
          <StyledLabel>Product Name</StyledLabel>
          <StyledInput
            type="text"
            placeholder="What do you need to buy?"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </StyledFormGroup>

        <StyledFormGroup controlId="formShopSelect">
          <StyledLabel>Select Store</StyledLabel>
          <StyledSelect
            value={shopId}
            onChange={(e) => setShopId(Number(e.target.value))}
          >
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.shopName}
              </option>
            ))}
          </StyledSelect>
        </StyledFormGroup>

        <StyledFormGroup controlId="formCategorySelect">
          <StyledLabel>Select Category</StyledLabel>
          <StyledSelect
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryName}
              </option>
            ))}
          </StyledSelect>
        </StyledFormGroup>

        <ButtonContainer>
          <SubmitButton type="submit">✨ Add to List</SubmitButton>
        </ButtonContainer>
      </Form>
    </FormSection>
  );
};

export default ProductForm;
