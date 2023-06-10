import React from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import './uploadImage.css'

// drag drop file component
const UploadImage = () => {
  // drag state
  const [dragActive, setDragActive] = React.useState(false)
  // ref
  const inputRef = React.useRef(null)

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // handleFiles(e.dataTransfer.files);
    }
  }

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      // handleFiles(e.target.files);
    }
  }

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click()
  }

  return (
    <div id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? 'drag-active' : ''}
      >
        <div>
          <CloudUploadIcon id="imageIcon"></CloudUploadIcon>
          <h5>Drag file here</h5>
          <p>Supported Formats PNG, JPG</p>
          <h5>OR</h5>
          <button className="upload-button" onClick={onButtonClick}>
            Browse files
          </button>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </div>
  )
}

export default UploadImage
