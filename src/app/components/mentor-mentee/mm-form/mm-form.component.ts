import { Component, OnInit } from '@angular/core';
import {FormOption} from "../../../models/entity/form-option";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {CMR_CODE, WA_PREFIX} from "../../../models/constants/endpoints";
import {Mentor} from "../../../models/entity/mentor";
import {Mentee} from "../../../models/entity/mentee";
import {MmService} from "../../../services/mm.service";
import {DEPARTMENTS, GENDERS, LEVELS, ROLES} from "../../../models/constants/form-options";

@Component({
  selector: 'app-mm-form',
  templateUrl: './mm-form.component.html',
  styleUrls: ['./mm-form.component.scss']
})
export class MmFormComponent implements OnInit {

  data: Object | undefined;
  roles: FormOption[];
  genders: string[];
  levels: string[];
  departments: FormOption[];
  mmForm: FormGroup;
  isMentor: boolean;

  constructor(private http: HttpClient, private mmService: MmService) {
    this.departments = DEPARTMENTS;
    this.roles = ROLES;
    this.genders = GENDERS;
    this.levels = LEVELS;

    this.mmForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('',Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]),
      gender: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
      about: new FormControl('', Validators.required),
      previousSchool: new FormControl(''),
    });

    this.isMentor = this.mmForm.get("role")?.value == "mentor";
  }

  ngOnInit(): void {}

  onSubmit() {
    let mmBody: Mentee | Mentor = MmFormComponent.prepareRequest(this.mmForm);
    let role: string = this.mmForm.get("role")?.value;

    console.log("---Request Body---")
    console.log(mmBody);
    console.log("---Request Body---")

    this.mmService.addMm(mmBody, role).subscribe((response: Response) => {
        this.data = response.json();
    });

    console.log("---Response Body---")
    console.log(this.data);
    console.log("---Response Body---")
  }

  private static prepareRequest(form: FormGroup): Mentor | Mentee {
    let role: string = form.get("role")?.value;
    let mentee: Mentee;
    let mentor: Mentor;

    let phoneNumber: string = form.get("phoneNumber")?.value;
    let waNumber = MmFormComponent.fixWaNumber(phoneNumber);
    let gender = MmFormComponent.fixGender(form.get("gender")?.value);

    mentor = {
      username: form.get("username")?.value,
      first_name: form.get("firstName")?.value,
      second_name: form.get("lastName")?.value,
      email: form.get("email")?.value,
      gender: gender,
      phone_number: phoneNumber,
      wa_number: waNumber,
      department: form.get("department")?.value,
      level: form.get("level")?.value,
      about: form.get("about")?.value
    }

    if (role == "mentee") {
      mentee = {
        ...mentor,
        previous_school: form.get("previousSchool")?.value
      };
      return mentee;
    }
    return mentor;
  }

  private static fixPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.length == 9) {
      return CMR_CODE.concat(phoneNumber);
    } else if(
      (phoneNumber.length == 12 && phoneNumber.substring(0, 3) === CMR_CODE.substring(1) ||
      phoneNumber.length == 13 && phoneNumber.substring(0, 4) === CMR_CODE)) {
      return phoneNumber;
    } else {
      return CMR_CODE.concat("672270627");
    }
  }

  private static fixWaNumber(phoneNumber: string): string {
    if (phoneNumber.length < 12) {
      phoneNumber = MmFormComponent.fixPhoneNumber(phoneNumber);
    }
    return WA_PREFIX.concat(phoneNumber);
  }

  private static fixGender(value: string): string {
    return value.charAt(0).toUpperCase();
  }
}
