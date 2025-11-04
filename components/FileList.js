import FileItem from './FileItem'

export default function FileList({ files, onFolderClick }) {
  if (files.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-500">This folder is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-1 divide-y">
        {files.map(file => (
          <FileItem 
            key={file.id} 
            file={file} 
            onFolderClick={onFolderClick}
          />
        ))}
      </div>
    </div>
  )
}