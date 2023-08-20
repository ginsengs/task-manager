import { Type, Static } from '@sinclair/typebox'
import { BaseEventProperties } from '../../base_event_v1';

export const UserCreatedSchemaV1 = Type.Object({
    ...BaseEventProperties,
    data: Type.Object({
        public_uuid: Type.String(),
        username: Type.String(),
        role: Type.String(),
    }),
});


export type UserCreatedSchemaV1Type = Static<typeof UserCreatedSchemaV1>;
