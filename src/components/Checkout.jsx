import React, { useState, useEffect } from "react";
import { commerce } from "../lib/commerce";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
  Button,
} from "@mui/material";
import { AddressForm, PaymentDetails, Confirmation } from "./CheckoutForms";
import { Link, useNavigate } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details"];

const Checkout = ({ cart, onCaptureCheckout, order, errorMessage }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckoutToken(token);
      } catch (error) {
        navigate("/");
      }
    };

    generateToken();
  }, [cart]);

  const nextstep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backstep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextstep();
  };
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  if (errorMessage) {
    <>
      <Typography variant="h5">Error: {errorMessage}</Typography>
      <br />
      <Button LinkComponent={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentDetails
        timeout={timeout}
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backstep={backstep}
        onCaptureCheckout={onCaptureCheckout}
        nextstep={nextstep}
      />
    );
  return (
    <>
      <CssBaseline />
      <main className="coLayout">
        <Paper className="coPaper">
          <Typography variant="h4" align="center">
            CheckOut
          </Typography>
          <Stepper activeStep={activeStep} className="coStepper">
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation order={order} isFinished={isFinished} />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
