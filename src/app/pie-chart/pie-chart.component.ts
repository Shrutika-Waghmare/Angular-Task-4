import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit{
  pieFormObj : FormGroup | any;
  public pieChart : any;
  chartdata : any[] = [];

  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
    this.pieFormObj = this.fb.group({
      inputOne : this.fb.control(null,[Validators.required,Validators.max(100)]),
      inputTwo : this.fb.control(null,Validators.required)
    })
  }

  onSubmit(){
    let newInputVal : any = (100 - Number(this.pieFormObj.controls.inputOne.value));
    this.pieFormObj.controls.inputTwo.setValue(newInputVal);
    this.chartdata.push(this.pieFormObj.controls.inputOne.value, this.pieFormObj.controls.inputTwo.value);
    this.createChart(); 
  }

  onClickClear(){
    this.pieFormObj.reset();
    this.chartdata = [];
    window.location.reload();
  }

  createChart(){
    this.pieChart = new Chart('pieChart',{
      type : 'pie',
      data : {
        labels : ['value 1', 'value 2'],
      datasets : [
        {
          label : "Pie Chart",
          data : this.chartdata,
          backgroundColor : ['red', 'yellow']
        }
      ]
      },
      options : {
        aspectRatio : 2.5
      }
    });
  }
}
