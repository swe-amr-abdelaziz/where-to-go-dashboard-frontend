import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CRow,
} from '@coreui/react'
import UploadImage from './../../../../components/uploadImage/uploadImage'

const VendorAdd = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <h4 className="mb-4 mt-2">
              <strong>New Vendor</strong>
            </h4>
            <CForm>
              <CFormLabel htmlFor="exampleFormControlInput1">Owner</CFormLabel>
              <div className="mb-3 d-flex">
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="First Name"
                  aria-label="default input example"
                />
                <CFormInput
                  className="ms-2"
                  type="text"
                  placeholder="Last Name"
                  aria-label="default input example"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Place Name</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Place Name"
                  aria-label="default input example"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Tags</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Tags"
                  aria-label="default input example"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Location</CFormLabel>
                <CFormInput
                  className="me-2"
                  type="text"
                  placeholder="Street"
                  aria-label="default input example"
                />
                <div className="mb-3 d-flex my-3">
                  <CFormSelect className="me-2">
                    <option disabled>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>
                      Three
                    </option>
                  </CFormSelect>
                  <CFormSelect className="mx-2">
                    <option disabled>Governorate</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3" disabled>
                      Three
                    </option>
                  </CFormSelect>
                  <CFormInput
                    className="mx-2"
                    type="text"
                    placeholder="City"
                    aria-label="default input example"
                  />
                  <CFormInput
                    className="ms-2"
                    type="text"
                    placeholder="Postal Code"
                    aria-label="default input example"
                  />
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Contact Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="exampleFormControlInput1"
                  placeholder="Contact Number"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="exampleFormControlInput1"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Thumbnail</CFormLabel>
                <UploadImage></UploadImage>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Gallery</CFormLabel>
                <UploadImage></UploadImage>
              </div>
              <div>
                <CButton>Submit</CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VendorAdd
