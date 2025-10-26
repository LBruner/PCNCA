import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

export async function POST(req: Request) {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
    });

    const body = await req.json();
    const preference = new Preference(client);
    const items = body.items || [];

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Nenhum item fornecido para a preferência" },
        { status: 400 }
      );
    }

    const result = await preference.create({
      body: {
        items,
        notification_url: 'https://kennith-cokelike-kerrie.ngrok-free.dev/api/webhook',
        back_urls: {
          success: "http://localhost:3000/success",
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending",
        },
      },
    });

    return NextResponse.json({ id: result.id });
  } catch (error: any) {
    console.error("Erro ao criar preferência:", error);
    return NextResponse.json(
      { error: "Erro ao criar preferência", details: error.message },
      { status: 500 }
    );
  }
}
