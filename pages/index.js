import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import FileList from '../components/FileList'
import Breadcrumb from '../components/Breadcrumb'

export default function Home() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentFolder, setCurrentFolder] = useState('root')
  const [breadcrumb, setBreadcrumb] = useState([{ name: 'Home', id: 'root' }])

  useEffect(() => {
    fetchFiles(currentFolder)
  }, [currentFolder])

  const fetchFiles = async (folderId = 'root') => {
    setLoading(true)
    try {
      const response = await fetch(`/api/drive?folderId=${folderId}`)
      const data = await response.json()
      setFiles(data.files || [])
    } catch (error) {
      console.error('Error fetching files:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFolderClick = (folderId, folderName) => {
    setCurrentFolder(folderId)
    
    // Update breadcrumb
    const newBreadcrumb = [...breadcrumb]
    const existingIndex = newBreadcrumb.findIndex(item => item.id === folderId)
    
    if (existingIndex !== -1) {
      // If folder already in breadcrumb, truncate to that point
      setBreadcrumb(newBreadcrumb.slice(0, existingIndex + 1))
    } else {
      // Add new folder to breadcrumb
      setBreadcrumb([...newBreadcrumb, { name: folderName, id: folderId }])
    }
  }

  const handleBreadcrumbClick = (folderId) => {
    setCurrentFolder(folderId)
    
    // Find the index of the clicked breadcrumb item
    const clickedIndex = breadcrumb.findIndex(item => item.id === folderId)
    setBreadcrumb(breadcrumb.slice(0, clickedIndex + 1))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Google Drive Index</title>
        <meta name="description" content="Google Drive file browser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumb} 
          onItemClick={handleBreadcrumbClick}
        />
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <FileList 
            files={files} 
            onFolderClick={handleFolderClick}
          />
        )}
      </main>
    </div>
  )
}