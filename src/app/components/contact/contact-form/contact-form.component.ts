import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactMessage} from "../../../models/entity/contact.message";
import {ContactService} from "../../../services/contact.service";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  data: Object | undefined;
  messageSent: boolean = false;


  constructor(private contactService: ContactService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  sendContactEmail() {
    let contactMessage: ContactMessage = {
      name: this.contactForm.get("name")?.value,
      email: this.contactForm.get("email")?.value,
      subject: this.contactForm.get("subject")?.value,
      message: this.contactForm.get("message")?.value,
    };

    alert("Yo exec send mail fn")

    this.contactService.sendContactEmail(contactMessage).subscribe((res: Response) => {
      this.data = res.json();
      this.messageSent = true;
    });
  }

  statusMessage(): {text: string, ok: boolean} {
    this.messageSent = true;
    return {
      text: "Message sent successfully",
      ok: true
    };
  }
}
