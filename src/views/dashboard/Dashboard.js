import React, { useEffect } from 'react'

import { CButton, CButtonGroup, CCard, CCardBody, CCol, CRow, CWidgetStatsF } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilChartPie } from '@coreui/icons'

import { useDispatch, useSelector } from 'react-redux'
import {
  getCustomers,
  getNewCustomers,
  getPlaces,
  getVendorMonthlyFavorites,
  getVendorMonthlyReviews,
  getVendors,
  getVendorTotalFavorites,
  getVendorTotalReviews,
} from '../../Redux/StatisticsSlice/statisticsSlice'

const Dashboard = () => {
  const dispatch = useDispatch()
  const customerReports = useSelector((state) => state.statistics.customers)
  const vendorReports = useSelector((state) => state.statistics.vendors)
  const topPlaces = useSelector((state) => state.statistics.places)
  const logedInUser = useSelector((state) => state.notification.role)
  const newCustomers = useSelector((state) => state.statistics.newCustomers)
  const vendorMonthlyReviews = useSelector((state) => state.statistics.vendorMonthly.reviews)
  const vendorMonthlyFavorites = useSelector((state) => state.statistics.vendorMonthly.favorites)
  const vendorTotal = useSelector((state) => state.statistics.vendorTotal)

  useEffect(() => {
    if (logedInUser === 'Employee') {
      dispatch(getCustomers())
      dispatch(getVendors())
      dispatch(getPlaces())
      dispatch(getNewCustomers())
    } else if (logedInUser === 'Vendor') {
      dispatch(getVendorTotalReviews())
      dispatch(getVendorTotalFavorites())
      dispatch(getVendorMonthlyReviews())
      dispatch(getVendorMonthlyFavorites())
    }
  }, [])
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

  return (
    <>
      {logedInUser === 'Employee' ? (
        <>
          <CRow>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: ['Verified Customers', 'Deleted Customers', 'banned Customers', 'Rest'],
                  datasets: [
                    {
                      data: [
                        customerReports.verifiedCustomers,
                        customerReports.deletedCustomers,
                        customerReports.bannedCustomers,
                        customerReports.totalCustomers -
                          (customerReports.verifiedCustomers +
                            customerReports.deletedCustomers +
                            customerReports.bannedCustomers),
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#00D8FF'],
                    },
                  ],
                }}
              />
            </CCol>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: ['Approved Vendors', 'Not Approved', 'banned Vendors', 'Rest'],
                  datasets: [
                    {
                      data: [
                        vendorReports.approvedVendors,
                        customerReports.deletedCustomers,
                        customerReports.bannedCustomers,
                        customerReports.totalCustomers -
                          customerReports.deletedCustomers +
                          customerReports.bannedCustomers +
                          customerReports.verifiedCustomers,
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#00D8FF'],
                    },
                  ],
                }}
              />
            </CCol>
            <CCol className="mb-4" sm={6} lg={4}>
              <CChart
                type="doughnut"
                data={{
                  labels: [
                    topPlaces[0]?.placeName,
                    topPlaces[1]?.placeName,
                    topPlaces[2]?.placeName,
                    topPlaces[3]?.placeName,
                  ],
                  datasets: [
                    {
                      data: [
                        topPlaces[0]?.numberOfReviews,
                        topPlaces[1]?.numberOfReviews,
                        topPlaces[2]?.numberOfReviews,
                        topPlaces[3]?.numberOfReviews,
                      ],
                      backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'],
                    },
                  ],
                }}
              />
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    New Users
                  </h4>
                  <div className="small text-medium-emphasis">Jan - Dec 2021</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    {['Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Year'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'New Users',
                      backgroundColor: '#f87979',
                      data: [
                        newCustomers[0]?.newUsers,
                        newCustomers[1]?.newUsers,
                        newCustomers[2]?.newUsers,
                        newCustomers[3]?.newUsers,
                        newCustomers[4]?.newUsers,
                        newCustomers[5]?.newUsers,
                        newCustomers[6]?.newUsers,
                        newCustomers[7]?.newUsers,
                        newCustomers[8]?.newUsers,
                        newCustomers[9]?.newUsers,
                        newCustomers[10]?.newUsers,
                        newCustomers[11]?.newUsers,
                      ],
                    },
                  ],
                }}
                labels="Months"
              />
            </CCardBody>
          </CCard>
        </>
      ) : (
        <>
          <CRow>
            <CCol className="mb-4" sm={6} lg={6}>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilChartPie} height={24} />}
                padding={false}
                title="Total Reviews"
                value={vendorTotal.reviews}
              />
            </CCol>
            <CCol className="mb-4" sm={6} lg={6}>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilChartPie} height={24} />}
                padding={false}
                title="Total Favorites"
                value={vendorTotal.favorites}
              />
            </CCol>
          </CRow>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    New Reviews
                  </h4>
                  <div className="small text-medium-emphasis">Jan - Dec 2021</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    {['Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Year'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'New Reviews',
                      backgroundColor: '#f87979',
                      data: [
                        vendorMonthlyReviews[0],
                        vendorMonthlyReviews[1],
                        vendorMonthlyReviews[2],
                        vendorMonthlyReviews[3],
                        vendorMonthlyReviews[4],
                        vendorMonthlyReviews[5],
                        vendorMonthlyReviews[6],
                        vendorMonthlyReviews[7],
                        vendorMonthlyReviews[8],
                        vendorMonthlyReviews[9],
                        vendorMonthlyReviews[10],
                        vendorMonthlyReviews[11],
                      ],
                    },
                  ],
                }}
                labels="Months"
              />
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    New Favorites
                  </h4>
                  <div className="small text-medium-emphasis">Jan - Dec 2021</div>
                </CCol>
                <CCol sm={7} className="d-none d-md-block">
                  <CButtonGroup className="float-end me-3">
                    {['Month', 'Year'].map((value) => (
                      <CButton
                        color="outline-secondary"
                        key={value}
                        className="mx-0"
                        active={value === 'Year'}
                      >
                        {value}
                      </CButton>
                    ))}
                  </CButtonGroup>
                </CCol>
              </CRow>
              <CChart
                type="bar"
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ],
                  datasets: [
                    {
                      label: 'New Favorites',
                      backgroundColor: '#f87979',
                      data: [
                        vendorMonthlyFavorites[0]?.count,
                        vendorMonthlyFavorites[1]?.count,
                        vendorMonthlyFavorites[2]?.count,
                        vendorMonthlyFavorites[3]?.count,
                        vendorMonthlyFavorites[4]?.count,
                        vendorMonthlyFavorites[5]?.count,
                        vendorMonthlyFavorites[6]?.count,
                        vendorMonthlyFavorites[7]?.count,
                        vendorMonthlyFavorites[8]?.count,
                        vendorMonthlyFavorites[9]?.count,
                        vendorMonthlyFavorites[10]?.count,
                        vendorMonthlyFavorites[11]?.count,
                      ],
                    },
                  ],
                }}
                labels="Months"
              />
            </CCardBody>
          </CCard>
        </>
      )}
    </>
  )
}

export default Dashboard
