import { Component, OnInit } from "@angular/core";
import { ToastService } from "./toast-service";
import { Http } from "@angular/http";
import * as md5 from "md5";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "form-add-crm";

  companyName = "";
  companyShortName = "";
  companyEmail = "";
  companyAddress = "";
  contactName = "";
  contactPhone = "";
  isFacebook = false;
  isWebsite = false;
  isFriends = false;
  nameFile = "Locy-FORWARDER";
  totalUser = "5user";

  canSubmit = false;
  loading = false;

  constructor(public toastService: ToastService, public http: Http) {}

  ngOnInit() {}

  onClickSubmit() {
    if (localStorage.getItem("register") == null) {
      if (
        this.companyName.trim() != "" &&
        this.companyShortName.trim() != "" &&
        this.companyEmail.trim() != "" &&
        this.companyAddress.trim() != "" &&
        this.contactName.trim() != "" &&
        this.contactPhone.trim() != ""
      ) {
        let body = {
          companyName: this.companyName,
          companyEmail: this.companyEmail,
          companyAddress: this.companyAddress,
          contactName: this.contactName,
          contactPhone: this.contactPhone,
          nameFile: this.nameFile,
          isFacebook: this.isFacebook,
          isWebsite: this.isWebsite,
          isFriends: this.isFriends,
          totalUser: this.totalUser,
        };
        this.executeRequest(
          body,
          "http://163.44.192.123:3302/trailer/create_company"
        ).then((data: any) => {
          if (data.status == 1) {
            this.addDatabase(this.companyShortName);

            setTimeout(() => {
              this.toastService.show(
                "Thao tác thành công! Chúng tôi sẽ gửi email cho bạn sớm nhất! Xin vui lòng kiểm tra email để nhận thông tin hướng dẫn sử dụng và cài đặt phần mềm!",
                { classname: "bg-success text-light" }
              );

              this.companyName = "";
              this.companyShortName = "";
              this.companyEmail = "";
              this.companyAddress = "";
              this.contactName = "";
              this.contactPhone = "";
              this.nameFile = "Locy-FORWARDER";
              this.isFacebook = false;
              this.isWebsite = false;
              this.isFriends = false;
              this.totalUser = "5user";

              this.loading = false;

              localStorage.setItem("register", "1");

              grecaptcha.reset();
            }, 3000);
          } else {
            this.loading = false;
            this.toastService.show(data.message, {
              classname: "bg-danger text-light",
            });
            grecaptcha.reset();
          }
        });
      } else {
        this.loading = false;
        this.toastService.show("Bạn chưa nhập đủ thông tin!", {
          classname: "bg-danger text-light",
        });
        grecaptcha.reset();
      }
    } else {
      this.toastService.show(
        "Bạn đã đăng ký sử dụng phần mềm, vui lòng kiểm tra email để nhận được thông tin!",
        { classname: "bg-warning text-light" }
      );
      this.loading = false;
      grecaptcha.reset();
    }
  }

  executeRequest(body: any, url: string) {
    return new Promise((res, rej) => {
      this.http.post(url, body, {}).subscribe((data: any) => {
        let mData = data.json();
        if (mData) {
          console.log(mData);

          res(mData);
        } else {
          rej([]);
        }
      });
    });
  }

  addDatabase(shortName: string) {
    let dbName = shortName.toUpperCase() + "_DB",
      username = shortName.toLowerCase() + "_user",
      password = this.genPassword();

    let body = {
      customerName: this.companyName,
      email: this.companyEmail,
      dbName: dbName,
      username: username,
      password: password,
      key: this.genKey(),
      secretKey: "c74449f1f663f1d3037152dd768d8f89",
    };
    console.log(body);

    this.executeRequest(body, "http://163.44.192.123:3303/nap/web_register");
    // this.executeRequest(body, 'http://192.168.1.101:3003/nap/web_register');
  }

  genRandomCode(spceal?: boolean): string {
    if (!spceal) {
      let code = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
      let random = Math.floor(Math.random() * (code.length - 1));

      return code[random];
    } else {
      let specalCode = ["!", "@", "#", "$", "%", "^", "&", "*"];
      let randomSpecal = Math.floor(Math.random() * (specalCode.length - 1));

      return specalCode[randomSpecal];
    }
  }

  genPassword(): string {
    let code1 = this.genRandomCode();
    let code2 = this.genRandomCode();
    let code3 = this.genRandomCode();
    let code4 = this.genRandomCode();
    let code5 = this.genRandomCode();
    let code6 = this.genRandomCode();
    let code7 = this.genRandomCode(true);

    return code1 + code2 + code3 + code4 + code5 + code6 + code7;
  }

  genKey(): string {
    let baseKey = md5(new Date().getTime());
    let listKey = baseKey.split("");

    let key1 = "";
    let key2 = "";
    let key3 = "";
    let key4 = "";
    let key5 = "";
    for (let i = 0; i < 20; i++) {
      if (i < 4) key1 = key1 + listKey[i];
      else if (i >= 4 && i < 8) key2 = key2 + listKey[i];
      else if (i >= 8 && i < 12) key3 = key3 + listKey[i];
      else if (i >= 12 && i < 16) key4 = key4 + listKey[i];
      else if (i >= 16) key5 = key5 + listKey[i];
    }
    let mainKey = (
      key1 +
      "-" +
      key2 +
      "-" +
      key3 +
      "-" +
      key4 +
      "-" +
      key5
    ).toUpperCase();
    return mainKey;
  }

  resolved(captchaResponse: string) {
    if (captchaResponse) {
      this.canSubmit = true;
    }
  }
}
