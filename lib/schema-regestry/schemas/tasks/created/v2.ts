import { Type, Static } from '@sinclair/typebox'
import { BaseEventProperties } from '../../base_event_v1';

export const TasksCreatedSchemaV2 = Type.Object({
    ...BaseEventProperties,
    data: Type.Object({
        task_uuid: Type.String(),
        title: Type.RegExp(/^[^\[]/), // not start with [
        jira_id: Type.String(),
        description: Type.String(),
        price: Type.Number(),
        status: Type.String(),
    }),
});

export type TasksCreatedSchemaV2Type = Static<typeof TasksCreatedSchemaV2>;
