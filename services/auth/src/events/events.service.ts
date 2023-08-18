import { Injectable, Logger } from "@nestjs/common";
import { Client, ClientKafka, Transport } from "@nestjs/microservices";

@Injectable()
export class EventsService {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'kafka',
                brokers: ['kafka:9092'],
            },
        }
    })
    client: ClientKafka;

    private readonly logger = new Logger('Events');

    emit(topic: string, msg: Record<string, unknown>) {
        this.logger.log(`Emit event to topic ${topic}: ${JSON.stringify(msg)}`);
        this.client.emit(topic, msg);
    }
}
