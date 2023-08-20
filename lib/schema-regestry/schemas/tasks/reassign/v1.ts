import { Type, Static } from '@sinclair/typebox'
import { BaseEventProperties } from '../../base_event_v1';

export const TasksReassignSchemaV1 = Type.Object({
    ...BaseEventProperties,
    data: Type.Object({
        task_uuid: Type.String(),
    }),
});

export type TasksReassignSchemaV1Type = Static<typeof TasksReassignSchemaV1>;
