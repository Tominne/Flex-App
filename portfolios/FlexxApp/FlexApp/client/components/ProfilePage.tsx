import { Uploader } from 'uploader'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

const uploader = Uploader({
  apiKey: 'free',
})

export default function Profile() {
  const [image, setImage] = useState('null')
  const [isImageLoaded, setIsImageLoaded] = useState(Boolean)

  function handleImageUpload() {
    uploader
      .open({
        multi: false,
        mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        editor: {
          images: {
            crop: true,
            cropShape: 'circ', //rect available
            cropRatio: 1 / 1,
          },
        },
      })
      .then((files) => {
        const file = files[0]
        if (file instanceof Blob) setImage(URL.createObjectURL(file))
      })
  }

  function handleImageLoad() {
    setIsImageLoaded(true)
  }

  return (
    <div>
      <Button onClick={handleImageUpload}>
        Upload Rational explanation for what you are doing here...
      </Button>
      <br></br>
      <br></br>
      {image && (
        <img
          src={image}
          alt="Profile Picture"
          onLoad={handleImageLoad}
          onError={() => {
            return 'Error loading image'
          }}
        />
      )}
      {image && !isImageLoaded && (
        <div>
          Yeah this things doesn't work yet either, but feel free to try.
        </div>
      )}
    </div>
  )
}
