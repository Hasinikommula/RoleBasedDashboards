import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TravelService } from '../../services/travel.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-travelrequisition',
  imports:[SidebarComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './travelrequisition.component.html',
  styleUrls: ['./travelrequisition.component.css']
})
export class TravelRequisitionComponent {
  travelForm: FormGroup;
  showForm: boolean = false;
  travelRequests: any[] = [];
  minDate: string;

  constructor(private fb: FormBuilder, private travelService: TravelService) {
  
    const today = new Date('2025-08-05T18:45:00+05:30').toISOString().split('T')[0];
    this.minDate = today;

    this.travelForm = this.fb.group({
      destination: ['', [Validators.required, Validators.minLength(2)]],
      estimatedCost: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      purpose: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.loadTravelRequests();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onSubmit() {
    if (this.travelForm.valid) {
      const request = {
        destination: this.travelForm.value.destination,
        dates: `${this.travelForm.value.startDate} - ${this.travelForm.value.endDate}`,
        cost: `₹${this.travelForm.value.estimatedCost}`,
        status: 'Pending',
        purpose: this.travelForm.value.purpose,
        submitted: new Date().toISOString()
      };
      this.travelService.addTravelRequest(request).subscribe(() => {
        this.loadTravelRequests();
        this.travelForm.reset();
        this.showForm = false;
      });
    }
  }

  loadTravelRequests() {
    this.travelService.getTravelRequests().subscribe(data => {
      this.travelRequests = data;
    });
  }
}
