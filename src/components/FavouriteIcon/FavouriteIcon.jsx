import React, { useDispatch, useSelector } from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import Favorite from '@mui/icons-material/Favorite'
import PropTypes from 'prop-types'
// import { addFavoriteVendor, deleteFavoriteVendor, getAllFavoriteVendors, setVendorId } from '../../Redux/Slices/profileSlice';
import { useEffect, useState } from 'react'

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const FavouriteIcon = ({ checked, vendorId }) => {
  // const [_checked, setChecked] = useState(false);
  // const VENDOR_ID = useSelector((state) => state.profile.vendorId)

  // const dispatch = useDispatch()
  // useEffect(() => {
  //   if (_checked) {
  //     dispatch(deleteFavoriteVendor({ vendorId, customerId: localStorage.getItem('userId') }));
  //   } else {
  //     dispatch(addFavoriteVendor({ vendorId, customerId: localStorage.getItem('userId') }));
  //   }
  // }, [VENDOR_ID])

  const handleChange = (event) => {
    // if (event.target.checked) {
    //   dispatch(addFavoriteVendor({ vendorId, customerId: localStorage.getItem('userId') })).then(
    //     (res) => {
    //       dispatch(getAllFavoriteVendors())
    //     },
    //   )
    // } else {
    //   dispatch(deleteFavoriteVendor({ vendorId, customerId: localStorage.getItem('userId') })).then(
    //     (res) => {
    //       dispatch(getAllFavoriteVendors())
    //     },
    //   )
    // }
  }
  return (
    <div>
      <Checkbox
        {...label}
        checked={checked}
        onChange={handleChange}
        icon={<FavoriteBorder style={{ color: '#9095A0' }} />}
        checkedIcon={<Favorite />}
      />
    </div>
  )
}

FavouriteIcon.propTypes = {
  checked: PropTypes.bool,
  vendorId: PropTypes.string,
}

export default FavouriteIcon
