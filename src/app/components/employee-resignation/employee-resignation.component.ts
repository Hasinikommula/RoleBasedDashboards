import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResignationService } from '../../services/resignation.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-employee-resignation',
  imports:[FormsModule, CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './employee-resignation.component.html',
  styleUrls: ['./employee-resignation.component.css']
})
export class EmployeeResignationComponent {
  resignationForm: FormGroup;
  showForm: boolean = true; 
  resignationSubmissions: any[] = [];
  minDate: string;

  constructor(private fb: FormBuilder, private resignationService: ResignationService) {
    const today = new Date().toISOString().split('T')[0]; 
    this.minDate = today;

    this.resignationForm = this.fb.group({
      proposedLastWorkingDay: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.loadResignationSubmissions();
  }

  onSubmit() {
    if (this.resignationForm.valid) {
      
      if (this.resignationSubmissions.length > 0) {
        const lastRequest = this.resignationSubmissions[this.resignationSubmissions.length - 1];

        if (lastRequest.status === 'Approved' || lastRequest.status === 'Rejected') {
          alert('Your resignation request has already been processed. You cannot submit again.');
          return;
        }
      }

     
      const submission = {
        proposedLastWorkingDay: this.resignationForm.value.proposedLastWorkingDay,
        reason: this.resignationForm.value.reason,
        submitted: new Date().toISOString(),
        status: 'Pending'
      };

      this.resignationService.addResignationSubmission(submission).subscribe(() => {
        this.loadResignationSubmissions();
        this.resignationForm.reset();
        this.showForm = false; 
        alert('Resignation request submitted successfully!');
      });
    }
  }

  loadResignationSubmissions() {
    this.resignationService.getResignationSubmissions().subscribe(data => {
      this.resignationSubmissions = data;
    });
  }
}
