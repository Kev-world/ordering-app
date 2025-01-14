import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import * as Joi from 'joi';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import { OrdersRepository } from './order.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    // to make sure we have env variables defined properly, else throw error
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
    }),
    envFilePath: './apps/orders/.env',
  }),
    DatabaseModule,
  MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule { }
