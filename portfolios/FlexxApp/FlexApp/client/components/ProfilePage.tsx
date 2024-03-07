import { Uploader } from 'uploader'
import { Button } from 'react-bootstrap'
import { saveImg } from '../apis/profile'
import { useContext } from 'react'
import UserContext from './UserContext'
import React, { useState, useEffect } from 'react'
import { fetchUser } from '../apis/fetchUser'

const uploader = Uploader({
  apiKey: 'free',
})

export default function Profile() {
  const [image, setImage] = useState('null')
  const [isImageLoaded, setIsImageLoaded] = useState(Boolean)
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser().then((user) => setUser(user))
  }, [])

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
              const userId = user.id
              await saveImg(base64data, userId)
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
