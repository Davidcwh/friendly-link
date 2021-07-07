import React from 'react';
import { BarChart, CartesianGrid, XAxis, Tooltip, Bar } from 'recharts'

const LinkChart = ({ data, dateCreated }) => {

    const getDateString = (date) => {
        const offset = date.getTimezoneOffset();
        const finalDate = new Date(date.getTime() - (offset*60*1000));
        return finalDate.toISOString().split('T')[0];
    }


    const generateDatesArray = (data) => {
        const datesArray = [];
        if(data.length === 0) {
            return datesArray;
        }

        const startDate = new Date(dateCreated);
        const endDate = new Date();
        var currentDate = startDate;
        while (currentDate <= endDate) {
            datesArray.push(new Date (currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        return datesArray;
    }
    const datesArray = generateDatesArray(data);
    const dataArray = data.reduce((acc, item) => {
        const date = item.clickdate;
        const clicks = item.count;
        acc[date] = { clicks }
        return acc
    }, {})

    const barData = datesArray.map((date, index) => {
        const dateString = getDateString(date);
        const clicks = dataArray[dateString] === undefined ? 0 : dataArray[dateString].clicks;
        return {
            clickdate: dateString,
            clicks
        }
    })
    return (
        <BarChart width={200 * barData.length} height={250} data={barData} maxBarSize={100}>
            <XAxis dataKey="clickdate" />
            <Tooltip />
            <Bar dataKey="clicks" fill="#8884d8" />
        </BarChart>
    )
}

export default LinkChart;
