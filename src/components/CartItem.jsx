import React from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
const CartItem = ({ item, onCartUpdateQty, onCartItemRemove }) => {
  return (
    <Card>
      <CardMedia image={item.image.url} alt={item.name} className="ciMedia" />
      <CardContent className="ciCardContent">
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className="ciCardActions">
        <div className="ciButtons">
          <Button
            type="button"
            size="small"
            onClick={() => {
              onCartUpdateQty(item.id, item.quantity - 1);
            }}
          >
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() => {
              onCartUpdateQty(item.id, item.quantity + 1);
            }}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => {
            onCartItemRemove(item.id);
          }}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
