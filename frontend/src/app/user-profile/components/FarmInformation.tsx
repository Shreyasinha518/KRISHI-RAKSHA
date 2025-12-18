import React from 'react';

const FarmInformation: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Farm Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Farm Name</label>
          <p className="mt-1 text-sm text-gray-900">Sample Farm</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <p className="mt-1 text-sm text-gray-900">123 Farm Road, Countryside</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Size (acres)</label>
          <p className="mt-1 text-sm text-gray-900">50</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Main Crops</label>
          <p className="mt-1 text-sm text-gray-900">Wheat, Corn, Soybeans</p>
        </div>
      </div>
    </div>
  );
};

export default FarmInformation;
