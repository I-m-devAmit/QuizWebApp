import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/shared/shared/api.service';
import { DashboardModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  formValue !: FormGroup;
  dashboardModelObj: DashboardModel = new DashboardModel();
  allData !: any;
  showAdd!: boolean;
  ShowUpdate!: boolean;

  constructor(private formBuilder: FormBuilder,private api: ApiService) { }

  ngOnInit(): void {  
    this.formValue = this.formBuilder.group({
      question : [''],
      option1 : [''],
      option2 : [''],
      option3 : [''],
      option4 : [''],
    })
    this.getAllData();
  }


  clickAddData(){
    this.formValue.reset();
    this.showAdd = true;
    this.ShowUpdate= false;
  }


  postDetailData(){
    this.dashboardModelObj.question= this.formValue.value.question;
    this.dashboardModelObj.option1= this.formValue.value.option1;
    this.dashboardModelObj.option2= this.formValue.value.option2;
    this.dashboardModelObj.option3= this.formValue.value.option3;
    this.dashboardModelObj.option4= this.formValue.value.option4;
  
    this.api.postData(this.dashboardModelObj)
    .subscribe((res)=>{
      console.log(res);
      alert("Question Added Successfully");
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllData();
    },
    err=>{
      alert("Something went wrong");
    })
  }

  getAllData(){
    this.api.getData()
    .subscribe(res=>{
      this.allData= res;
    })
  }

  deleteData(row : any){
    this.api.deleteData(row.id)
    .subscribe(res =>{
      alert("Question Deleted");
      this.getAllData();
    })
  }

  onEdit(row: any){
    this.showAdd = false;
    this.ShowUpdate= true;
    this.dashboardModelObj.id = row.id;
    this.formValue.controls['question'].setValue(row.question);
    this.formValue.controls['option1'].setValue(row.option1);
    this.formValue.controls['option2'].setValue(row.option2);
    this.formValue.controls['option3'].setValue(row.option3);
    this.formValue.controls['option4'].setValue(row.option4);
  }

  updateDetailData(){
    this.dashboardModelObj.question= this.formValue.value.question;
    this.dashboardModelObj.option1= this.formValue.value.option1;
    this.dashboardModelObj.option2= this.formValue.value.option2;
    this.dashboardModelObj.option3= this.formValue.value.option3;
    this.dashboardModelObj.option4= this.formValue.value.option4;
  
    this.api.updateData(this.dashboardModelObj, this.dashboardModelObj.id)
    .subscribe(res=> {
      alert ("Updated Successfully");
      let ref= document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllData();

    })

  }

}
