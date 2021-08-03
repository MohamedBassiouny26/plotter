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
    if (ev.target.innerText) return;
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
    console.log(this.measures)
  }
  getDataRequest() {
    let dim = document.getElementById('div1')?.innerText
    let measure = document.getElementById('div2')?.innerText
    if (dim && measure) {
      console.log("sendRequest");
      const body = {
        measures: [measure],
        dimension: dim
      }
      this.httpService.getData(body).subscribe((res: any) => {
        console.log(res)
        this.dimension = res[0];
        this.measures = res[1];
      })
    }
  }
}
