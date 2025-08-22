import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-resignation-approval',
  imports:[CommonModule,FormsModule,SidebarComponent],
  templateUrl: './resignation-approval.component.html',
  styleUrls: ['./resignation-approval.component.css']
})
export class ResignationApprovalComponent implements OnInit {
  ResignationRequests: any[] = [];

  constructor(private http: HttpClient,private profileService : ProfileService) {}

  ngOnInit() {
    this.getResignationSubmissions();
  }

 getResignationSubmissions() {
    this.http.get<any[]>('http://localhost:3000/resignationSubmissions')
      .subscribe(data => this.ResignationRequests = data);
  }

  updateStatus(id: number, status: string) {
    this.http.patch(`http://localhost:3000/resignationSubmissions/${id}`, { status })
      .subscribe(() => {
        alert(`Resignation Request ${status}`);
        this.getResignationSubmissions(); 
      });
  }
}

