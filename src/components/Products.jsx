import React from "react";
import { Grid } from "@mui/material";
import Product from "./Product";

const Products = ({ products, onAddToCart }) => {
  return (
    <main className="prContent">
      <div className="prToolbar"></div>
      <Grid container justifyContent={"center"} spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
