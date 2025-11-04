import axios from 'axios'

export default async function handler(req, res) {
  const { folderId = 'root' } = req.query
  
  try {
    // This is a placeholder for the actual Google Drive API integration
    // In a real implementation, you would:
    // 1. Set up OAuth2 authentication with Google Drive API
    // 2. Use the folderId to list files in that folder
    
    // For demonstration purposes, we'll return mock data
    const mockFiles = getMockFiles(folderId)
    
    res.status(200).json({
      files: mockFiles
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: 'Failed to fetch files' })
  }
}

// Mock data function - replace with actual Google Drive API calls
function getMockFiles(folderId) {
  // Different folders have different contents
  if (folderId === 'root') {
    return [
      {
        id: 'folder1',
        name: 'Documents',
        mimeType: 'application/vnd.google-apps.folder',
        size: null,
        modifiedTime: '2023-05-15T10:30:00.000Z'
      },
      {
        id: 'folder2',
        name: 'Images',
        mimeType: 'application/vnd.google-apps.folder',
        size: null,
        modifiedTime: '2023-05-14T15:45:00.000Z'
      },
      {
        id: 'file1',
        name: 'Resume.pdf',
        mimeType: 'application/pdf',
        size: '245762',
        modifiedTime: '2023-05-10T09:15:00.000Z',
        webContentLink: '#'
      },
      {
        id: 'file2',
        name: 'Budget.xlsx',
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        size: '18945',
        modifiedTime: '2023-05-12T14:20:00.000Z',
        webContentLink: '#'
      }
    ]
  } else if (folderId === 'folder1') {
    return [
      {
        id: 'file3',
        name: 'Project Proposal.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        size: '35678',
        modifiedTime: '2023-05-08T11:30:00.000Z',
        webContentLink: '#'
      },
      {
        id: 'file4',
        name: 'Meeting Notes.txt',
        mimeType: 'text/plain',
        size: '2048',
        modifiedTime: '2023-05-05T16:45:00.000Z',
        webContentLink: '#'
      }
    ]
  } else if (folderId === 'folder2') {
    return [
      {
        id: 'file5',
        name: 'Vacation Photo.jpg',
        mimeType: 'image/jpeg',
        size: '3456789',
        modifiedTime: '2023-04-20T12:15:00.000Z',
        webContentLink: '#'
      },
      {
        id: 'file6',
        name: 'Screenshot.png',
        mimeType: 'image/png',
        size: '1234567',
        modifiedTime: '2023-04-18T09:30:00.000Z',
        webContentLink: '#'
      }
    ]
  }
  
  return []
}