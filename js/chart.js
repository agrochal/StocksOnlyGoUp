am4core.ready(function() {

  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.colors.list = [
    am4core.color("#00ff47")
  ];

  chart.dataSource.url = "sample_data.json";

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.baseInterval = {
    "timeUnit": "day",
    "count": 1
  };
  dateAxis.tooltipDateFormat = "d-MM-YYYY";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.text = "Price";
  valueAxis.title.fill = "#DEDEDE";

  valueAxis.renderer.labels.template.fill = am4core.color("#DEDEDE");
  dateAxis.renderer.labels.template.fill = am4core.color("#DEDEDE");

  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.dateX = "date";
  series.dataFields.valueY = "price";
  series.tooltipText = "Price: [bold]{valueY}[/]";
  series.fillOpacity = 0.5;
  series.stroke = am4core.color("#278741");
  series.strokeWidth = 2;


  chart.cursor = new am4charts.XYCursor();
  chart.cursor.lineY.opacity = 0;
  /*chart.scrollbarX = new am4charts.XYChartScrollbar();
  chart.scrollbarX.series.push(series);*/
  chart.zoomOutButton.background.fill = am4core.color("#25283D");
  chart.zoomOutButton.icon.stroke = am4core.color("#EFD9CE");
  chart.zoomOutButton.icon.strokeWidth = 2;
  chart.zoomOutButton.background.states.getKey("hover").properties.fill = am4core.color("#3a406b");
  chart.zoomOutButton.background.states.getKey("down").properties.fill = am4core.color("#4e5691");


  dateAxis.start = 0.1;
  dateAxis.end = 0.9;
  dateAxis.keepSelection = true;

});
