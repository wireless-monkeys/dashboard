import { useEffect, useRef, useState } from 'react'
import { client } from '../client'

function useBlobUrl(blob: Blob | null): string | null {
  const blobRef = useRef<Blob | null>(null)
  const urlRef = useRef<string | null>(null)

  if (blobRef.current !== blob) {
    blobRef.current = blob
    urlRef.current = blob ? URL.createObjectURL(blob) : null
  }

  const lastUrl = urlRef.current
  useEffect(() => {
    if (lastUrl === null) return
    return () => {
      URL.revokeObjectURL(lastUrl)
    }
  }, [lastUrl])

  return urlRef.current
}

export function CameraFeed() {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null)
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0)
  const imageUrl = useBlobUrl(imageBlob)

  useEffect(() => {
    const controller = new AbortController()
    const cameraStream = client.subscribeCamera(
      {},
      { abort: controller.signal }
    )
    cameraStream.responses.onNext((response) => {
      if (response?.image) {
        setImageBlob(new Blob([response.image]))
      }
      if (response?.numberOfPeople !== undefined) {
        setNumberOfPeople(Number(response.numberOfPeople))
      }
    })
    return () => {
      controller.abort()
    }
  }, [])

  return (
    <div className="flex flex-col items-center gap-10 p-10">
      <h1 className="text-3xl font-bold">Camera Feed</h1>
      <img alt="Camera feed" src={imageUrl ? imageUrl : undefined} />
      <h1 className="text-2xl font-bold">Number Of People: {numberOfPeople}</h1>
    </div>
  )
}
