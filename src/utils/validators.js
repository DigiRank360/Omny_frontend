export const validateStep = (step, f) => {
  const e = {};
  if (step === 1) {
    if (f.fullName.trim().length < 2) e.fullName = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email';
    if (!/^[6-9]\d{9}$/.test(f.mobile)) e.mobile = 'Enter a 10 digit mobile number';
  }
  if (step === 2) {
    if (!f.businessName.trim()) e.businessName = 'Enter business / shop name';
    if (!f.city.trim()) e.city = 'Enter city';
    if (!f.state) e.state = 'Select state';
    if (!/^\d{6}$/.test(f.pincode)) e.pincode = 'Enter 6 digit pincode';
  }
  if (step === 3 && f.gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/i.test(f.gstNumber)) e.gstNumber = 'Invalid GST number';
  return e;
};
