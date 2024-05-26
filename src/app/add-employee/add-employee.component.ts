import { Component, OnInit } from '@angular/core';
import { employeeModel } from '../employee.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: employeeModel = {};
  allemployee: any = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.api.getAllEmployeeAPI().subscribe((result: any) => {
      this.allemployee = result;
    });
  }

  addEmployee() {
    const existingUser = this.allemployee.find((item: any) => item.id === this.employee.id);
    if (existingUser) {
      alert("ID already exists!!! Please use a unique ID to add a new employee.");
    } else {
      this.api.saveEmployeeAPI(this.employee).subscribe({
        next: (result: any) => {
          console.log(result);
          alert(`${result.name} has been successfully added to our database.`);
          this.router.navigateByUrl('/employee-list');
        },
        error: (err: any) => {
          console.error('Error adding employee:', err);
          alert('Failed to add employee. Please try again.');
        }
      });
    }
  }

  cancel() {
    this.employee = {};  // Clear the form
  }
}
