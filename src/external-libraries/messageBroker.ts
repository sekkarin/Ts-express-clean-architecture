import { injectable } from "inversify";
import { IMessageBroker } from "../interfaces/IMessageBroker";
@injectable()
export class MessageBroker implements IMessageBroker {
  NotificationToPromotion(product: unknown) {
    console.log("Calling message broker");
    return true;
  }
}
