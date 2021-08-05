import { Component, OnInit } from '@angular/core';
import { apiService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dimension: any;
  measures: any;


  constructor(private httpService: apiService) { }
  ngOnInit() {
    this.httpService.getColumns().subscribe(res => this.columns = res)
  }
  title = 'plotter';
  columns: any;
  drag(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  dropDimension(ev: any) {
    ev.preventDefault();
    if (ev.target.innerText) return;
    let data = ev.dataTransfer.getData("text");
    let classes = document.getElementById(data)?.classList;
    if (!classes?.contains('dimension'))
      return;
    document.getElementById(data)?.classList
    ev.target.appendChild(document.getElementById(data));
    this.getDataRequest();
  }
  dropMeasure(ev: any) {
    ev.preventDefault();
    if (ev.target.innerText) {
    }
    var data = ev.dataTransfer.getData("text");
    let classes = document.getElementById(data)?.classList;
    if (!classes?.contains('measure'))
      return;
    ev.target.appendChild(document.getElementById(data));
    this.getDataRequest();
  }
  allowDrop(ev: any) {
    ev.preventDefault();
  }
  clear(element: any, dataType: string) {
    let span = element.firstChild;
    let aID = "listItem" + span.id.replace("drag", "");
    let a = document.getElementById(aID);
    if (a !== null)
      a.appendChild(span);
    dataType == 'dimension' ? this.dimension = '' : this.measures = '';
    this.getDataRequest()
  }
  getDataRequest() {
    let dim = document.getElementById('div1')?.innerText
    let measureChilderen = document.getElementById('div2')?.children
    let measures: any = [];
    if (measureChilderen?.length)
      for (let i = 0; i < measureChilderen?.length; i++) {
        measures.push(measureChilderen[i]?.textContent)
      }
    if (dim && measures.length) {
      const body = {
        measures: measures,
        dimension: dim
      }
      this.httpService.getData(body).subscribe((res: any) => {
        console.log(res);
        [this.dimension, ...this.measures] = res
      })
    }
  }
}
