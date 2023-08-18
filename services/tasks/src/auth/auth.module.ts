import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [HttpModule],
    exports: [AuthGuard],
})
export class AuthModule {
}