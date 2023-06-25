import React, { useEffect, useState, useRef } from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CNav,
  CNavItem,
  CNavLink,
} from '@coreui/react'
import {
  PlusCircleFill,
  ThreeDotsVertical,
  PencilSquare,
  EyeFill,
  Trash,
} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import axiosInstance from 'src/Axios'
import { Column } from 'primereact/column'
import { Menu } from 'primereact/menu'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import { DataTable } from 'primereact/datatable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FilterMatchMode, FilterOperator } from 'primereact/api'
import { ThreeCircles } from 'react-loader-spinner'
import './vendorList.css'

const VendorList = () => {
  const [vendorList, setVendorList] = useState([])
  const [currentTab, setCurrentTab] = useState('All Vendors')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const [selectedVendor, setSelectedVendor] = useState({
    isApproved: false,
  })

  const [id, setId] = useState(null)
  useEffect(() => {
    getVendorsList()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value
    let _filters = { ...filters }

    _filters['global'].value = value

    setFilters(_filters)
    setSearch(value)
  }

  // useEffect(() => {
  //   let index = vendorList.findIndex((element) => element._id === selectedVendor._id)
  //   setVendorList([...vendorList.slice(0, index), ...vendorList.slice(index + 1)])
  // }, [selectedVendor.isApproved && currentTab === 'Not Approved'])

  useEffect(() => {
    let index = vendorList.findIndex((element) => element._id === selectedVendor._id)
    setVendorList([...vendorList.slice(0, index), selectedVendor, ...vendorList.slice(index + 1)])
  }, [selectedVendor.isApproved])

  useEffect(() => {
    let index = vendorList.findIndex((element) => element._id === selectedVendor._id)
    setVendorList([...vendorList.slice(0, index), selectedVendor, ...vendorList.slice(index + 1)])
  }, [selectedVendor.deactivatedAt])

  const getVendorsList = async (_url) => {
    let url = _url === undefined ? '/api/v1/vendors' : _url

    await axiosInstance
      .get(url)
      .then((res) => {
        setVendorList(res.data.data)
      })
      .catch((error) => {})
  }
  /*useEffect(() => {
    console.log(currentTab)
  }, [currentTab])*/
  const handleNavigation = (event) => {
    let currentTab = event.target
    setCurrentTab(event.target.innerText)

    let siblings = Array.from(currentTab.parentNode.parentNode.childNodes).filter(
      (node) => node !== currentTab.parentNode,
    )

    siblings.forEach((node) => {
      node.childNodes[0].classList.remove('bg-base')
    })

    switch (event.target.innerText) {
      case 'All Vendors':
        getVendorsList('/api/v1/vendors')
        event.target.classList.add('bg-base')
        break
      case 'Approved':
        getVendorsList('/api/v1/vendors/approved')
        event.target.classList.add('bg-base')
        break
      case 'Not Approved':
        getVendorsList('/api/v1/vendors/rejected')
        event.target.classList.add('bg-base')
        break
      default:
        break
    }
    // console.log(event.target.classList.add('active'))
  }

  const handleDelete = async (id) => {
    await axiosInstance.patch(`api/v1/vendors/${id}/deactivate`).then().catch()
  }

  const navigate = useNavigate()
  const menu = useRef(null)

  const actionsBodyTemplate = (rowData) => {
    const _model = [
      {
        label: 'Details',
        icon: 'pi pi-info-circle',
        command: (e) => {
          // console.log(e)
          navigate(`/vendors/${id}`)
        },
      },
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: (e) => {
          navigate(`/vendors/edit/${id}`)
        },
      },
      {
        label: selectedVendor.deactivatedAt === null ? 'Deactivate' : 'Activate',
        icon: 'pi pi-info-circle',
        command: (e) => {
          if (selectedVendor.deactivatedAt === null) {
            axiosInstance.patch(`/api/v1/vendors/${id}/deactivate`)
            setSelectedVendor({ ...selectedVendor, deactivatedAt: Date.now() })
          } else {
            axiosInstance.patch(`/api/v1/vendors/${id}/restore`)
            setSelectedVendor({ ...selectedVendor, deactivatedAt: null })
          }
        },
      },
      {
        label: 'Approve',
        icon: 'pi pi-info-circle',
        command: (e) => {
          axiosInstance.patch(`/api/v1/vendors/${id}/activate`)
          setSelectedVendor({ ...selectedVendor, isApproved: true })
        },
      },
    ]

    if (selectedVendor.isApproved === true) {
      _model.splice(3, 1)
    }

    return (
      <>
        <Menu model={_model} popup ref={menu} id={`actions_${rowData.id}`} />
        <Button
          label={<ThreeDotsVertical />}
          icon=""
          className="mr-2 three-dots"
          onClick={(event) => {
            setSelectedVendor(rowData)
            menu.current.toggle(event)
            setId(rowData._id)
          }}
          aria-controls={`actions_${rowData.id}`}
          aria-haspopup
        />
      </>
    )
  }

  /*const handleOptionsClick = (e) => {
    console.log(e.target)
  }*/

  const handleIsApprovedDisplay = (currentVendor) => {
    return currentVendor.isApproved === true ? (
      <FontAwesomeIcon className="text-success" icon={faDotCircle} />
    ) : (
      <FontAwesomeIcon className="text-secondary" icon={faDotCircle} />
    )
  }

  const handleActivateDisplay = (currentVendor) => {
    return currentVendor.deactivatedAt === null ? (
      <FontAwesomeIcon className="text-success" icon={faDotCircle} />
    ) : (
      <FontAwesomeIcon className="text-secondary" icon={faDotCircle} />
    )
  }

  return (
    <CCard className="m-3 mb-5 p-4 shadow">
      <CCardBody>
        <div className="d-flex justify-content-between mb-4 mt-2">
          <h3>Vendors List</h3>
          <div className="d-flex justify-content-between">
            <Link to="/vendors/create">
              <CButton className="me-2 bg-base d-flex align-items-center">
                <PlusCircleFill className="me-1" />
                New
              </CButton>
            </Link>
            <CFormInput
              type="search"
              value={search}
              onChange={(e) => handleSearch(e)}
              className="me-2"
              placeholder="Search"
            />
          </div>
        </div>

        <CNav variant="tabs">
          <CNavItem>
            <CNavLink className="bg-base" onClick={handleNavigation}>
              All Vendors
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={handleNavigation}>Approved</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink onClick={handleNavigation}>Not Approved</CNavLink>
          </CNavItem>
        </CNav>

        {vendorList.length === 1 ? (
          <div className="d-flex justify-content-center align-items-center my-5">
            <ThreeCircles
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="three-circles-rotating"
              outerCircleColor=""
              innerCircleColor=""
              middleCircleColor=""
            />
          </div>
        ) : (
          <>
            <DataTable
              value={vendorList}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              tableStyle={{ minWidth: '50rem' }}
              filters={filters}
            >
              <Column field="placeName" header="Place Name" style={{ width: '15%' }}></Column>
              <Column field="phoneNumber" header="Phone" style={{ width: '15%' }}></Column>
              <Column field="email" header="Email" style={{ width: '15%' }}></Column>
              <Column
                field="isApproved"
                body={handleIsApprovedDisplay}
                header="Approved"
                style={{ width: '15%' }}
              ></Column>
              <Column
                field="deactivatedAt"
                body={handleActivateDisplay}
                header="Activate"
                style={{ width: '15%' }}
              ></Column>
              <Column
                body={actionsBodyTemplate}
                //onClick={handleOptionsClick}
                bodyClassName="text-center"
                style={{ width: '5%' }}
              ></Column>
            </DataTable>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default VendorList

{
  /* <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Place</CTableHeaderCell>
              <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Approved</CTableHeaderCell>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {vendorList.map((vendor) => (
              <CTableRow key={vendor._id}>
                <CTableHeaderCell scope="row">{vendor.placeName}</CTableHeaderCell>
                <CTableDataCell>{vendor.firstName + ' ' + vendor.lastName}</CTableDataCell>
                <CTableDataCell>{vendor.phoneNumber}</CTableDataCell>
                <CTableDataCell>{vendor.email}</CTableDataCell>
                <CTableDataCell>{vendor.isApproved}</CTableDataCell>
                <CTableDataCell>
                  <Column
                    body={actionsBodyTemplate}
                    bodyClassName="text-center"
                    style={{ width: '50%' }}
                  ></Column>
                  <CDropdown>
                    <CDropdownToggle color="secondary">
                      <ThreeDotsVertical />
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem to={`/vendors/${vendor._id}`}>
                        <EyeFill className="me-2 text-primary" />
                        View
                      </CDropdownItem>
                      <CDropdownItem href="#">
                        <PencilSquare className="me-2 text-secondary" />
                        Edit
                      </CDropdownItem>
                      <CDropdownItem onClick={() => handleDelete(vendor._id)}>
                        <Trash className="me-2 text-danger" />
                        Delete
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable> */
}
