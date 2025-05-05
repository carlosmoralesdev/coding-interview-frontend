import { CalculateRateDto } from "@/adapters/dto/calculateRateDto";
import { CalculateRateUseCase } from "@/application/use-cases/exchange.use-case";
import { handleApiError } from "@/entities/error/handleApiError";
import { ExchangeService } from "@/infrastructure/services/exchange.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const json: CalculateRateDto = await req.json()
        const exchangeService = new ExchangeService()
        const exchangeUseCase = new CalculateRateUseCase(exchangeService)
        const res = await exchangeUseCase.execute(json)
        return NextResponse.json({ data: res }, { status: 200 });
    } catch (e) {
        console.error(e)
        return NextResponse.json({ error: handleApiError(new Error("Ha ocurrido un error al procesar su solicitud!")) }, { status: 500 });
    }
}