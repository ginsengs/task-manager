import { Type } from "@sinclair/typebox";

export const BaseEventProperties = {
    event_id: Type.String(),
    event_version: Type.Number({ minimum: 1, maximum: 1 }),
    event_time: Type.Date(),
    event_name: Type.String(),
    producer: Type.String(),
};