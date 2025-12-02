import React, { useState } from 'react';
import { Smartphone, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';

// --- INTERNAL COMPONENTS (For Preview Only) ---
// locally, move these to src/components/ui/Button.jsx
const Button = ({ children, onClick, disabled, loading, fullWidth }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`
      ${fullWidth ? 'w-full' : ''}
      bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600
      text-white font-bold py-3.5 px-6 rounded-2xl
      shadow-lg shadow-blue-500/30
      transition-all duration-200 transform active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed
      flex items-center justify-center gap-2
    `}
  >
    {loading && <Loader2 className="animate-spin" size={20} />}
    {children}
  </button>
);

// locally, move these to src/components/ui/Input.jsx
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

export default function LoginScreen() {
  const [step, setStep] = useState('PHONE'); // 'PHONE' | 'OTP' | 'SUCCESS'
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);

  // Handle Phone Submission
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('OTP');
    }, 1500);
  };

  // Handle OTP Input
  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-focus next input
    if (element.nextSibling && element.value) {
      element.nextSibling.focus();
    }
  };

  // Handle Verification
  const handleVerify = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length < 4) {
      alert("Please enter the complete OTP");
      return;
    }

    setLoading(true);
    // Simulate API Verification
    setTimeout(() => {
      setLoading(false);
      setStep('SUCCESS');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-sans">
      {/* Styles injected locally for the preview */}
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        @keyframes scale-in {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* Mobile Container Mockup */}
      <div className="w-full max-w-md bg-white h-[800px] max-h-[90vh] rounded-[30px] overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* --- Header Section --- */}
        <div className="relative bg-blue-600 h-[35%] rounded-b-[40px] flex flex-col items-center justify-center text-white z-10 shadow-lg">
          {/* Decorative Circles */}
          <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 right-[-5%] w-32 h-32 bg-blue-400/30 rounded-full blur-xl"></div>
          
          <div className="z-10 text-center animate-fade-in">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Smartphone size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Agri IQ</h1>
            <p className="text-blue-100 text-sm mt-1 opacity-90">Learning Platform</p>
          </div>
        </div>

        {/* --- Content Body --- */}
        <div className="flex-1 px-8 pt-10 pb-6 flex flex-col">
          
          {/* STEP 1: PHONE NUMBER */}
          {step === 'PHONE' && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
              <p className="text-gray-500 text-sm mb-8">Enter your mobile number to continue your preparation journey.</p>

              <form onSubmit={handleSendOtp}>
                <Input 
                  label="Mobile Number"
                  placeholder="98765 43210"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                />

                <div className="mt-8">
                  <Button fullWidth loading={loading}>
                    Send OTP <ArrowRight size={18} />
                  </Button>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                  By clicking continue, you agree to our <span className="text-blue-600 font-bold">Terms of Service</span>
                </p>
              </form>
            </div>
          )}

          {/* STEP 2: OTP ENTRY */}
          {step === 'OTP' && (
            <div className="animate-slide-up">
              <button 
                onClick={() => setStep('PHONE')}
                className="text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 text-sm font-medium"
              >
                ← Change Number
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification</h2>
              <p className="text-gray-500 text-sm mb-8">
                We sent a 4-digit code to <br/>
                <span className="font-bold text-gray-800">+91 {phoneNumber}</span>
              </p>

              <form onSubmit={handleVerify}>
                <div className="flex justify-between gap-3 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="w-full aspect-square bg-gray-50 border border-gray-200 rounded-xl text-center text-2xl font-bold text-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  ))}
                </div>

                <Button fullWidth loading={loading}>
                  Verify & Login
                </Button>

                <div className="text-center mt-6">
                  <p className="text-sm text-gray-500">Didn't receive code?</p>
                  <button type="button" className="text-blue-600 font-bold text-sm mt-1 hover:underline">
                    Resend OTP
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: SUCCESS STATE */}
          {step === 'SUCCESS' && (
            <div className="flex flex-col items-center justify-center h-full animate-scale-in text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-500">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful!</h2>
              <p className="text-gray-500 text-sm">Redirecting to dashboard...</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}