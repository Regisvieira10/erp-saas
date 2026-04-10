import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './tenants/tenants.module';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { PdvModule } from './pdv/pdv.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    TenantsModule,
    ProductsModule,
    CustomersModule,
    OrdersModule,
    PdvModule,
    InvoicesModule,
    CrmModule,
  ],
})
export class AppModule {}
