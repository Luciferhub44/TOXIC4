import { Ruler } from 'lucide-react';

interface SizeChartData {
  headers: string[];
  rows: string[][];
}

const sizeChart: SizeChartData = {
  headers: ['Size', 'Chest (in)', 'Length (in)', 'Sleeve (in)'],
  rows: [
    ['S', '38-40', '27', '24'],
    ['M', '40-42', '28', '25'],
    ['L', '42-44', '29', '26'],
    ['XL', '44-46', '30', '27']
  ]
};

const SizeGuide = (): JSX.Element => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Ruler className="w-6 h-6 text-[#FFD513] mr-2" />
        <h3 className="text-xl font-bold text-white">Size Guide</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {sizeChart.headers.map((header, index) => (
                <th
                  key={index}
                  className="text-left py-2 px-4 border-b border-gray-800 text-gray-400 font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizeChart.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={`py-2 px-4 border-b border-gray-800 ${
                      cellIndex === 0 ? 'font-medium text-white' : 'text-gray-300'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        <p className="mb-2">How to measure:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Chest: Measure around the fullest part of your chest</li>
          <li>Length: Measure from shoulder seam to bottom hem</li>
          <li>Sleeve: Measure from shoulder seam to sleeve end</li>
        </ul>
      </div>
    </div>
  );
};

export default SizeGuide;