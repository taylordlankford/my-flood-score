import React from 'react'
import ReactApexChart from 'react-apexcharts'

var colors = [ '#29B366', '#1268C1', '#FDD21F', '#F2A173', '#F56E6D' ]

const ComparisonChart = (props) => {      
  const { distributionData } = props

  let seriesData = [0, 0, 0, 0, 0]
  if (distributionData) {
    seriesData = [
      (Math.floor(distributionData['10_20']*100)),
      (Math.floor(distributionData['20_30']*100)),
      (Math.floor(distributionData['30_50']*100)),
      (Math.floor(distributionData['50_70']*100)),
      (Math.floor(distributionData['70_95']*100)),
    ]
  }
  const options = {
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '60%',
        distributed: true,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['10-20', '20-30', '30-50', '50-70', '70-95'],
      labels: {
        style: {
          // colors: colors,
          // fontSize: '13px'
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'in a particular range',
          offsetY: 0,
          offsetX: -25,
          style: {
            color: undefined,
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: 'Helvetica, Arial, sans-serif',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      {
      title: {
        text: '% of properties with scores',
        offsetX: -15,
        style: {
          color: undefined,
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: 'Helvetica, Arial, sans-serif',
          cssClass: 'apexcharts-yaxis-title',
        },
      },
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        formatter: function(val, index) {
          return val + '%'
        }
      },
    }],
    legend: {
      show: false,
    },
  }
  const series = [{
    name: 'Percent Scores',
    data: seriesData,
  }]

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="bar" height="250" />
    </div>
  )
}

export default ComparisonChart
