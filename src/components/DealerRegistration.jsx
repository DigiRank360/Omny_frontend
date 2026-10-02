import { useState } from 'react';
import { CheckCircle2, ArrowRight, ChevronLeft, Headset, Loader2, MessageCircle, PackageCheck, PhoneCall, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { errMsg } from '../utils/api';
import { BENEFITS, STATES, PHONE } from '../utils/constants';

const empty = { fullName: '', businessName: '', mobile: '', email: '', city: '', state: '', pincode: '', monthlyVolume: '', gstNumber: '', message: '', password: '', confirmPassword: '' };
const STEPS = ['Basic details', 'Business details', 'Verification'];

function Field({ label, error, req = true, className = '', children }) {
  return (<label className={`block min-w-0 ${className}`}><span className="flex min-h-[18px] items-center gap-1 text-xs font-semibold text-slate-700">{label}{req && <span className="text-red-500">*</span>}</span>
    <div className="mt-1.5 font-normal">{children}</div>{error && <p className="mt-1 text-xs text-red-600">{error}</p>}</label>);
}

export default function DealerRegistration() {
  const [f, setF] = useState(empty);
  const [err, setErr] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [step, setStep] = useState(0);
  const set = key => event => setF(current => ({ ...current, [key]: event.target.value }));

  const validateFields = fields => {
    const errors = {};
    if (fields.includes('fullName') && f.fullName.trim().length < 2) errors.fullName = 'Enter your full name';
    if (fields.includes('businessName') && !f.businessName.trim()) errors.businessName = 'Enter your business name';
    if (fields.includes('mobile') && !/^[6-9]\d{9}$/.test(f.mobile)) errors.mobile = 'Enter a valid 10 digit mobile number';
    if (fields.includes('email') && !/^\S+@\S+\.\S+$/.test(f.email)) errors.email = 'Enter a valid email address';
    if (fields.includes('city') && !f.city.trim()) errors.city = 'Enter your city';
    if (fields.includes('state') && !f.state) errors.state = 'Select your state';
    if (fields.includes('pincode') && !/^\d{6}$/.test(f.pincode)) errors.pincode = 'Enter a valid 6 digit pincode';
    if (fields.includes('gstNumber') && f.gstNumber && !/^\d{2}[A-Z]{5}\d{4}[A-Z][A-Z\d]Z[A-Z\d]$/i.test(f.gstNumber)) errors.gstNumber = 'Enter a valid GST number';
    if (fields.includes('password') && f.password.length < 8) errors.password = 'Use at least 8 characters';
    if (fields.includes('confirmPassword') && f.password !== f.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const submit = async event => {
    event.preventDefault();
    const errors = validateFields(['fullName', 'businessName', 'mobile', 'email', 'city', 'state', 'pincode', 'gstNumber', 'password', 'confirmPassword']);
    setErr(errors);
    if (Object.keys(errors).length) return;
    setBusy(true);
    try {
      const { confirmPassword, ...payload } = f;
      await api.post('/dealers/register', payload);
      setDone(true);
      toast.success('Registration submitted!');
    }
    catch (x) { toast.error(errMsg(x)); }
    finally { setBusy(false); }
  };

  return (
    <section id="register" className="relative overflow-hidden bg-slate-50 py-14 text-slate-800 sm:py-18 lg:py-20">
      <div className="relative mx-auto grid max-w-7xl items-stretch gap-6 px-4 lg:grid-cols-[0.82fr_1.42fr_0.82fr] lg:gap-7">
        <div className="flex flex-col justify-center py-2 lg:py-6">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-dark">Dealer partnership</p>
          <h2 className="text-xl font-extrabold uppercase leading-tight text-navy-950 sm:text-2xl">Become an <span className="text-brand">OMNY X</span> B2B dealer today!</h2>
          <ul className="mt-4 space-y-2 text-xs text-slate-600">
            {BENEFITS.map(benefit => <li key={benefit} className="flex items-center gap-2"><CheckCircle2 size={14} className="shrink-0 text-brand" />{benefit}</li>)}
          </ul>
        </div>

        <div id="register-form" className="rounded-xl border border-slate-200 bg-white p-5 text-slate-800 shadow-[0_16px_48px_rgba(15,23,42,0.10)] sm:p-7">
          <h2 className="text-center text-base font-extrabold uppercase text-navy-950">Dealer registration <span className="text-slate-400">(online)</span></h2>
          <ol className="mt-5 flex items-center justify-between gap-1 border-y border-slate-100 py-3 sm:justify-center sm:gap-3">
            {STEPS.map((title, index) => <li key={title} className="flex min-w-0 flex-1 items-center gap-1 sm:flex-initial sm:gap-2">
              <button type="button" onClick={() => index < step && setStep(index)} className={`flex min-w-0 items-center gap-1.5 text-left text-[10px] font-bold uppercase sm:text-[11px] ${index === step ? 'text-navy-950' : 'text-slate-400'}`} aria-current={index === step ? 'step' : undefined}>
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ring-4 ${index === step ? 'bg-brand text-white ring-brand/10' : index < step ? 'bg-emerald-600 text-white ring-emerald-600/10' : 'bg-slate-100 text-slate-500 ring-transparent'}`}>{index < step ? <CheckCircle2 size={15} /> : index + 1}</span>
                <span className="min-w-0"><span className="block">Step {index + 1}</span><span className="hidden truncate font-medium normal-case sm:block">{title}</span></span>
              </button>
              {index < STEPS.length - 1 && <span className={`h-px min-w-2 flex-1 sm:w-8 sm:flex-none ${index < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />}
            </li>)}
          </ol>
          {done ? (
            <div className="py-10 text-center"><CheckCircle2 size={42} className="mx-auto text-emerald-600" />
              <p className="mt-3 font-bold">Thank you, {f.fullName}!</p>
              <p className="text-sm text-slate-600">Our team will verify your details. Once approved, sign in with your email and the password you created.</p>
              <button className="btn-primary mt-4" onClick={() => { setF(empty); setErr({}); setStep(0); setDone(false); }}>Register another dealer</button></div>
          ) : <form onSubmit={submit} className="mt-5">
            <div className="grid min-h-36 content-start gap-x-4 gap-y-4 sm:grid-cols-2">
              {step === 0 && <>
                <Field label="Full name" error={err.fullName}><input className="input" autoComplete="name" placeholder="Enter your name" value={f.fullName} onChange={set('fullName')} /></Field>
                <Field label="Mobile number" error={err.mobile}><input className="input" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="Enter mobile number" value={f.mobile} onChange={event => setF(current => ({ ...current, mobile: event.target.value.replace(/\D/g, '') }))} /></Field>
                <Field label="Business / shop name" error={err.businessName}><input className="input" autoComplete="organization" placeholder="Enter business name" value={f.businessName} onChange={set('businessName')} /></Field>
                <Field label="City" error={err.city}><input className="input" autoComplete="address-level2" placeholder="Enter city" value={f.city} onChange={set('city')} /></Field>
              </>}
              {step === 1 && <>
                <Field label="Email address" error={err.email}><input className="input" type="email" autoComplete="email" placeholder="Enter email address" value={f.email} onChange={set('email')} /></Field>
                <Field label="State" error={err.state}><select className="input" autoComplete="address-level1" value={f.state} onChange={set('state')}><option value="">Select state</option>{STATES.map(state => <option key={state}>{state}</option>)}</select></Field>
                <Field label="Pincode" error={err.pincode}><input className="input" inputMode="numeric" autoComplete="postal-code" maxLength={6} placeholder="Enter pincode" value={f.pincode} onChange={event => setF(current => ({ ...current, pincode: event.target.value.replace(/\D/g, '') }))} /></Field>
                <Field label="Expected monthly order volume" req={false}><select className="input" value={f.monthlyVolume} onChange={set('monthlyVolume')}><option value="">Select a range</option><option>1-5 units</option><option>6-20 units</option><option>21-50 units</option><option>50+ units</option></select></Field>
              </>}
              {step === 2 && <>
                <Field label="GST number" req={false} error={err.gstNumber}><input className="input uppercase" maxLength={15} placeholder="Optional GST number" value={f.gstNumber} onChange={set('gstNumber')} /></Field>
                <Field label="Create portal password" error={err.password}><input className="input" type="password" autoComplete="new-password" minLength={8} placeholder="At least 8 characters" value={f.password} onChange={set('password')} /></Field>
                <Field label="Confirm password" error={err.confirmPassword}><input className="input" type="password" autoComplete="new-password" minLength={8} placeholder="Enter the same password again" value={f.confirmPassword} onChange={set('confirmPassword')} /></Field>
                <Field label="Anything else we should know?" req={false} className="sm:col-span-2"><textarea className="input min-h-[88px] resize-y bg-slate-50/60" placeholder="Share your requirements" value={f.message} onChange={set('message')} /></Field>
                <p className="text-[11px] leading-relaxed text-slate-500 sm:col-span-2">Your password is stored securely and dealer portal access starts after application approval.</p>
              </>}
            </div>
            <div className="mt-5 flex justify-between gap-3 border-t border-slate-100 pt-4">
              {step > 0 ? <button type="button" className="btn border border-slate-300 text-slate-700 hover:bg-slate-50" onClick={() => setStep(current => current - 1)}><ChevronLeft size={15} /> Back</button> : <span />}
              {step < STEPS.length - 1 ? <button type="button" className="btn-primary" onClick={() => {
                const fields = step === 0 ? ['fullName', 'businessName', 'mobile', 'city'] : ['email', 'state', 'pincode'];
                const errors = validateFields(fields);
                setErr(current => {
                  const next = { ...current };
                  fields.forEach(field => delete next[field]);
                  return { ...next, ...errors };
                });
                if (!Object.keys(errors).length) setStep(current => current + 1);
              }}>Next step <ArrowRight size={14} /></button> : <button disabled={busy} className="btn-primary disabled:cursor-not-allowed disabled:opacity-60" type="submit">
                {busy ? <Loader2 className="animate-spin" size={15} /> : <><PackageCheck size={15} /> Submit application</>}
              </button>}
            </div>
          </form>}
        </div>

        <aside className="flex flex-col justify-center gap-3 py-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <HeadsetIcon />
            <h3 className="mt-3 text-sm font-extrabold uppercase text-navy-950">Or let our team register for you</h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">Our sales team can register your business and answer any questions.</p>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="btn-primary mt-4 w-full">Contact sales team <PhoneCall size={14} /></a>
          </div>
          <a href={`https://wa.me/${PHONE.replace(/\D/g, '')}?text=${encodeURIComponent('Hi, I would like help registering as an OMNYX dealer.')}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-left text-slate-700 shadow-sm hover:bg-slate-50">
            <MessageCircle size={25} className="shrink-0 text-emerald-400" />
            <span><b className="block text-xs uppercase">Need help? Call or WhatsApp</b><span className="mt-1 block text-sm font-bold">{PHONE}</span></span>
          </a>
          <p className="flex items-center gap-2 text-[10px] text-slate-500"><ShieldCheck size={14} /> Registration is free. No commitment required.</p>
        </aside>
      </div>
    </section>
  );
}

function HeadsetIcon() {
  return <Headset size={28} className="text-brand" aria-hidden="true" />;
}
