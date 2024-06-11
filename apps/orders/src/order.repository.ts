import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Order } from "./schemas/order.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
    protected readonly logger = new Logger(OrdersRepository.name)

    // Injecting the Order model into the repository, and Inject Connection for tracking DB transactions
    constructor(@InjectModel(Order.name) orderModel: Model<Order>, @InjectConnection() connection: Connection) {
        // pass the injections to the parent modules
        super(orderModel, connection)
    }
}