import { CheckoutSuccessPage } from "@/actions/pagamentos";
import CheckoutSuccess from "@/components/checkout/ChecoutSuccess"

interface PageProps {
  searchParams: {
    vendas?: string;
    payment_id?: string;
    external_reference?: string;
  }
}

const page: React.FC<PageProps> = async (props) => {
  const searchParams = await props.searchParams;
  const { vendas, transacao } = await CheckoutSuccessPage(searchParams);

  return (
    <>
      <CheckoutSuccess vendas={vendas} transacao={transacao} /> 
    </>
  )
}

export default page