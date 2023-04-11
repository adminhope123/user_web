import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
// components
import { useChart } from '../../../components/chart';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

AppCurrentVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartColors: PropTypes.arrayOf(PropTypes.string),
  chartData: PropTypes.array,
};

export default function AppCurrentVisits({ title, subheader, chartColors, chartData, ...other }) {
  const [chartDataSeries,setChartDataSeries]=useState()
  const [chartOptionsData,setChartOptionsData]=useState()
  const theme = useTheme();

  useEffect(() => {
    getDataFunction()
  }, [])

  const getDataFunction=()=>{
        // access obj properties here
        if(typeof chartData !== 'undefined' && chartData !== null){
          const chartLabels =Object.keys(chartData);
          const chartSeries =Object.values(chartData);
          setChartDataSeries(chartSeries)
          const chartOptions = useChart({
            colors: chartColors,
            labels: chartLabels.toString(),
            stroke: { colors: [theme.palette.background.paper] },
            legend: { floating: true, horizontalAlign: 'center' },
            dataLabels: { enabled: true, dropShadow: { enabled: false } },
            tooltip: {
              fillSeriesColor: false,
              y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                  formatter: (seriesName) => `${seriesName}`,
                },
              },
            },
            plotOptions: {
              pie: { donut: { labels: { show: false } } },
            },
          });
          if(chartOptions){
            setChartOptionsData(chartOptions)
          }
        }
    
  }
   

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <StyledChartWrapper dir="ltr">
        {
          chartDataSeries&&chartOptionsData?
          <ReactApexChart type="pie" series={chartDataSeries} options={chartOptionsData} height={280} />
        :""}
      </StyledChartWrapper>
    </Card>
  );
}
