import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-training',
  imports:[FormsModule,CommonModule,SidebarComponent],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent {
  materials = [
    { title: 'Data Security & Compliance', category: 'compliance', description: 'Understanding GDPR and company data policies.' },
    { title: 'Leadership 101', category: 'leadership', description: 'An introduction to leadership principles for new managers.' },
    { title: 'Effective Communication', category: 'soft-skills', description: 'Master the art of clear and concise communication.' },
    { title: 'Advanced React Hooks', category: 'technical', description: 'Deep dive into React Hooks for state management.' },
    { title: 'Project Management Basics', category: 'leadership', description: 'Fundamentals of managing projects effectively.' },
    { title: 'Team Collaboration', category: 'soft-skills', description: 'Enhance teamwork and collaboration skills.' }
  ];
  filteredMaterials = [...this.materials];

  filterMaterials(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredMaterials = this.materials.filter(material =>
      material.title.toLowerCase().includes(input) || material.description.toLowerCase().includes(input)
    );
  }

  download(material: any) {
    console.log(`Downloading ${material.title}`);
    
  }
}
