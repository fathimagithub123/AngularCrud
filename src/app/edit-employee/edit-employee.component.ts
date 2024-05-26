



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { employeeModel } from '../employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee: employeeModel = {};

  constructor(private route: ActivatedRoute, private api: ApiService,private router:Router) {}

  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      const id = params['id']; 
      console.log('Employee ID:', id);

      if (id) {
        this.getEmployeeDetails(id); 
      } else {
        console.error('No ID parameter found in route.');
       
      }
    });
  }

  getEmployeeDetails(id: any): void {
    
    if (!id) {
      console.error('Invalid ID:', id);
      
      return;
    }

    this.api.getEmployeeAPI(id).subscribe(
      (result: employeeModel) => {
        this.employee = result;
        console.log('Fetched Employee:', this.employee);
      },
      error => {
        console.error('Error fetching employee details:', error);
       
      }
    );
  }
  cancel(id:any){
    this.getEmployeeDetails(id)
  }
  // updateEmployee(){
  //   this.api.updateEmployeeAPI(this.employee).subscribe((result:any)=>{
  //     alert("User Updated Successfully")
  //     this.router.navigateByUrl('/employee-list')
  //   })
    
  // }

  updateEmployee(): void {
    this.api.updateEmployeeAPI(this.employee).subscribe(
      (result: any) => {
        alert("User Updated Successfully");
        this.router.navigateByUrl('/employee-list');
      },
      error => {
        console.error('Error updating employee:', error);
        // Optionally, handle error display or logging
      }
    );
  }

}