// PaymentPage.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';  // Import the PaymentForm

// Load the Stripe public key
const stripePromise = loadStripe('pk_test_4eC39HqLyjWDarjtT1zdp7dc');  // Use your actual public key here

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
