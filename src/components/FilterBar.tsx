import React from "react";
import { Form } from "react-bootstrap";

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
    <>
      <Form.Group className="mb-3" controlId="formProductName">
        <Form.Label>Filter product:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name."
          value={filteredName}
          onChange={(e) => setFilteredName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="d-flex gap-4 mb-3">
        <Form.Check
          type="radio"
          label="All"
          name="statusRadios"
          id="statusAll"
          value="all"
          checked={filteredStatus === "all"}
          onChange={() => setFilteredStatus("all")}
        />
        <Form.Check
          type="radio"
          label="Purchased"
          name="statusRadios"
          id="statusBought"
          value="bought"
          checked={filteredStatus === "bought"}
          onChange={() => setFilteredStatus("bought")}
        />
        <Form.Check
          type="radio"
          label="Not Purchased"
          name="statusRadio"
          id="statusNotBought"
          value="notBought"
          checked={filteredStatus === "notBought"}
          onChange={() => setFilteredStatus("notBought")}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Market:</Form.Label>
        <Form.Select
          value={filteredShopId}
          onChange={(e) => setFilteredShopId(e.target.value)}
        >
          <option value="all">All</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.id.toString()}>
              {" "}
              {shop.shopName}{" "}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Category:</Form.Label>
        <Form.Select
          value={filteredCategoryId}
          onChange={(e) => setFilteredCategoryId(e.target.value)}
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id.toString()}>
              {cat.categoryName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </>
  );
};

export default FilterBar;
