import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { setReviewsVisible } from '../../Redux/reviewSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Rating, Typography, styled, useTheme } from '@mui/material'
import { formatDistanceToNow } from 'date-fns'

const AllReviews = () => {
  const theme = useTheme()
  const [scroll, setScroll] = React.useState('body')
  const reviewsVisible = useSelector((state) => state.review.reviewsVisible)
  const reviews = useSelector((state) => state.review.reviews)
  const dispatch = useDispatch()

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
      color: theme.palette.primary.main,
    },
  })

  const handleClose = () => {
    dispatch(setReviewsVisible(false))
  }

  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (reviewsVisible) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [reviewsVisible])

  return (
    <div>
      <Dialog
        open={reviewsVisible}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">All Reviews</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <div id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {reviews.map((review, index) => (
              <div key={`Review_${index}`} className="review-card-all">
                <div className="review-user d-flex align-items-center mb-3">
                  <img
                    style={{ width: 48, borderRadius: '50%' }}
                    alt="Profile Image"
                    src={`http://localhost:8001/api/v1/images/customers/${review.userId.image}`}
                  />
                  <div className="ms-2">
                    <Typography variant="h6">
                      {review.userId.firstName + ' ' + review.userId.lastName}
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
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AllReviews
