import React from "react";
import { Link } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@mui/material";
import CartItem from "./CartItem";

const Cart = ({ cart, onCartUpdateQty, onCartItemRemove, onCartEmpty }) => {
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no item in your shopping cart,
      <Link to={"/products"}>start adding some</Link>
    </Typography>
  );

  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item sm={12} md={4} key={item.id}>
            <CartItem
              item={item}
              onCartUpdateQty={onCartUpdateQty}
              onCartItemRemove={onCartItemRemove}
            />
          </Grid>
        ))}
      </Grid>
      <div className="cCardDetails">
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className="cEmptyButton"
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => {
              onCartEmpty();
            }}
          >
            Empty Cart
          </Button>
          <Button
            className="cCheckoutButton"
            LinkComponent={Link}
            to="/checkout"
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            CheckOut
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return <h1>...Loading</h1>;

  return (
    <Container>
      <Typography className="cTitle" variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
};

export default Cart;
