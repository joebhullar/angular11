import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service:SharedService) { }

  DepartmentList:any=[]; 

  ModalTitle:string;
  ActivateAddEditDepComp:boolean=false;
  dep:any;
  
  
  ngOnInit(): void {
    this.refreshDepList(); 
  }

  addClick(){
    this.dep={
      DepartmentId:0,
      DepartmentName:""
    }
    console.log("addClick()");
    this.ModalTitle="Add Department";
    this.ActivateAddEditDepComp=true; 
  }

  editClick(item){
    this.dep=item;      
    this.ModalTitle="Edit Department";
    this.ActivateAddEditDepComp=true;   
    console.log(this.dep.DepartmentId + "  "+this.dep.DepartmentName);
  }

  deleteClick(item){
     if(confirm('Are you sure?')){
        this.service.deleteDepartment(item.DepartmentId).subscribe(data=>{
          alert(data.toString());
          this.refreshDepList();
        })  
     }
  }

closeClick(){
  this.ActivateAddEditDepComp=false;
  this.refreshDepList();
}

refreshDepList(){
     this.service.getDepList().subscribe(data=>{
       this.DepartmentList=data;
     });
  }

}
