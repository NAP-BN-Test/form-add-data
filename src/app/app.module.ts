import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ToastsContainer } from "./toast-container.component";

import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { RecaptchaModule } from "ng-recaptcha";

import { NgxLoadingModule } from "ngx-loading";
import { MatRadioModule } from "@angular/material/radio";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ToastsContainer],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpModule,
    FormsModule,
    RecaptchaModule,
    MatRadioModule,
    NgxLoadingModule.forRoot({}),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
