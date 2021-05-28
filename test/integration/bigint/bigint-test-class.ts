import {IsBigInt, MaxBigInt, MinBigInt, NegativeBigInt, PositiveBigInt} from '../../../src'

export class BigIntTestClass {
    @IsBigInt()
    isBigInt: unknown = BigInt(1_000)

    @IsBigInt({each: true})
    eachIsBigInt: unknown = [BigInt(1_000), BigInt(10_000), BigInt(100_000)]

    @MaxBigInt(1_000)
    maxBigInt: unknown = BigInt(999)

    @MaxBigInt(1_000, {each: true})
    eachMaxBigInt: unknown = BigInt(999)

    @MinBigInt(50)
    minBigInt: unknown = BigInt(51)

    @MinBigInt(50, {each: true})
    eachMinBigInt: unknown = BigInt(51)

    @NegativeBigInt()
    negativeBigInt: unknown = BigInt(-1)

    @NegativeBigInt({each: true})
    eachNegativeBigInt: unknown = BigInt(-1)

    @PositiveBigInt()
    positiveBigInt: unknown = BigInt(1)

    @PositiveBigInt({each: true})
    eachPositiveBigInt: unknown = BigInt(1)

    constructor(fields: Partial<BigIntTestClass> = {}) {
        for (const [k, v] of Object.entries(fields)) {
            this[k as keyof BigIntTestClass] = v
        }
    }
}
