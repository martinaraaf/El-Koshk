import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    GoogleMapsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent implements OnInit {
  isLoading: boolean = false;
  contactForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl('', Validators.required),
    });
  }

  onSend(e: Event) {
    e.preventDefault();
    if (this.contactForm.valid) {
    this.isLoading = true;

    const formData: any = this.contactForm.value;

    console.log(formData);
    }
  }
}
