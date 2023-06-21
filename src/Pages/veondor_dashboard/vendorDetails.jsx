import React, { useEffect, useState } from 'react'
import axiosInstance from 'src/Axios'
import ReactStars from 'react-rating-stars-component'
import { CCard, CCardBody, CButton } from '@coreui/react'
import './vendorDetails.css'
import {
  GeoAltFill,
  TagFill,
  PersonFill,
  TelephoneFill,
  EnvelopeAtFill,
  BookmarkCheckFill,
  PencilSquare,
} from 'react-bootstrap-icons'
import { useParams, Link } from 'react-router-dom'

const VendorDetails = () => {
  const id = localStorage.getItem('v_id')
  const [placeDetails, setPlaceDetails] = useState({})

  useEffect(() => {
    getPlace()
    // getImages()
  }, [])
  // useEffect(() => {
  //   getImages()
  // }, [placeDetails])

  const getPlace = async () => {
    await axiosInstance.get(`/api/v1/vendors/${id}`).then((res) => {
      setPlaceDetails(res.data.data)
    })
    //.catch((error) => console.log(error))
  }

  // const getImages = async () => {
  //   let thumbnail = await axiosInstance.get(`api/v1/images/vendors/${placeDetails.thumbnail}`)
  //   setPlaceDetails({ ...placeDetails, thumbnail: thumbnail })
  //   let gallery = []
  //   placeDetails.gallery &&
  //     placeDetails.gallery.forEach(async (imgName) => {
  //       let image = await axiosInstance.get(`api/v1/images/vendors/${imgName}`)
  //       gallery.push(image)
  //     })
  //   setPlaceDetails({ ...placeDetails, gallery: gallery })
  //   console.log(placeDetails)
  // }

  return (
    <CCard className="p-5">
      <Link to="/vendor/edit">
        <CButton className="me-2 bg-base d-flex align-items-center">
          <PencilSquare className="me-1" />
          Edit Profile Data
        </CButton>
      </Link>
      <CCardBody>
        <h5>
          <strong>{placeDetails?.placeName}</strong>
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
            src={`http://localhost:8001/api/v1/images/vendors/${placeDetails.thumbnail}`}
            alt="Thumbnail"
          />
          <div className="d-flex flex-column justify-content-between imagesColumn">
            {placeDetails.gallery && (
              <img
                className="mb-1 image"
                src={`http://localhost:8001/api/v1/images/vendors/${placeDetails.gallery[0]}`}
                alt="Gallery 0"
              />
            )}
            {placeDetails.gallery && (
              <img
                className="mb-1 image"
                src={`http://localhost:8001/api/v1/images/vendors/${placeDetails.gallery[1]}`}
                alt="Gallery 0"
              />
            )}
            {placeDetails.gallery && (
              <img
                className="mb-1 image"
                src={`http://localhost:8001/api/v1/images/vendors/${placeDetails.gallery[2]}`}
                alt="Gallery 0"
              />
            )}
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
                  {placeDetails.category?.[0]?.name}
                </small>
                <small className="d-flex align-items-center mt-2">
                  <EnvelopeAtFill className="me-2 text-primary" />
                  {placeDetails.email}
                </small>
              </div>
              <div className="col-6">
                <small className="d-flex align-items-center mb-2">
                  <PersonFill className="me-2 text-primary" />
                  {placeDetails?.firstName + ' ' + placeDetails?.lastName}
                </small>
                <small className="d-flex align-items-center mt-2">
                  <TelephoneFill className="me-2 text-primary" />
                  {placeDetails?.phoneNumber}
                </small>
              </div>
            </div>
            <div className="description">{placeDetails?.description}</div>
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
