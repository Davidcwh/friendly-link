import { useEffect, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { UserLink } from "../LinksDashboard/types";
import { InfoChartWrapper } from './styles';
import API from '../../util/API';
import { Statistic, Row, Col } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';

interface LinkInfoChartProps {
    userLink: UserLink
}

const LinkInfoChart = ({
    userLink
}: LinkInfoChartProps) => {
    const [totalClickCount, setTotalClickCount] = useState(0);
    const [clickCountByDate, setClickCountByDate] = useState<any>([]);

    const getDateString = (date: Date) => {
        const offset = date.getTimezoneOffset();
        const finalDate = new Date(date.getTime() - (offset*60*1000));
        return finalDate.toISOString().split('T')[0];
    }

    const fetchClickData = async () => {
        const totalClickRes = await API.getTotalClickCount(userLink.shortcode).catch(error => console.log(error));
        
        if(totalClickRes) {
            console.log(totalClickRes.data.clickCount);
            setTotalClickCount(totalClickRes.data.clickCount);
        };

        const clickCountByDateRes = await API.getClickCountByDate(userLink.shortcode).catch(error => console.log(error));
        if(clickCountByDateRes) {
            console.log(clickCountByDateRes.data);

            const data = clickCountByDateRes.data;
            const datesArray: any = [];

            const startDate = new Date(userLink.datecreated);
            const endDate = new Date();
            var currentDate = startDate;
            while (currentDate <= endDate) {
                datesArray.push(new Date (currentDate));
                currentDate.setDate(currentDate.getDate() + 1);
            }
            
            const dataArray = data.reduce((acc: any, item: any) => {
                const date = item.clickdate;
                const clicks = item.count;
                acc[date] = { clicks }
                return acc
            }, {});

            const baseDate = new Date("1970-01-01");
            const clickCountByDateArray = datesArray.map((date: any) => {
                const dateString = getDateString(date);
                const clicks = dataArray[dateString] === undefined ? 0 : parseInt(dataArray[dateString].clicks, 10);

                const dateObj = new Date(dateString);

                return {
                    x: dateObj.getTime() - baseDate.getTime(),
                    y: clicks
                }
            });

            setClickCountByDate(clickCountByDateArray);
        }
                                            
    }
    
    useEffect(() => {
        fetchClickData();
    }, []);

    const options = {
        chart: {
            type: 'column',
            zoomType: 'x',
            panning: true,
            panKey: 'shift',
            height: '30%',
            resetZoomButton: {
                theme: {
                    fill: 'white',
                    stroke: 'rgb(255, 130, 92)',
                    r: 0,
                    style: {
                        fontFamily: 'Motiva Sans Light, serif',
                        textTransform: "uppercase",
                        color: 'rgb(255, 130, 92)',
                    },
                    states: {
                        hover: {
                            fill: 'rgb(255, 130, 92)',
                            style: {
                                fontFamily: 'Motiva Sans Light, serif',
                                textTransform: "uppercase",
                                color: 'white',
                            }
                        }
                    }
                }
            }
        },
        title: {
          text: ''
        },
        series: [{
          data: clickCountByDate,
          name: "Total Clicks",
          color: '#FFD524'
        }],
        credits: {
            enabled: false
        },
        legend: {
            enabled: false
        },
        xAxis: {
            labels: {
                format: "{value:%b %e}",
                style: {
                    fontFamily: 'Motiva Sans Light, serif',
                    textTransform: "uppercase"
                }
            },
            tickInterval: 604800000, // weekly interval
            type: "datetime",
            min: clickCountByDate.length > 0 ? clickCountByDate[0].x : 0,
            
        },
        yAxis: {
            visible: false,
            title: {
                text: "Clicks"
            }
        },
        tooltip: {
            style: {
                fontFamily: 'Motiva Sans Light, serif',
                // textTransform: "uppercase"
            }
        }
    }

    return (
        <InfoChartWrapper>
            <Statistic title="TOTAL CLICKS" value={totalClickCount} prefix={<BarChartOutlined/>} />
            {clickCountByDate.length > 0 && totalClickCount > 0 && <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />}
        </InfoChartWrapper>
    )
}

export default LinkInfoChart;
