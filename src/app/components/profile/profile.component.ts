import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared-service.service';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Profile } from '../../models/profile';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  imports: [FormsModule, CommonModule, SidebarComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
 profile: Profile = {} as Profile;
  isEditMode = false;
  profileForm!: FormGroup;

  constructor(
    public sharedService: SharedService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      id: [null],
      fullName: ['', [Validators.pattern(/^[a-zA-Z\s-]{1,50}$/)]],
      email: ['', [Validators.email]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10}$/)]],
      designation: ['', [Validators.pattern(/^[a-zA-Z\s-]{1,50}$/)]],
      department: ['', [Validators.pattern(/^[a-zA-Z\s-]{1,50}$/)]],
      employeeId: ['', [Validators.pattern(/^[a-zA-Z0-9-]{1,20}$/)]],
      hireDate: ['', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      address: ['', [Validators.pattern(/^[a-zA-Z0-9\s,-]{1,100}$/)]],
      emergencyContact: ['', [Validators.pattern(/^[0-9]{10}$/)]],
    });

    this.loadProfile();
  }

  loadProfile(): void {
    this.profileService.getProfileData().subscribe({
      next: (profiles: Profile[]) => {
        if (profiles.length > 0) {
          this.profile = profiles[0];
          this.profileForm.patchValue(this.profile);
          this.profileForm.disable(); 
          this.sharedService.employeeName = `${this.profile.fullName} ${this.profile.designation}`;
        }
      },
      error: (err) => console.error('Error loading profile:', err),
    });
  }

  toggleEditMode(): void {
    this.isEditMode = true;
    this.profileForm.enable();
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      const data: Profile = this.profileForm.getRawValue();
      this.profileService.updateProfileData(data).subscribe({
        next: (updatedProfile: Profile) => {
          this.profile = updatedProfile;
          this.profileForm.patchValue(updatedProfile);
          this.profileForm.disable();
          this.isEditMode = false;
          this.sharedService.employeeName = `${this.profile.fullName} ${this.profile.designation}`;
          console.log('✅ Profile updated:', updatedProfile);
        },
        error: (err) => console.error('Error saving profile:', err),
      });
    } else {
      console.log('Form invalid');
      this.profileForm.markAllAsTouched();
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.profileForm.patchValue(this.profile);
    this.profileForm.disable();
  }
}
