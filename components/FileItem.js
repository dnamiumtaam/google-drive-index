import { useState } from 'react'

export default function FileItem({ file, onFolderClick }) {
  const [imageError, setImageError] = useState(false)
  
  const isFolder = file.mimeType === 'application/vnd.google-apps.folder'
  const fileSize = file.size ? formatFileSize(file.size) : null
  
  const handleClick = () => {
    if (isFolder) {
      onFolderClick(file.id, file.name)
    } else {
      // For files, open in new tab (in real implementation, use file.webContentLink)
      window.open(file.webContentLink || '#', '_blank')
    }
  }
  
  const handleImageError = () => {
    setImageError(true)
  }
  
  return (
    <div 
      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-4">
        {isFolder ? (
          <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        ) : file.mimeType.startsWith('image/') && !imageError ? (
          <img 
            src={file.thumbnailLink || '/file-icon.png'} 
            alt={file.name}
            className="h-8 w-8 object-cover rounded"
            onError={handleImageError}
          />
        ) : (
          <FileIcon mimeType={file.mimeType} />
        )}
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">
          {file.name}
        </div>
        <div className="text-xs text-gray-500">
          {isFolder ? 'Folder' : `${file.mimeType.split('/').pop().toUpperCase()} • ${fileSize}`}
        </div>
      </div>
      
      <div className="text-xs text-gray-500 whitespace-nowrap ml-4">
        {formatDate(file.modifiedTime)}
      </div>
    </div>
  )
}

function FileIcon({ mimeType }) {
  let iconColor = 'text-gray-400'
  let iconPath = null
  
  if (mimeType.includes('pdf')) {
    iconPath = (
      <path fill="currentColor" d="M8 0C6.9 0 6 .9 6 2v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V4l-4-4H8zm4 4V0l4 4h-4z"/>
    )
    iconColor = 'text-red-500'
  } else if (mimeType.includes('word') || mimeType.includes('document')) {
    iconPath = (
      <path fill="currentColor" d="M6 2h8l4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V8h-4V4H6z"/>
    )
    iconColor = 'text-blue-500'
  } else if (mimeType.includes('sheet') || mimeType.includes('excel')) {
    iconPath = (
      <path fill="currentColor" d="M6 2h8l4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V8h-4V4H6zm2 2h2v2H8V4zm4 0h2v2h-2V4zm-4 4h2v2H8V8zm4 0h2v2h-2V8zm-4 4h2v2H8v-2zm4 0h2v2h-2v-2z"/>
    )
    iconColor = 'text-green-500'
  } else if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    iconPath = (
      <path fill="currentColor" d="M6 2h8l4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V8h-4V4H6zm8 4h2v2h-2V8zm-4 0h2v2h-2V8zm4 4h2v2h-2v-2zm-4 0h2v2h-2v-2zm4 4h2v2h-2v-2zm-4 0h2v2h-2v-2z"/>
    )
    iconColor = 'text-orange-500'
  } else {
    // Default file icon
    iconPath = (
      <path fill="currentColor" d="M6 2h8l4 4v12c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2zm0 2v16h12V8h-4V4H6z"/>
    )
  }
  
  return (
    <svg className={`h-8 w-8 ${iconColor}`} viewBox="0 0 20 20" fill="currentColor">
      {iconPath}
    </svg>
  )
}

function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}