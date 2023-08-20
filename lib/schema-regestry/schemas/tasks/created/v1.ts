import { Type, Static } from '@sinclair/typebox'
import { BaseEventProperties } from '../../base_event_v1';

export const TasksCreatedSchemaV1 = Type.Object({
    ...BaseEventProperties,
    data: Type.Object({
        task_uuid: Type.String(),
        title: Type.String(),
        description: Type.String(),
        price: Type.Number(),
        status: Type.String(),
    }),
});

export type TasksCreatedSchemaV1Type = Static<typeof TasksCreatedSchemaV1>;
