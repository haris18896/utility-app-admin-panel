import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col } from 'reactstrap'
import { useSelector } from 'react-redux'

export const PreviewImage = ({ file }) => {
  const [preview, setPreview] = useState(null)
  const { currentSkin } = useSelector(state => state.skin)
  const reader = new FileReader()
  if (file) {
    reader.readAsDataURL(file)
  }
  reader.onloadend = () => {
    setPreview(reader.result)
  }

  return (
    <Col sm={12} md={6} lg={4} className='d-flex mt-1'>
      {preview ? (
        <LazyLoadImage
          alt='icon1'
          src={preview}
          width='80px'
          height='80px'
          style={{ borderRadius: '10px' }}
          placeholder={<Skeleton baseColor={currentSkin === 'light' ? '#ebebeb' : '#bebebe'} width={80} height={80} />}
        />
      ) : (
        <Skeleton
          style={{ visibility: 'hidden' }}
          baseColor={currentSkin === 'light' ? '#ebebeb' : '#bebebe'}
          width={80}
          height={80}
        />
      )}
    </Col>
  )
}
