import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-donas',
  templateUrl: './donas.component.html',
  styleUrls: ['./donas.component.css']
})
export class DonasComponent {

  @Input() title: string = 'Sin Titulo';


   // Doughnut
   @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   @Input('data') public doughnutChartData: MultiDataSet = [
     [350, 450, 100],
     [50, 150, 120],
   ];
   public doughnutChartType: ChartType = 'doughnut';

  constructor() { }

  ngOnInit(): void {
  }


   // events
   public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public colors:Color[] = [
    {backgroundColor: ['#9ea103','#cccccc', '#ff3454']},
    {backgroundColor: ['blue','#cccccc', 'yellow']},
  ]


}
