import { Type, Static } from '@sinclair/typebox'
import { BaseEventProperties } from '../../base_event_v1';

export const UserChangedSchemaV1 = Type.Object({
    ...BaseEventProperties,
    data: Type.Object({
        public_uuid: Type.String(),
        username: Type.String(),
        role: Type.String(),
    }),
});


export type UserChangedSchemaV1Type = Static<typeof UserChangedSchemaV1>;
