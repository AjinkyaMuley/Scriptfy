import { Link } from "react-router-dom"
import Sidebar from "./SellerSidebar"
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function MonthlyReports() {
    const baseUrl = 'http://127.0.0.1:8000/api';
    const vendor_id = localStorage.getItem('vendor_id')
    const [dates, setDates] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        fetch_reports(baseUrl + '/vendor/' + vendor_id)
    }, [])

    function fetch_reports(baseUrl) {
        fetch(baseUrl)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.show_chart_monthly_orders)
                setDates(data.show_chart_monthly_orders.dates)
                setData(data.show_chart_monthly_orders.data)
            })
    }

    function getMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1); // Month is 0-indexed
        return date.toLocaleString('default', { month: 'long' });
    }

    const chartOptions = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: dates
            }
        },
        series: [
            {
                name: "Orders",
                data: data
            }
        ]
    };

    const chartElement = <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        width="500"
    />

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-md-3 col-12 mb-2'>
                    <Sidebar />
                </div>
                <div className='col-md-9 col-12 mb-2'>
                    <h3>Monthly Report</h3>
                    <div className='row mt-2'>
                    {chartElement}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MonthlyReports