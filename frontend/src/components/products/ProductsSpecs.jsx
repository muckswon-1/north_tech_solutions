import React from 'react';

const ProductsSpecs = ({ specs }) => {
  if (!specs) {
    return <p>Product specs comming soon</p>;
  }
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Specifications</h2>
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <tbody>
          {Object.entries(specs).map(([key, value], index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              } hover:bg-blue-50 transition-colors duration-200`}
            >
              <td className="p-2 font-medium text-gray-700 capitalize border-r border-gray-200">
                {key}
              </td>
              <td className="p-2 text-gray-600">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsSpecs;
