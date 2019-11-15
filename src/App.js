import "core-js";
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.maskBullets = false;

    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

    xAxis.dataFields.category = "format";
    yAxis.dataFields.category = "language";

    xAxis.renderer.grid.template.disabled = true;
    xAxis.renderer.minGridDistance = 40;

    yAxis.renderer.grid.template.disabled = true;
    yAxis.renderer.inversed = true;
    yAxis.renderer.minGridDistance = 30;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "format";
    series.dataFields.categoryY = "language";
    series.dataFields.value = "value";
    series.sequencedInterpolation = true;
    series.defaultState.transitionDuration = 3000;

    let bgColor = new am4core.InterfaceColorSet().getFor("background");

    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 1;
    columnTemplate.strokeOpacity = 0.2;
    columnTemplate.stroke = bgColor;
    columnTemplate.tooltipText = "{format}, {language}: {value.workingValue.formatNumber('#.')}";
    columnTemplate.width = am4core.percent(100);
    columnTemplate.height = am4core.percent(100);

    series.heatRules.push({
      target: columnTemplate,
      property: "fill",
      min: am4core.color(bgColor),
      max: chart.colors.getIndex(0)
    });

    // heat legend
    let heatLegend = chart.bottomAxesContainer.createChild(am4charts.HeatLegend);
    heatLegend.width = am4core.percent(100);
    heatLegend.series = series;
    heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
    heatLegend.valueAxis.renderer.minGridDistance = 30;

    // heat legend behavior
    series.columns.template.events.on("over", function(event) {
      handleHover(event.target);
    })

    series.columns.template.events.on("hit", function(event) {
      handleHover(event.target);
    })

    function handleHover(column) {
      if (!isNaN(column.dataItem.value)) {
        heatLegend.valueAxis.showTooltipAt(column.dataItem.value)
      }
      else {
        heatLegend.valueAxis.hideTooltip();
      }
    }

    series.columns.template.events.on("out", function(event) {
      heatLegend.valueAxis.hideTooltip();
    })

    chart.data = [
      {
        "language": "English (NA)",
        "format": "Tweet",
        "value": 17.9
      },
      {
        "language": "French",
        "format": "Tweet",
        "value": 27.91
      },
      {
        "language": "German",
        "format": "Tweet",
        "value": 4.65
      },
      {
        "language": "Catalan",
        "format": "Tweet",
        "value": 0
      },
      {
        "language": "Spanish",
        "format": "Tweet",
        "value": 2.05
      },
      {
        "language": "English (Aus)",
        "format": "Tweet",
        "value": 6.5
      },
      {
        "language": "Tagalog",
        "format": "Tweet",
        "value": 15.8
      },
      {
        "language": "English (NA)",
        "format": "Movie/TV Show/VG",
        "value": 21.4
      },
      {
        "language": "French",
        "format": "Movie/TV Show/VG",
        "value": 10.47
      },
      {
        "language": "German",
        "format": "Movie/TV Show/VG",
        "value": 53.49
      },
      {
        "language": "Catalan",
        "format": "Movie/TV Show/VG",
        "value": 36
      },
      {
        "language": "Spanish",
        "format": "Movie/TV Show/VG",
        "value": 27.18
      },
      {
        "language": "English (Aus)",
        "format": "Movie/TV Show/VG",
        "value": 10
      },
      {
        "language": "Tagalog",
        "format": "Movie/TV Show/VG",
        "value": 2.60
      },
      {
        "language": "English (NA)",
        "format": "Video",
        "value": 4.3
      },
      {
        "language": "French",
        "format": "Video",
        "value": 22.09
      },
      {
        "language": "German",
        "format": "Video",
        "value": 0
      },
      {
        "language": "Catalan",
        "format": "Video",
        "value": 5.33
      },
      {
        "language": "Spanish",
        "format": "Video",
        "value": 3.08
      },
      {
        "language": "English (Aus)",
        "format": "Video",
        "value": 15.5
      },
      {
        "language": "Tagalog",
        "format": "Video",
        "value": 34.20
      },
      {
        "language": "English (NA)",
        "format": "Message Screenshot",
        "value": 2.6
      },
      {
        "language": "French",
        "format": "Message Screenshot",
        "value": 0
      },
      {
        "language": "German",
        "format": "Message Screenshot",
        "value": 0
      },
      {
        "language": "Catalan",
        "format": "Message Screenshot",
        "value": 1.33
      },
      {
        "language": "Spanish",
        "format": "Message Screenshot",
        "value": 4.6
      },
      {
        "language": "English (Aus)",
        "format": "Message Screenshot",
        "value": 2
      },
      {
        "language": "Tagalog",
        "format": "Message Screenshot",
        "value": 0
      },
      {
        "language": "English (NA)",
        "format": "Image and Text",
        "value": 47.9
      },
      {
        "language": "French",
        "format": "Image and Text",
        "value": 37.21
      },
      {
        "language": "German",
        "format": "Image and Text",
        "value": 41.87
      },
      {
        "language": "Catalan",
        "format": "Image and Text",
        "value": 45.33
      },
      {
        "language": "Spanish",
        "format": "Image and Text",
        "value": 40.51
      },
      {
        "language": "English (Aus)",
        "format": "Image and Text",
        "value": 41
      },
      {
        "language": "Tagalog",
        "format": "Image and Text",
        "value": 39.5
      },
      {
        "language": "English (NA)",
        "format": "Image",
        "value": 2.6
      },
      {
        "language": "French",
        "format": "Image",
        "value": 2.33
      },
      {
        "language": "German",
        "format": "Image",
        "value": 0
      },
      {
        "language": "Catalan",
        "format": "Image",
        "value": 0
      },
      {
        "language": "Spanish",
        "format": "Image",
        "value": 2.56
      },
      {
        "language": "English (Aus)",
        "format": "Image",
        "value": 7
      },
      {
        "language": "Tagalog",
        "format": "Image",
        "value": 2.60
      },
      {
        "language": "English (NA)",
        "format": "Sequential Image",
        "value": 3.4
      },
      {
        "language": "French",
        "format": "Sequential Image",
        "value": 0
      },
      {
        "language": "German",
        "format": "Sequential Image",
        "value": 0
      },
      {
        "language": "Catalan",
        "format": "Sequential mage",
        "value": 12
      },
      {
        "language": "Spanish",
        "format": "Sequential Image",
        "value": 17.95
      },
      {
        "language": "English (Aus)",
        "format": "Sequential Image",
        "value": 18
      },
      {
        "language": "Tagalog",
        "format": "Sequential Image",
        "value": 5.3
      },
      {
        "language": "English (NA)",
        "format": "Cats",
        "value": 0
      },
      {
        "language": "French",
        "format": "Cats",
        "value": 0
      },
      {
        "language": "German",
        "format": "Cats",
        "value": 0
      },
      {
        "language": "Catalan",
        "format": "Cats",
        "value": 0
      },
      {
        "language": "Spanish",
        "format": "Cats",
        "value": 6
      },
      {
        "language": "English (Aus)",
        "format": "Cats",
        "value": 0
      },
      {
        "language": "Tagalog",
        "format": "Cats",
        "value": 0
      },
      
      
      
      
      
    ];


    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    );
  }
}


export default App;
