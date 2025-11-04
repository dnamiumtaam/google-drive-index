export default function Breadcrumb({ items, onItemClick }) {
  return (
    <nav className="mb-4">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        {items.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {index > 0 && (
              <svg className="h-4 w-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <button
              onClick={() => onItemClick(item.id)}
              className={`hover:text-gray-700 ${index === items.length - 1 ? 'font-medium text-gray-900' : ''}`}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}