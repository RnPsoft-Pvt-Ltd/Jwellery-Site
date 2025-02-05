export default function CartItem({ image, name, price, quantity, onQuantityChange, onRemove }) {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <img src={image || "/placeholder.svg"} alt={name} className="w-24 h-24 object-cover rounded" />
  
        <div className="flex-1">
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">1 Qty.</p>
  
          <div className="flex items-center gap-2 mt-2">
            <select
              value={quantity}
              onChange={(e) => onQuantityChange(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
  
            <button onClick={onRemove} className="text-sm text-gray-500 hover:text-gray-700">
              Remove
            </button>
          </div>
        </div>
  
        <div className="text-right">
          <p className="font-medium">Rs. {price}</p>
        </div>
      </div>
    )
  }
  
  