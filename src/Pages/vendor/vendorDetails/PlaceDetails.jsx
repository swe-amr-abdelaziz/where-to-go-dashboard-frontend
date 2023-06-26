import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Typography, useTheme, Container, Rating, styled } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonIcon from '@mui/icons-material/Person'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import TagIcon from '@mui/icons-material/Tag'
import { formatDistanceToNow } from 'date-fns'
import { CCard } from '@coreui/react'

// import { getCategories, getTags, vendorSearch } from '../../Redux/Slices/searchSlice'
import { getPlace } from '../../../Redux/placeSlice'
import './PlaceDetails.css'
import RiseLoader from 'react-spinners/RiseLoader'
import { useNavigate, useParams } from 'react-router-dom'
import StarIcon from '@mui/icons-material/Star'
import FavouriteIcon from '../../../components/FavouriteIcon/FavouriteIcon'
// import ShareIcon from '@mui/icons-material/Share'
import Carousel from 'react-material-ui-carousel'
import { getReviews, setReviewsVisible } from '../../../Redux/reviewSlice'

import AllReviews from '../../../components/AllReviews/AllReviews'
import axiosInstance from 'src/Axios'

const SearchResults = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  // const _categories = useSelector((state) => state.search.categories)
  // const _tags = useSelector((state) => state.search.tags)
  // const result = useSelector((state) => state.search.result)
  // const [pagination, setPagination] = useState({
  //   currentPage: 1,
  //   totalPages: 5,
  // })
  const place = useSelector((state) => state?.place?.place)
  const [currentPlace, setCurrentPlace] = useState({})
  const [tags, setTags] = useState([])
  const [images, setImages] = useState([])
  const [galleryVisible, setGalleryVisible] = useState(false)
  const [reviews, setReviews] = useState([])

  const override = {
    display: 'block',
    margin: '30vh auto',
  }

  useEffect(() => {
    axiosInstance.get(`/api/v1/auth/vendor/${id}`).then((res) => {
      setCurrentPlace(res.data.data)
      setTags(res.data.tags)
      setLoading(false)
    })
    axiosInstance.get(`/api/v1/reviews/${id}`).then((res) => {
      setReviews(res.data.reviews)
    })
    // dispatch(getPlace(id)).then((data) => {
    //   setTags(data.payload.tags)
    //   dispatch(getReviews(id))
    //   const _gallery = []
    //   _gallery.push(data.payload.data.thumbnail)
    //   _gallery.push(...data.payload.data.gallery)
    //   setImages(_gallery)
    //   setLoading(false)
    // })
  }, [])

  // const gettingPlace = async () => {
  //   await axiosInstance.get(`/api/v1/vendors/${id}`).then((res) => {
  //     setCurrentPlace(res.data.data)
  //   })
  // }
  // useEffect(() => {
  //   gettingPlace()
  // }, [])
  useEffect(() => {
    console.log(currentPlace)
    console.log(tags)
  }, [currentPlace])

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
      color: theme.palette.primary.main,
    },
  })

  return (
    <CCard>
      <Container className="d-flex flex-column mt-4 mb-5">
        {loading ? (
          <RiseLoader
            color={theme.palette.primary.main}
            loading={loading}
            cssOverride={override}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            <Typography variant="h3" className="pb-0">
              {currentPlace?.placeName}
            </Typography>
            <div className="d-flex justify-content-between align-items-center">
              <div className="card-rating d-flex">
                <StarIcon fontSize="small" color="primary" className="me-2" />
                <Typography variant="body">
                  <b>{currentPlace?.avgRate.toFixed(1) || (0).toFixed(1)}</b> &nbsp;
                  <span className="text-muted">({currentPlace?.numberOfReviews || 0} reviews)</span>
                </Typography>
              </div>
            </div>
            <div className="gallery mt-3">
              <img
                className="thumbnail"
                src={`http://localhost:8001/api/v1/images/vendors/${currentPlace?.thumbnail}`}
                alt="thumbnail"
              />
              <img
                className="gallery-1"
                src={`http://localhost:8001/api/v1/images/vendors/${
                  currentPlace?.gallery ? currentPlace?.gallery?.[0] : ''
                }`}
                alt="gallery-1"
              />
              <img
                className="gallery-2"
                src={`http://localhost:8001/api/v1/images/vendors/${
                  currentPlace?.gallery ? currentPlace?.gallery[1] : ''
                }`}
                alt="gallery-2"
              />
              <img
                className="gallery-3"
                src={`http://localhost:8001/api/v1/images/vendors/${
                  currentPlace?.gallery ? currentPlace.gallery?.[2] : ''
                }`}
                alt="gallery-3"
              />
              <Button
                variant="contained"
                color="info"
                className="gallery-btn"
                onClick={() => setGalleryVisible(true)}
              >
                Gallery
              </Button>
            </div>
            {galleryVisible && (
              <>
                <CloseIcon
                  size="large"
                  onClick={() => setGalleryVisible(false)}
                  className="close-gallery"
                />
                <div className="gallery-container">
                  <Carousel
                    className="gallery-slider"
                    autoPlay={false}
                    animation="fade"
                    duration={250}
                    swipe={false}
                    indicators={false}
                    navButtonsAlwaysVisible={true}
                    cycleNavigation={false}
                  >
                    {images.map((img, index) => (
                      <img
                        key={`img_${index}`}
                        className=""
                        src={`http://localhost:8001/api/v1/images/vendors/${img}`}
                        alt=""
                        draggable={false}
                      />
                    ))}
                  </Carousel>
                </div>
              </>
            )}
            <div className="d-flex flex-column flex-md-row">
              <div className="overview flex-grow-1 col-12 col-md-8">
                <Typography variant="h4" className="mt-4 mb-0">
                  Overview
                </Typography>
                <div className="d-flex mb-2">
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <LocationOnIcon color="primary" className="me-1" />
                      <Typography variant="h6">{currentPlace?.address?.street}</Typography>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <LocalOfferIcon fontSize="small" color="primary" className="mx-1" />
                      <Typography variant="h6">{currentPlace?.category[0].name}</Typography>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center mb-2">
                      <PersonIcon color="primary" className="me-2" />
                      <Typography variant="h6">{`${currentPlace?.firstName} ${currentPlace?.lastName}`}</Typography>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <LocalPhoneIcon color="primary" className="me-2" />
                      <Typography variant="h6">{currentPlace?.phoneNumber}</Typography>
                    </div>
                  </div>
                </div>
                <Typography variant="body">{currentPlace?.description}</Typography>
              </div>
              <div className="tags flex-grow-1 col-12 col-md-4">
                <Typography variant="h4" className="mt-4 mb-0">
                  Tags
                </Typography>
                {tags.map((tag, index) => {
                  return (
                    <div key={`tag_${index}`} className="d-flex align-items-center mb-2">
                      <TagIcon color="primary" className="me-1" />
                      <Typography variant="h6">{tag}</Typography>
                    </div>
                  )
                })}
              </div>
            </div>
            {currentPlace?.numberOfReviews > 0 ? (
              <>
                <hr
                  style={{
                    width: '100%',
                    color: '#9095A0',
                    borderWidth: 2,
                    margin: '32px 0',
                  }}
                />
                <div className="card-rating d-flex">
                  <StarIcon fontSize="small" color="primary" className="me-2 mb-3" />
                  <Typography variant="body">
                    <b>{currentPlace?.avgRate.toFixed(1) || (0).toFixed(1)}</b> &nbsp;
                    <span className="text-muted">
                      ({currentPlace?.numberOfReviews || 0} reviews)
                    </span>
                  </Typography>
                </div>
                <div className="reviews-container">
                  {reviews.map((review, index) =>
                    index < 4 ? (
                      <div key={`review_${index}`} className="review-card">
                        <div className="review-user d-flex align-items-center mb-3">
                          <img
                            style={{ width: 48, borderRadius: '50%' }}
                            alt="Profile "
                            src={`http://localhost:8001/api/v1/images/customers/${review.userId.image}`}
                          />
                          <div className="ms-2">
                            <Typography variant="h6">
                              {review.userId?.firstName + ' ' + review.userId?.lastName}
                            </Typography>
                            <Typography variant="body" color={'#9095A0'}>
                              {formatDistanceToNow(new Date(review.timestamp), {
                                addSuffix: true,
                                includeSeconds: false,
                              })}
                            </Typography>
                          </div>
                        </div>
                        <Typography variant="body" className="description">
                          {review.content}
                        </Typography>
                        <StyledRating
                          size="small"
                          defaultValue={review.rating}
                          readOnly
                          style={{ float: 'right' }}
                        />
                      </div>
                    ) : (
                      ''
                    ),
                  )}
                  {currentPlace?.numberOfReviews > 4 ? (
                    <>
                      <Button
                        variant="contained"
                        color="info"
                        onClick={() => dispatch(setReviewsVisible(true))}
                      >
                        Show all reviews
                      </Button>
                      <AllReviews />
                    </>
                  ) : (
                    ''
                  )}
                </div>
              </>
            ) : (
              ''
            )}

            {/* <>
            <hr
              style={{
                width: '100%',
                color: '#9095A0',
                borderWidth: 2,
                margin: '32px 0',
              }}
            />
            <Typography variant="h2" className="pt-0">
              Rate this place
            </Typography>
          </> */}
          </>
        )}
      </Container>
    </CCard>
  )
}

export default SearchResults
