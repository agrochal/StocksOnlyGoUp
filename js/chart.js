am4core.ready(function() {

  am4core.useTheme(am4themes_animated);

  var chart = am4core.create("chartdiv", am4charts.XYChart);
  chart.colors.list = [
    am4core.color("#00ff47")
  ];

  chart.dataSource.url = "data.json";

  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.baseInterval = {
    "timeUnit": "day",
    "count": 1
  };
  dateAxis.tooltipDateFormat = "d-MM-YYYY";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;
  valueAxis.title.text = "Accumulated price";
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


  dateAxis.start = 0;
  dateAxis.end = 1;
  dateAxis.keepSelection = true;


  dateAxis.events.on("startchanged", dateAxisChanged);
  dateAxis.events.on("endchanged", dateAxisChanged);

  function dateAxisChanged(ev) {
    var start = new Date(ev.target.minZoomed);
    var end = new Date(ev.target.maxZoomed);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    //console.log("Start: " + start.getDate() + " " + monthNames[start.getMonth()] + " " + start.getFullYear());
    let new_start = start;
    let new_end = end;

    if (start.getDay() == 0) {
      new_start.setDate(new_start.getDate() + 1);
    }
    if (start.getDay() == 6) {
      new_start.setDate(new_start.getDate() - 1);
    }

    if (end.getDay() == 0) {
      new_end.setDate(new_end.getDate() + 1);
    }
    if (end.getDay() == 6) {
      new_end.setDate(new_end.getDate() - 1);
    }

    document.querySelector("#startDate").textContent = start.getDate() + " " + monthNames[start.getMonth()] + " " + start.getFullYear();
    getChange(formatDate(new_start), formatDate(new_end)).then(value => {
        document.querySelector("#stockChange").textContent = value;
    })

    async function getChange(start, end) {
      const json = await fetch('./data.json');
      const data = await json.json();
      let start_value;
      let end_value;

      do {
      data.forEach(entry => {
        if (entry["date"] == start) {
          start_value = entry["price"];
        }

        if (entry["date"] == end) {
          end_value = entry["price"];
        }

      });

      if(typeof start_value === "undefined"){
        start.setDate(start.getDate() + 1);
      }

      if(typeof end_value === "undefined"){
        end.setDate(end.getDate() - 1);
      }

    } while(typeof start_value === "undefined" || typeof end_value === "undefined")

      return ((end_value - start_value) * 100 / start_value).toFixed(2) + "%";
    }

    function formatDate(date) {
      let days = ("0" + date.getDate()).slice(-2);
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let year = date.getFullYear();
      return year + "-" + month + "-" + days;
    }
  }


});
