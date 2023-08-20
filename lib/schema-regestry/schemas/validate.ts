import { TSchema } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler'

export function validate(schema: TSchema, data: unknown) {
    const C = TypeCompiler.Compile(schema);
    return C.Check(data);
}