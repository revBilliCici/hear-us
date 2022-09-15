import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { MdAddShoppingCart } from "react-icons/md";

const Product = ({ product, onAddToCart }) => {
  const { name, price, description, image, id } = product;
  return (
    <Card children className="pCardRoot">
      <CardMedia className="pCardMedia" image={image.url} title={name} />
      <CardContent>
        <div className="pCardContent">
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>
          <Typography variant="h5">{price.formatted_with_symbol}</Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: description }}
          variant="body2"
          color={"GrayText"}
        />
      </CardContent>
      <CardActions disableSpacing className="pCardActions">
        <IconButton aria-label="Add to Cart" onClick={() => onAddToCart(id, 1)}>
          <MdAddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;
