import React from 'react'
import Chart from 'react-apexcharts'
import './FloodScoreGauge.css'

import MFS_Graphic from '../../assets/images/MFS_Graphic.svg'
import Droplet from '../../assets/images/Droplet.svg'

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
                  show: true,
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
                        return val
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
          colors: ['#1A73E8']
        },
        labels: ['Average Results'],
      }, // end options
      // series: [props.MFS],
      series: [59],
      markers: {
        size: [4, 7]
      },
    }

  // this.state = {
  //   options: {
  //     chart: {
  //       id: 'apexchart-example'
  //     },
  //     xaxis: {
  //       categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  //     }
  //   },
  //   series: [{
  //     name: 'series-1',
  //     data: [30, 40, 45, 50, 49, 60, 70, 91]
  //   }]
  // }

}

  componentDidMount() {
    const series = document.getElementsByClassName('apexcharts-series')[0]
    const path = series.querySelector("path");
    const pathOrig = path.getAttributeNode("d").nodeValue
    var containerDiv = path.closest("div[class='col']")

    const svg = path.closest("svg")
    console.log('svg', svg)
    var firstG = svg.firstChild
    console.log('firstG', firstG)
    // var transform = firstG.getAttributeNode("transform")
    // var transform = window
    //   .getComputedStyle(firstG)
    //   .getPropertyValue('transform');
    const transformStyle = firstG.style.transform
    const translateX = transformStyle.replace(/[^\d.]/g, '');
    console.log('translateX', translateX)

    const pathOrigs = pathOrig.split(" ");
    console.log('pathOrigs', pathOrigs)
    const top = parseInt(pathOrigs[1]) + parseInt(pathOrigs[9])
    const left = parseInt(pathOrigs[2]) + parseInt(pathOrigs[10])
    var droplet = document.createElement("IMG");
    droplet.setAttribute('class', 'droplet')
    droplet.setAttribute('style', `top: ${top}px; left: ${left}px;`)
    droplet.setAttribute('src', Droplet)

    console.log('containerDiv', containerDiv)
    containerDiv.append(droplet)
    // console.log('path', path)
  }

  render() {
    const {
      series,
      options,
    } = this.state
    return (
      <div>
        <Chart options={options} series={series} type="radialBar" width={500} height={320} />
        <img style={{ display: 'none', position: 'absolute', top: '3px', left: '131px' }} src={MFS_Graphic} width={250} height={160} />
      </div>
    )
  }
}

export default FloodScoreGauge