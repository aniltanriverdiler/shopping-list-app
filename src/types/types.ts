export interface ShopProps {
  id: number;
  shopName: string;
}

export interface CategoryProps {
  id: number;
  categoryName: string;
}

export interface Product {
  id: string;
  productName: string;
  shopId: number;
  categoryId: number;
  isBought?: boolean;
}
