import Decimal from "decimal.js";

export const converterDecimalReturnNumber = (valor: string | number, decimalPlaces: number = 2) => {
    return new Decimal(valor)
        .toDecimalPlaces(decimalPlaces, Decimal.ROUND_UP)
        .toFixed(decimalPlaces);
}

export const converterDecimal = (valor: string | number, decimalPlaces: number = 2) => {
    return new Decimal(Number(valor)
        .toFixed(2))
        .toDecimalPlaces(decimalPlaces, Decimal.ROUND_UP)
        .toString();
}

export const stringParaNumber = (valor: string = "0", decimalPlaces: number = 2): number => {
    let numero = Number(valor.replace(/\D/g, ""));
    return numero / Math.pow(10, decimalPlaces);
}