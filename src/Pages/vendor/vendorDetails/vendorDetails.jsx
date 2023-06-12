import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/Axios'
import ReactStars from 'react-rating-stars-component'
import { CCard, CCardBody } from '@coreui/react'
import './vendorDetails.css'
import {
  GeoAltFill,
  TagFill,
  PersonFill,
  TelephoneFill,
  EnvelopeAtFill,
  BookmarkCheckFill,
} from 'react-bootstrap-icons'
import { useParams } from 'react-router-dom'

const VendorDetails = () => {
  const { id } = useParams()
  const [placeDetails, setPlaceDetails] = useState(null)

  useEffect(() => {
    getPlace()
  }, [])

  const getPlace = async () => {
    await axiosInstance
      .get(`/api/v1/vendors/${id}`)
      .then((res) => {
        setPlaceDetails(res.data.data)
        console.log(res.data.data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <CCard className="p-5">
      <CCardBody>
        <h5>
          <strong>{placeDetails && placeDetails.placeName}</strong>
        </h5>

        <div className="d-flex mb-4">
          <ReactStars count={1} />
          <div className="ms-2">
            <strong>4.2 </strong>
            <small>( 425 Reviews)</small>
          </div>
        </div>

        <div className="d-flex justify-content-between gallery ">
          <img
            className="thumbnail m-0"
            src={
              'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
            }
            alt="Thumbnail"
          />
          <div className="d-flex flex-column justify-content-between imagesColumn">
            <img
              className="mb-1 image"
              src={
                'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80'
              }
              alt="Thumbnail"
            />
            <img
              className="my-1 image"
              src={
                'https://images.unsplash.com/photo-1495467033336-2effd8753d51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
              }
              alt="Thumbnail"
            />
            <img
              className="mt-1 image"
              src={
                'https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80'
              }
              alt="Thumbnail"
            />
          </div>
        </div>
        <div className="d-flex py-5">
          <div className="w-50">
            <h6>
              <strong>Overview</strong>
            </h6>
            <div className="row my-3">
              <div className="col-6">
                <small className="d-flex align-items-center mb-2">
                  <GeoAltFill className="me-2 text-primary" />
                  address
                </small>
                <small className="d-flex align-items-center mt-2">
                  <TagFill className="me-2 text-primary" />
                  {placeDetails && placeDetails.category[0].name}
                </small>
                <small className="d-flex align-items-center mt-2">
                  <EnvelopeAtFill className="me-2 text-primary" />
                  {placeDetails && placeDetails.email}
                </small>
              </div>
              <div className="col-6">
                <small className="d-flex align-items-center mb-2">
                  <PersonFill className="me-2 text-primary" />
                  {placeDetails && placeDetails.firstName + ' ' + placeDetails.lastName}
                </small>
                <small className="d-flex align-items-center mt-2">
                  <TelephoneFill className="me-2 text-primary" />
                  {placeDetails && placeDetails.phoneNumber}
                </small>
              </div>
            </div>
            <div className="description">{placeDetails && placeDetails.description}</div>
          </div>
          <div className="w-50 ms-5 ps-5">
            <h6>
              <strong>Tags</strong>
            </h6>
            <div className="row">
              <div className="col-4">
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
              </div>
              <div className="col-8">
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
                <p>
                  <small>
                    <BookmarkCheckFill className="me-2" />
                    Tag1
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
    </CCard>
  )
}
export default VendorDetails
