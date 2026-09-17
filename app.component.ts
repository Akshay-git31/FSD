import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  onSubmit() {
    if (this.contactForm.valid) {
      alert("Form Submitted Successfully");
      console.log(this.contactForm.value);
    }
  }
}