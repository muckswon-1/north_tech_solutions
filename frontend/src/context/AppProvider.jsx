import { ProductProvider } from './ProductContext';

export const AppProvider = ({ children }) => (
  <ProductProvider>{children}</ProductProvider>
);
