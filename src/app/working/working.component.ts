import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({selector:'app-working',standalone:true,templateUrl:'./working.component.html',styleUrl:'./working.component.css'})
export class WorkingComponent{constructor(private router:Router){}back(){this.router.navigate(['/sales-order'])}}
