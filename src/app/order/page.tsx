import CartSummary from "@/app/order/cartsummary";
import PaymentForm from "@/app/order/inforcleint";

export default function Cart() {
  return (
    <div>
      <CartSummary />
      <PaymentForm />
    </div>
  );
}
