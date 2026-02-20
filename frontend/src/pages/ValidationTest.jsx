import React, { useState } from 'react';
import ValidatedInput from '../components/ValidatedInput';
import {
  validateNIC,
  validatePhone,
  validateEmail,
  formatPhoneNumber,
  normalizeEmail,
} from '../utils/validationHelpers';

const ValidationTest = () => {
  // NIC Test
  const [nicValue, setNicValue] = useState('');
  const [nicError, setNicError] = useState('');

  // Phone Test
  const [phoneValue, setPhoneValue] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Email Test
  const [emailValue, setEmailValue] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleNICChange = (e) => {
    const value = e.target.value;
    setNicValue(value);
    if (value.trim()) {
      const validation = validateNIC(value);
      setNicError(validation.error || '');
    } else {
      setNicError('');
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = formatPhoneNumber(value);
    setPhoneValue(value);
    if (value.trim()) {
      const validation = validatePhone(value);
      setPhoneError(validation.error || '');
    } else {
      setPhoneError('');
    }
  };

  const handleEmailChange = (e) => {
    let value = e.target.value;
    value = normalizeEmail(value);
    setEmailValue(value);
    if (value.trim()) {
      const validation = validateEmail(value);
      setEmailError(validation.error || '');
    } else {
      setEmailError('');
    }
  };

  const testCases = {
    nic: {
      valid: ['200012345678', '123456789V', '987654321X'],
      invalid: ['12345', '1234567890', '123-456-789V', '123456789VV'],
    },
    phone: {
      valid: ['0771234567', '+94771234567', '1234567890'],
      invalid: ['12345', '077abc1234', '12345678901234567'],
    },
    email: {
      valid: ['user@example.com', 'test.user@company.co.uk', 'admin@test.org'],
      invalid: ['user@', '@example.com', 'user example@test.com', 'user@@example.com'],
    },
  };

  const runTest = (value, type) => {
    if (type === 'nic') {
      setNicValue(value);
      const validation = validateNIC(value);
      setNicError(validation.error || '');
    } else if (type === 'phone') {
      const formatted = formatPhoneNumber(value);
      setPhoneValue(formatted);
      const validation = validatePhone(formatted);
      setPhoneError(validation.error || '');
    } else if (type === 'email') {
      const normalized = normalizeEmail(value);
      setEmailValue(normalized);
      const validation = validateEmail(normalized);
      setEmailError(validation.error || '');
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Validation Test Page
          </h1>
          <p className="text-gray-600 mb-6">
            Test the NIC, Phone, and Email validation functions
          </p>

          {/* NIC Validation Test */}
          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              NIC Validation
            </h2>
            <ValidatedInput
              type="text"
              value={nicValue}
              onChange={handleNICChange}
              error={nicError}
              label="Test NIC"
              placeholder="Enter NIC to test (12 digits or 9 digits + letter)"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Test Values:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">✅ Valid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.nic.valid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'nic')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-red-600 font-medium mb-1">❌ Invalid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.nic.invalid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'nic')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Validation Test */}
          <div className="mb-8 p-6 bg-green-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Phone Number Validation
            </h2>
            <ValidatedInput
              type="tel"
              value={phoneValue}
              onChange={handlePhoneChange}
              error={phoneError}
              label="Test Phone Number"
              placeholder="Enter phone number to test"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Test Values:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">✅ Valid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.phone.valid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'phone')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-red-600 font-medium mb-1">❌ Invalid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.phone.invalid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'phone')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded border border-green-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Spaces and dashes are automatically removed. 
                Try entering: <code className="px-2 py-1 bg-gray-100 rounded">077 123 4567</code>
              </p>
            </div>
          </div>

          {/* Email Validation Test */}
          <div className="mb-8 p-6 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Email Validation
            </h2>
            <ValidatedInput
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              error={emailError}
              label="Test Email"
              placeholder="Enter email to test"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Test Values:</p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-green-600 font-medium mb-1">✅ Valid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.email.valid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'email')}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-red-600 font-medium mb-1">❌ Invalid Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {testCases.email.invalid.map((value) => (
                      <button
                        key={value}
                        onClick={() => runTest(value, 'email')}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white rounded border border-purple-200">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Email is automatically converted to lowercase. 
                Try entering: <code className="px-2 py-1 bg-gray-100 rounded">User@Example.COM</code>
              </p>
            </div>
          </div>
        </div>

        {/* Validation Rules Reference */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Validation Rules Summary
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-800">NIC Validation</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>New format: Exactly 12 digits</li>
                <li>Old format: 9 digits + v (e.g., 123456789V)</li>
                <li>No symbols or special characters allowed</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-800">Phone Validation</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Length: 10 digits</li>
                <li>Digits only (optional + prefix allowed)</li>
                <li>Spaces and dashes automatically removed</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-800">Email Validation</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside">
                <li>Must contain exactly one @</li>
                <li>No spaces allowed</li>
                <li>Valid domain structure required</li>
                <li>Automatically converted to lowercase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationTest;
