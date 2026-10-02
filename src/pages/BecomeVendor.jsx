import { useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, FileText, Loader2, PackageOpen, Plus, Trash2, Upload, Wallet } from 'lucide-react';
import toast from 'react-hot-toast';
import PageBanner from '../components/PageBanner';
import api, { errMsg } from '../utils/api';
import { STATES } from '../utils/constants';

const businessTypes = ['Manufacturer', 'Distributor', 'Service Provider', 'Dealer', 'Retailer', 'Refurbisher', 'Accessories', 'Laptop Spares'];
const productTypes = ['Laptop', 'Desktop', 'Laptop Spares', 'Computer Accessories', 'Laptop Accessories', 'Monitors', 'Printers', 'Networking', 'Storage Devices', 'RAM / Memory', 'Batteries', 'Chargers / Adapters'];
const emptyOffer = { brand: '', model: '', quantity: '', expectedRate: '' };
const maxFileBytes = 5 * 1024 * 1024;
const acceptedMime = ['image/jpeg', 'image/png', 'application/pdf'];

const initialForm = {
  companyName: '', gstNumber: '', address: '', city: '', state: '', pincode: '', businessType: '', productCategories: [],
  stockOffers: [{ ...emptyOffer }], contactName: '', designation: '', mobile: '', alternateMobile: '', email: '',
  bankName: '', bankBranch: '', accountHolderName: '', accountNumber: '', ifscCode: '',
  attachments: { cancelledCheque: null, registrationDocument: null }, declarationAccepted: false,
};

function Field({ label, required = false, hint, className = '', children }) {
  return <label className={`block text-sm font-semibold text-slate-800 ${className}`}>{label}{required && <span className="ml-1 text-red-600">*</span>}{hint && <span className="mt-1 block text-xs font-normal leading-5 text-slate-500">{hint}</span>}<span className="mt-2 block font-normal">{children}</span></label>;
}

function SectionHeading({ icon: Icon, title, description }) {
  return <div className="mb-6 flex items-start gap-3 border-b border-slate-200 pb-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-50 text-brand"><Icon size={19} /></span><div><h2 className="text-lg font-bold text-navy-950">{title}</h2><p className="mt-1 text-sm text-slate-500">{description}</p></div></div>;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ name: file.name, mimeType: file.type, data: reader.result });
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsDataURL(file);
  });
}

export default function BecomeVendor() {
  const [form, setForm] = useState(initialForm);
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileErrors, setFileErrors] = useState({});

  const set = key => event => setForm(current => ({ ...current, [key]: event.target.value }));
  const setOffer = (index, key, value) => setForm(current => ({ ...current, stockOffers: current.stockOffers.map((offer, offerIndex) => offerIndex === index ? { ...offer, [key]: value } : offer) }));

  const chooseFile = async (key, event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!acceptedMime.includes(file.type)) {
      setFileErrors(current => ({ ...current, [key]: 'Choose a JPG, JPEG, PNG, or PDF file.' }));
      return;
    }
    if (file.size > maxFileBytes) {
      setFileErrors(current => ({ ...current, [key]: 'File exceeds the 5MB limit.' }));
      return;
    }
    try {
      const attachment = await fileToDataUrl(file);
      setForm(current => ({ ...current, attachments: { ...current.attachments, [key]: attachment } }));
      setFileErrors(current => ({ ...current, [key]: '' }));
    } catch (error) {
      setFileErrors(current => ({ ...current, [key]: error.message }));
    }
  };

  const toggleCategory = category => setForm(current => ({
    ...current,
    productCategories: current.productCategories.includes(category)
      ? current.productCategories.filter(item => item !== category)
      : [...current.productCategories, category],
  }));

  const submit = async event => {
    event.preventDefault();
    const offer = form.stockOffers[0];
    if (!offer.brand.trim() || !offer.model.trim() || !offer.quantity || !offer.expectedRate) {
      toast.error('Add at least one stock offer with brand, model, quantity and expected rate.');
      document.getElementById('stock-offer-0')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setBusy(true);
    try {
      await api.post('/vendors/register', form);
      setSubmitted(true);
      toast.success('Vendor registration submitted.');
    } catch (error) {
      toast.error(errMsg(error));
    } finally {
      setBusy(false);
    }
  };

  if (submitted) return <main><PageBanner title="Vendor Registration Received" description="Thank you for your interest in supplying OmnyX." /><section className="bg-slate-50 px-4 py-16"><div className="mx-auto max-w-2xl rounded-lg border border-emerald-200 bg-white p-8 text-center shadow-sm"><CheckCircle2 size={48} className="mx-auto text-emerald-600" /><h2 className="mt-4 text-2xl font-bold text-navy-950">Application submitted</h2><p className="mt-2 text-sm leading-6 text-slate-600">Our procurement team will review your company and stock details and contact you.</p><button type="button" className="btn-primary mt-6" onClick={() => { setForm(initialForm); setSubmitted(false); }}>Submit another vendor application</button></div></section></main>;

  return (
    <main>
      <PageBanner title="Vendor Registration" description="For suppliers who sell laptops, components or IT products to OmnyX. Share your company, stock, contact and payment details for review by our Delhi procurement team." />
      <section className="bg-slate-50 py-10 sm:py-14">
        <form onSubmit={submit} className="mx-auto max-w-5xl space-y-6 px-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading icon={Building2} title="A. Company Details" description="Tell us about your supplier business." />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Company Name" required><input className="input" autoComplete="organization" placeholder="e.g. Acme Technologies Pvt. Ltd." value={form.companyName} onChange={set('companyName')} required /></Field>
              <Field label="GST Number" hint="Optional, if applicable"><input className="input uppercase" placeholder="e.g. 07AAAAA0000A1Z5" maxLength={15} value={form.gstNumber} onChange={set('gstNumber')} /></Field>
              <Field label="Address" required className="sm:col-span-2"><textarea className="input min-h-20 resize-y" autoComplete="street-address" placeholder="Building, street and area" value={form.address} onChange={set('address')} required /></Field>
              <Field label="City" required><input className="input" autoComplete="address-level2" placeholder="e.g. New Delhi" value={form.city} onChange={set('city')} required /></Field>
              <Field label="State" required><select className="input" autoComplete="address-level1" value={form.state} onChange={set('state')} required><option value="">Select state</option>{STATES.map(state => <option key={state}>{state}</option>)}</select></Field>
              <Field label="PIN Code"><input className="input" inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="6-digit PIN code" value={form.pincode} onChange={event => setForm(current => ({ ...current, pincode: event.target.value.replace(/\D/g, '') }))} /></Field>
              <Field label="Business Type" required><select className="input" value={form.businessType} onChange={set('businessType')} required><option value="">Select business type</option>{businessTypes.map(type => <option key={type}>{type}</option>)}</select></Field>
            </div>

            <div className="mt-7">
              <h3 className="text-sm font-bold text-slate-800">Product Categories</h3>
              <p className="mt-1 text-xs text-slate-500">Select all categories you can supply.</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{productTypes.map(category => <label key={category} className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2.5 text-sm transition ${form.productCategories.includes(category) ? 'border-brand bg-brand-50 text-navy-950' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}><input type="checkbox" className="h-4 w-4 accent-brand" checked={form.productCategories.includes(category)} onChange={() => toggleCategory(category)} />{category}</label>)}</div>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading icon={PackageOpen} title="Supply Details" description="List the brands, models and commercial terms you can offer." />
            <div className="space-y-4">{form.stockOffers.map((offer, index) => <div id={`stock-offer-${index}`} key={index} className="rounded-md border border-slate-200 bg-slate-50 p-4">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-bold text-slate-800">Stock offer {index + 1}{index === 0 && <span className="ml-1 text-red-600">*</span>}</h3>{form.stockOffers.length > 1 && <button type="button" aria-label={`Remove stock offer ${index + 1}`} className="rounded p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600" onClick={() => setForm(current => ({ ...current, stockOffers: current.stockOffers.filter((_, i) => i !== index) }))}><Trash2 size={16} /></button>}</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Brand"><input className="input" placeholder="e.g. Dell" value={offer.brand} onChange={event => setOffer(index, 'brand', event.target.value)} required={index === 0} /></Field>
                <Field label="Model"><input className="input" placeholder="e.g. Latitude 5420" value={offer.model} onChange={event => setOffer(index, 'model', event.target.value)} required={index === 0} /></Field>
                <Field label="Quantity"><input className="input" type="number" min="1" placeholder="Available units" value={offer.quantity} onChange={event => setOffer(index, 'quantity', event.target.value)} required={index === 0} /></Field>
                <Field label="Expected rate (INR / unit)"><input className="input" type="number" min="0" step="0.01" placeholder="Your expected unit rate" value={offer.expectedRate} onChange={event => setOffer(index, 'expectedRate', event.target.value)} required={index === 0} /></Field>
              </div>
            </div>)}</div>
            <button type="button" className="btn mt-4 border border-slate-300 text-slate-700 hover:bg-slate-50" onClick={() => setForm(current => ({ ...current, stockOffers: [...current.stockOffers, { ...emptyOffer }] }))}><Plus size={16} /> Add another stock offer</button>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading icon={Building2} title="B. Contact Person Details" description="Who should our procurement team contact?" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Contact Person Name" required><input className="input" autoComplete="name" placeholder="Full name" value={form.contactName} onChange={set('contactName')} required /></Field>
              <Field label="Designation" required><input className="input" placeholder="e.g. Owner, Sales Manager" value={form.designation} onChange={set('designation')} required /></Field>
              <Field label="Mobile Number" required><input className="input" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="10-digit mobile number" value={form.mobile} onChange={event => setForm(current => ({ ...current, mobile: event.target.value.replace(/\D/g, '') }))} pattern="[6-9][0-9]{9}" required /></Field>
              <Field label="Alternate Mobile"><input className="input" inputMode="numeric" maxLength={10} placeholder="Optional alternate number" value={form.alternateMobile} onChange={event => setForm(current => ({ ...current, alternateMobile: event.target.value.replace(/\D/g, '') }))} /></Field>
              <Field label="Email"><input className="input" type="email" autoComplete="email" placeholder="name@company.com" value={form.email} onChange={set('email')} /></Field>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading icon={Wallet} title="C. Banking Details" description="Optional payment details for vendor onboarding." />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Bank Name"><input className="input" placeholder="e.g. HDFC Bank" value={form.bankName} onChange={set('bankName')} /></Field>
              <Field label="Branch"><input className="input" placeholder="Branch name or city" value={form.bankBranch} onChange={set('bankBranch')} /></Field>
              <Field label="Account Holder Name"><input className="input" autoComplete="off" placeholder="Name as per bank records" value={form.accountHolderName} onChange={set('accountHolderName')} /></Field>
              <Field label="Account Number"><input className="input" inputMode="numeric" autoComplete="off" placeholder="Bank account number" value={form.accountNumber} onChange={set('accountNumber')} /></Field>
              <Field label="IFSC Code"><input className="input uppercase" autoComplete="off" maxLength={11} placeholder="e.g. HDFC0001234" value={form.ifscCode} onChange={set('ifscCode')} /></Field>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <SectionHeading icon={FileText} title="D. Attachments" description="JPG, JPEG, PNG or PDF. Maximum 5MB per file." />
            <div className="grid gap-5 sm:grid-cols-2">{[['cancelledCheque', 'Cancelled Cheque'], ['registrationDocument', 'Registration Document']].map(([key, title]) => {
              const file = form.attachments[key];
              return <div key={key} className="rounded-md border border-dashed border-slate-300 p-4">
                <label className="block text-sm font-semibold text-slate-800">{title}<span className="mt-1 block text-xs font-normal text-slate-500">{key === 'registrationDocument' ? 'GST, PAN, COI, Gumasta etc.' : 'Upload a clear cancelled cheque image or PDF.'}</span>
                  <span className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-50"><Upload size={16} />{file ? 'Replace file' : 'Choose file'}<input className="sr-only" type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" onChange={event => chooseFile(key, event)} /></span>
                </label>
                {file && <div className="mt-3 flex items-center justify-between gap-3 rounded bg-brand-50 px-3 py-2 text-xs text-slate-700"><span className="min-w-0 truncate">{file.name}</span><button type="button" className="shrink-0 text-red-600 hover:text-red-800" onClick={() => setForm(current => ({ ...current, attachments: { ...current.attachments, [key]: null } }))}>Remove</button></div>}
                {fileErrors[key] && <p className="mt-2 text-xs text-red-600">{fileErrors[key]}</p>}
              </div>;
            })}</div>
          </div>

          <div className="rounded-lg border border-brand-200 bg-brand-50 p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700"><input className="mt-1 h-4 w-4 shrink-0 accent-brand" type="checkbox" checked={form.declarationAccepted} onChange={event => setForm(current => ({ ...current, declarationAccepted: event.target.checked }))} required /><span>I hereby declare that the information provided above is true and correct to the best of my knowledge. I understand that the information submitted may be verified by OmnyX before approving my vendor registration for Delhi Office.</span></label>
            <button type="submit" disabled={busy} className="btn-primary mt-5 min-w-56 disabled:cursor-not-allowed disabled:opacity-60">{busy ? <Loader2 size={17} className="animate-spin" /> : <>Submit Vendor Registration <ArrowRight size={16} /></>}</button>
          </div>
        </form>
      </section>
    </main>
  );
}
