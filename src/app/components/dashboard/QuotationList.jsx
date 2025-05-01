export default function QuotationList({ quotations }) {
    return (
      <div className="space-y-3">
        {quotations.map((quotation) => (
          <div 
            key={quotation.id}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm">#{quotation.id}</span>
              <span className="text-gray-500 text-sm">{quotation.date}</span>
            </div>
            
            <h3 className="font-medium text-gray-800">{quotation.customer}</h3>
            
            <div className="flex items-center mt-2">
              <span 
                className={`${quotation.color} text-xs rounded-full px-2 py-1 font-medium`}
              >
                {quotation.system} - {quotation.brand}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }