import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './@core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/calender/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./views/pages/schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'course',
        loadChildren: () => import('./views/pages/course/course.module').then(m => m.CourseModule)
      },
      {
        path: 'classroom',
        loadChildren: () => import('./views/pages/classroom/classroom.module').then(m => m.ClassroomModule)
      },
      {
        path: 'program',
        loadChildren: () => import('./views/pages/program/program.module').then(m => m.ProgramModule)
      },
      {
        path: 'professor',
        loadChildren: () => import('./views/pages/professor/professor.module').then(m => m.ProfessorModule)
      },
      { path: '', redirectTo: 'apps', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
