import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EventsService {
    private readonly logger = new Logger('Events');

    emit(topic: string, msg: Record<string, unknown>) {
        this.logger.log(`Emit event to topic ${topic}: ${JSON.stringify(msg)}`);
    }
}
