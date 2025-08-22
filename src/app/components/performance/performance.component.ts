import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-performance',
  imports: [CommonModule, SidebarComponent],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.css']
})
export class PerformanceComponent implements OnInit, AfterViewInit, OnDestroy {
  activeTab: string = 'overview';
  performanceTrendChart?: Chart;
  skillsPieChart?: Chart;
  
  private intervalId: any;

  @ViewChild('performanceTrendChartCanvas', { static: false }) performanceTrendChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('skillsPieChartCanvas', { static: false }) skillsPieChartCanvas?: ElementRef<HTMLCanvasElement>;

  goals = [
    { title: 'Complete React Advanced Certification', dueDate: '10/15/2024', category: 'Learning', progress: 100, status: 'Completed' },
    { title: 'Lead Dashboard Redesign Project', dueDate: '12/30/2024', category: 'Project', progress: 75, status: 'In Progress' },
    { title: 'Improve Code Review Turnaround Time', dueDate: '11/1/2024', category: 'Process', progress: 100, status: 'Completed' }
  ];

  skills = [
    { name: 'Technical Skills', progress: 92, target: 90 },
    { name: 'Communication', progress: 85, target: 80 },
    { name: 'Leadership', progress: 78, target: 85 },
    { name: 'Problem Solving', progress: 90, target: 85 },
    { name: 'Teamwork', progress: 88, target: 85 },
    { name: 'Time Management', progress: 82, target: 80 }
  ];

  reviews = [
    { title: 'Annual Review 2024', date: '11/30/2024', selfRating: 4.5, managerRating: 4.7, finalRating: 4.6, status: 'Completed' },
    { title: 'Mid-Year Review 2024', date: '6/15/2024', selfRating: 4.2, managerRating: 4.4, finalRating: 4.3, status: 'Completed' }
  ];

  feedbacks = [
    { from: 'Srinivas', role: 'Manager', date: 'Dec 10, 2024', comment: 'Outstanding work on the dashboard project.', type: 'Positive' },
    { from: 'Vennela', role: 'Peer', date: 'Nov 25, 2024', comment: 'Great collaboration on the API integration.', type: 'Constructive' },
    { from: 'Radha', role: 'Manager', date: 'Nov 15, 2024', comment: 'Excellent mentorship of new team members.', type: 'Positive' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.initChartsForTab();
  }

  ngOnDestroy() {
    this.destroyCharts();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
    setTimeout(() => requestAnimationFrame(() => this.initChartsForTab()), 100);
  }

  private destroyCharts() {
    if (this.performanceTrendChart) {
      this.performanceTrendChart.destroy();
      this.performanceTrendChart = undefined;
    }
    if (this.skillsPieChart) {
      this.skillsPieChart.destroy();
      this.skillsPieChart = undefined;
    }
  }

  private initChartsForTab() {
    this.destroyCharts();

    if (this.activeTab === 'overview' && this.performanceTrendChartCanvas?.nativeElement) {
      this.initPerformanceTrendChart();
    }

    if (this.activeTab === 'skills-overview' && this.skillsPieChartCanvas?.nativeElement) {
      this.initSkillsPieChart();
    }
  }

  private initPerformanceTrendChart() {
    const ctx = this.performanceTrendChartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    this.performanceTrendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [{
          label: 'Performance',
          data: [75, 78, 80, 82, 85, 88],
          borderColor: '#2b6cb0',
          backgroundColor: 'rgba(43, 108, 176, 0.2)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        scales: {
          x: { ticks: { font: { size: 12 } } },
          y: { beginAtZero: true, max: 100, ticks: { font: { size: 12 }, stepSize: 20 } }
        },
        plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } }
      }
    });
  }

 private initSkillsPieChart() {
    const ctx = this.skillsPieChartCanvas?.nativeElement.getContext('2d');
    if (!ctx) return;

    this.skillsPieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.skills.map(s => s.name),
        datasets: [{
          data: this.skills.map(s => s.progress),
          backgroundColor: ['#10b981', '#818cf8', '#f472b6', '#f97316', '#6b7280', '#34d399']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom' } }
      }
    });

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.skillsPieChart) {
        this.skillsPieChart.data.datasets[0].data = this.skills.map(
          s => Math.max(0, Math.min(100, s.progress + (Math.random() * 5 - 2.5)))
        );
        this.skillsPieChart.update();
      }
    }, 2000);
  }
}


