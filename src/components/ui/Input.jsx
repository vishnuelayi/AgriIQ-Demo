import React from 'react';

const Input = ({ label, type = "text", value, onChange, placeholder, maxLength }) => (
  <div className="mb-5 text-left">
    <label className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        type={type}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium placeholder-gray-400"
      />
    </div>
  </div>
);

export default Input;