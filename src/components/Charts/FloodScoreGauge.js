import React from 'react'
import Chart from 'react-apexcharts'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import './FloodScoreGauge.css'

import MFS_Graphic from '../../assets/images/MFS_Graphic.svg'
import Droplet from '../../assets/images/Droplet.svg'



const adjustForGraphic = (mfs) => {
  if (mfs <= 10) {
    return mfs - 9
  }
  if (mfs <= 20) {
    return mfs - 5
  }
  if (mfs <= 30) {
    return mfs
  }
  if (mfs <= 50) {
    return mfs + 4
  }
  if (mfs <= 70) {
    return mfs + 6
  }
  if (mfs <= 100) {
    return mfs + 6
  }
}

class FloodScoreGauge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'apexchart-example',
          type: 'radialBar',
          offsetY: -20,
          animations: {
            enabled: false,
          }
        },
        plotOptions: {
          radialBar: {
              size: undefined,
              inverseOrder: false,
              startAngle: -90,
              endAngle: 90,
              offsetX: 0,
              offsetY: 0,
              hollow: {
                  margin: 5,
                  size: '50%',
                  background: 'transparent',
                  image: undefined,
                  imageWidth: 150,
                  imageHeight: 150,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  imageClipped: true,
                  position: 'front',
                  dropShadow: {
                    enabled: false,
                    top: 0,
                    left: 0,
                    blur: 3,
                    opacity: 0.5
                  }
              },
              track: {
                  show: false,
                  startAngle: undefined,
                  endAngle: undefined,
                  background: '#f2f2f2',
                  strokeWidth: '97%',
                  opacity: 1,
                  margin: 30,
                  dropShadow: {
                      enabled: false,
                      top: 0,
                      left: 0,
                      blur: 3,
                      opacity: 0.5
                  }
              },
              dataLabels: {
                  show: true,
                  name: {
                      show: false,
                      fontSize: '22px',
                      fontFamily: undefined,
                      color: undefined,
                      offsetY: -10
                    },
                    value: {
                      show: true,
                      fontSize: '26px',
                      fontFamily: undefined,
                      color: undefined,
                      fontWeight: 'bold',
                      offsetY: -10,
                      formatter: function (val) {
                        return props.MFS
                      }
                    },
                    total: {
                      show: false,
                      label: 'Total',
                      color: '#373d3f',
                      formatter: function (w) {
                        return w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0) / w.globals.series.length + '%'
                      }
                    }
              }
          }
      },
        fill: {
          colors: ['#f2f2f2'],
          // colors: ['#FF0000'],
          opacity: 0,
        },
        labels: ['Average Results'],
      }, // end options
      // series: [props.MFS],
      series: [adjustForGraphic(props.MFS)],
      markers: {
        size: [4, 7]
      },
    }

}

  componentDidMount() {
    const series = document.getElementsByClassName('apexcharts-series')[0]
    const path = series.querySelector("path");
    const pathOrig = path.getAttributeNode("d").nodeValue
    var containerDiv = path.closest("div[class='col']")

    const svg = path.closest("svg")
    var firstG = svg.firstChild
    var transform = window
      .getComputedStyle(firstG)
      .getPropertyValue('transform');
    transform = transform.replace("matrix", '').replace(')', '').replace('(', '');
    transform = transform.split(', ')
    const translateX = transform[4]
    const margLeft = parseInt(translateX) + 10

    const pathOrigs = pathOrig.split(" ");
    var droplet = document.createElement("IMG");
    droplet.setAttribute('class', 'droplet')
    droplet.setAttribute('style', `top: ${pathOrigs[10]}px; left: ${pathOrigs[9]}px; margin-left: ${margLeft}px; display: block`)
    droplet.setAttribute('src', Droplet)

    containerDiv.append(droplet)


    //reportContainer
    setTimeout(() => {
      var reportHtml = document.getElementById('reportContainer')
      html2canvas(reportHtml)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          console.log('imgData', imgData)
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save("download.pdf");
        })
    }, 300);

    //reportContainer
    // var reportHtml = document.getElementById('reportContainer').innerHTML
    // var doc = new jsPDF();   

    // doc.html(document.getElementById('reportContainer').innerHTML, {
    //   callback: function (doc) {
    //     doc.save();
    //   }
    // });

    // var doc = new jsPDF();          
    // var elementHandler = {
    //   '#ignorePDF': function (element, renderer) {
    //     return true;
    //   }
    // };
    // var source = window.document.getElementById("reportContainer");
    // doc.fromHTML(
    //     source,
    //     15,
    //     15,
    //     {
    //       'width': 180,'elementHandlers': elementHandler
    //     });
    // doc.save();
  } // did mount

  render() {
    const {
      series,
      options,
    } = this.state
    return (
      <div>
        <Chart options={options} series={series} type="radialBar" width={500} height={320} />
        <img style={{ opacity: '1', position: 'absolute', top: '3px', left: '131px', width: '240px' }} src={MFS_Graphic} width={250} height={160} />
      </div>
    )
  }
}

export default FloodScoreGauge