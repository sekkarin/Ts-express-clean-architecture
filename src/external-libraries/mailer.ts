import { injectable } from "inversify";
import { IMailer } from "../interfaces/IMailer";
@injectable()
export class Mailer implements IMailer {
  SendMail(ro: string, product: unknown) {
    console.log("sendMail: ", product);
    return true;
  }
}
