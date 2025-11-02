import { CheckoutSuccessPage } from "@/actions/pagamentos";
import CheckoutSuccess from "@/components/checkout/CheckoutSuccess";

interface PageProps {
  searchParams?: Promise<{
    vendas?: string;
    payment_id?: string;
    external_reference?: string;
  }>;
}

const CheckoutSuccessRoute = async ({ searchParams }: PageProps) => {
  const resolvedSearchParams = (await searchParams) ?? {};
  const { vendas, transacao } = await CheckoutSuccessPage(resolvedSearchParams);

  return <CheckoutSuccess vendas={vendas} transacao={transacao} />;
};

export default CheckoutSuccessRoute;
