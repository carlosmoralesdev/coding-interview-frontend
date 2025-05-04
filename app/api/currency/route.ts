import { GetCurrencyListDto } from "@/adapters/dto/getCurrencyDto";
import { CurrencyUseCase } from "@/application/use-cases/currency.use-case";
import { handleApiError } from "@/entities/error/handleApiError";
import { CurrencyService } from "@/infrastructure/services/currency.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const json: GetCurrencyListDto = await req.json()
      //return NextResponse.json({data: {saludo: "hola wey"}})
      const currencyService = new CurrencyService()
      const currencyUseCase = new CurrencyUseCase(currencyService)
      const res = await currencyUseCase.execute(json)
      return NextResponse.json({ data: res }, {status: 200});
    } catch (e) {
      return NextResponse.json({ error: handleApiError(e as Error) });
    }
  }