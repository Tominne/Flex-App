import { Uploader } from 'uploader'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { saveImg } from '../apis/profile'

const uploader = Uploader({
  apiKey: 'free',
})

export default function Profile() {
  const [image, setImage] = useState('null')
  const [isImageLoaded, setIsImageLoaded] = useState(Boolean)

  async function handleImageUpload() {
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
        if (file instanceof Blob) {
          let reader = new FileReader()
          reader.onloadend = async function () {
            let base64data = reader.result as string
            setImage(base64data)
            try {
              await saveImg(base64data)
            } catch (error) {
              console.error(error)
            }
          }
          reader.readAsDataURL(file)
        }
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
          Yeah this things doesn't work yet either, but feel free to try...
        </div>
      )}
    </div>
  )
}
