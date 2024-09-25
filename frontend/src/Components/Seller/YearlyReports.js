import { Link } from "react-router-dom"
import Sidebar from "./SellerSidebar"
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function YearlyReports() {
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
                console.log(data.show_chart_yearly_orders)
                setDates(data.show_chart_yearly_orders.dates)
                setData(data.show_chart_yearly_orders.data)
            })
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
                    <h3>Yearly Report</h3>
                    <div className='row mt-2'>
                    {chartElement}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YearlyReports