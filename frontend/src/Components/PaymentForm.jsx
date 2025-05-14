// PaymentForm.jsx
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = 500;  // Example amount in INR (₹500)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);
    
    // Create a payment method token from the CardElement
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      return;
    }

    const paymentMethodId = token.id;

    // Send the payment method id and other details to your backend
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethodId,
          amount,
          userId: 'user_id_here',  // You can get the userId from your state or context
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Payment Successful!');
      } else {
        alert('Payment Failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay ₹{amount} INR
      </button>
    </form>
  );
};

export default PaymentForm;
