import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const FilterSection = styled.div`
  background: linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(245, 158, 11, 0.2);
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.1);
`;

const SectionTitle = styled.h3`
  color: #92400e;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.4rem;

  &::before {
    content: "🔍";
    font-size: 1.2rem;
  }
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr 1fr;
  }
`;

const StyledFormGroup = styled(Form.Group)`
  &.search-input {
    @media (min-width: 1024px) {
      grid-column: 1 / -1;
    }
  }
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
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
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
    border-color: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    background: white;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
`;

const StyledRadio = styled(Form.Check)`
  .form-check-input {
    border: 2px solid #d1d5db;
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.5rem;

    &:checked {
      background-color: #f59e0b;
      border-color: #f59e0b;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
    }
  }

  .form-check-label {
    color: #374151;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
  }
`;

const StatusFilterGroup = styled(StyledFormGroup)`
  .status-label {
    margin-bottom: 0.75rem;
  }
`;

type FilterBarProps = {
  filteredName: string;
  setFilteredName: (value: string) => void;
  filteredStatus: "all" | "bought" | "notBought";
  setFilteredStatus: (value: "all" | "bought" | "notBought") => void;
  filteredShopId: string;
  setFilteredShopId: (value: string) => void;
  filteredCategoryId: string;
  setFilteredCategoryId: (value: string) => void;
  shops: { id: number; shopName: string }[];
  categories: { id: number; categoryName: string }[];
};

const FilterBar: React.FC<FilterBarProps> = ({
  filteredName,
  setFilteredName,
  filteredStatus,
  setFilteredStatus,
  filteredShopId,
  setFilteredShopId,
  filteredCategoryId,
  setFilteredCategoryId,
  shops,
  categories,
}) => {
  return (
    <FilterSection>
      <SectionTitle>Filter & Search</SectionTitle>
      
      <StyledFormGroup className="search-input" controlId="formProductName">
        <StyledLabel>Search Products</StyledLabel>
        <StyledInput
          type="text"
          placeholder="Type to search products..."
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />
      </StyledFormGroup>

      <FilterGrid>
        <StatusFilterGroup>
          <StyledLabel className="status-label">Purchase Status</StyledLabel>
          <RadioGroup>
            <StyledRadio
              type="radio"
              label="All Items"
              name="statusRadios"
              id="statusAll"
              value="all"
              checked={filteredStatus === "all"}
              onChange={() => setFilteredStatus("all")}
            />
            <StyledRadio
              type="radio"
              label="✅ Purchased"
              name="statusRadios"
              id="statusBought"
              value="bought"
              checked={filteredStatus === "bought"}
              onChange={() => setFilteredStatus("bought")}
            />
            <StyledRadio
              type="radio"
              label="⏳ Pending"
              name="statusRadios"
              id="statusNotBought"
              value="notBought"
              checked={filteredStatus === "notBought"}
              onChange={() => setFilteredStatus("notBought")}
            />
          </RadioGroup>
        </StatusFilterGroup>

        <StyledFormGroup>
          <StyledLabel>Store</StyledLabel>
          <StyledSelect
            value={filteredShopId}
            onChange={(e) => setFilteredShopId(e.target.value)}
          >
            <option value="all">🏪 All Stores</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id.toString()}>
                {shop.shopName}
              </option>
            ))}
          </StyledSelect>
        </StyledFormGroup>

        <StyledFormGroup>
          <StyledLabel>Category</StyledLabel>
          <StyledSelect
            value={filteredCategoryId}
            onChange={(e) => setFilteredCategoryId(e.target.value)}
          >
            <option value="all">📂 All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id.toString()}>
                {cat.categoryName}
              </option>
            ))}
          </StyledSelect>
        </StyledFormGroup>
      </FilterGrid>
    </FilterSection>
  );
};

export default FilterBar;