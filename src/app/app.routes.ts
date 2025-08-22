import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';



import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LeaveManagementComponent } from './components/leave-management/leave-management.component';
import { PayslipComponent } from './components/payslip/payslip.component';
import { PerformanceComponent } from './components/performance/performance.component';
import { TrainingComponent } from './components/training/training.component';
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { TravelRequisitionComponent } from './components/travelrequisition/travelrequisition.component';
import { EmployeeLoanComponent } from './components/employee-loan/employee-loan.component';
import { EmployeeResignationComponent } from './components/employee-resignation/employee-resignation.component';
import { HrDashboardComponent } from './hr-components/hr-dashboard/hr-dashboard.component';
import { LeaveApprovalComponent } from './hr-components/leave-approval/leave-approval.component';

import { TravelApprovalComponent } from './hr-components/travel-approval/travel-approval.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthGuard, RoleGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { ResignationApprovalComponent } from './hr-components/resignation-approval/resignation-approval.component';
import { LoanApprovalsComponent } from './hr-components/loan-approvals/loan-approvals.component';






export const routes: Routes = [
    
   
  
  {path:'',component:RegisterComponent},
 





 

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard,AuthGuard], data: { role: 'Employee' } },
  { path: 'hr-dashboard', component: HrDashboardComponent},

  { path: 'profile', component: ProfileComponent },
  { path: 'leave-management', component: LeaveManagementComponent },
  { path: 'payslip', component: PayslipComponent },
  { path: 'performance', component: PerformanceComponent},
  { path: 'training', component: TrainingComponent },
  { path: 'recruitment', component: RecruitmentComponent },
  { path: 'travelrequisition', component: TravelRequisitionComponent },
  { path: 'employee-loan', component: EmployeeLoanComponent },
  { path: 'resignation', component: EmployeeResignationComponent },
  { path: 'leave-approvals', component: LeaveApprovalComponent },
  { path: 'travel-approvals', component: TravelApprovalComponent },
  { path: 'sidebar', component: SidebarComponent},
  {path:'resignation-approvals',component:ResignationApprovalComponent},
  {path:'loan-approvals',component:LoanApprovalsComponent}

 

  

]
