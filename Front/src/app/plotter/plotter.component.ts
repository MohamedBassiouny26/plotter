import { AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-plotter',
  templateUrl: './plotter.component.html',
  styleUrls: ['./plotter.component.css']
})
export class PlotterComponent implements OnInit, AfterViewInit, OnChanges {
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;
  measuresData: any = []
  @Input() dimensions!: any;
  @Input() measures: any = [];
  chart: any;
  colors: any = {
    0: "#007ee7",
    1: "red",
    2: "green"
  }
  constructor() { }


  ngOnInit() {
  }
  ngOnChanges() {
    this.measuresData = []
    this.measures.forEach((elem: any, i: number = 0) => {
      this.measuresData.push({
        label: elem.name,
        data: elem.values,
        borderColor: this.colors[i]
      })
    });
    this.chart ? (this.chart.data.datasets = this.measuresData) && this.chart.update() : ''

  }
  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');


    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: this.measuresData,
        labels: this.dimensions?.values
      }
    });
    console.log(this.chart)
  }

}
