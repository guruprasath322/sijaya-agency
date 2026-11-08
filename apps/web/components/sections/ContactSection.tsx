'use client';

import React, { useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Domestic LPG',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setSubmitError('');
    try {
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
      if (!accessKey) throw new Error('Web3Forms access key is not configured');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          requirement: formData.category,
          message: formData.message,
          subject: `SIJAYA supply request — ${formData.category}`,
          botcheck: website,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error('Form submission failed');
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', category: 'Domestic LPG', message: '' });
      setWebsite('');
    } catch {
      setSubmitError('We could not send your request right now. Please call or WhatsApp SIJAYA Agency.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-16 text-primary sm:py-20 lg:py-24">
      <div className="site-container">
        <header className="mb-8 text-center sm:mb-12">
          <p className="eyebrow mb-3">A simple request. A personal response.</p>
          <h2 className="section-heading">How can we help you today?</h2>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Fill in your details and requirements. Our distribution officer will get in touch with you promptly.
          </p>
        </header>

        <div className="grid grid-cols-1 items-start gap-6 sm:gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-[#F3F7FA] p-6 sm:p-8">
              <h2 className="mb-6 text-xl font-bold">Agency Contact Details</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#176B9B]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Agency Office &amp; Depot</h3>
                    <p className="mt-1 text-sm font-medium">SIJAYA Agency</p>
                    <p className="text-sm text-slate-600">Thiumangalam, Tiruppur, Vellakoil, Tamil Nadu 638111</p>
                    <a href="https://maps.app.goo.gl/NKZYsDofKWEML7aVA" target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm font-semibold text-[#176B9B] hover:underline">Open directions</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#176B9B]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Direct Phone Support</h3>
                    <a href="tel:+919789494899" className="mt-1 block text-sm font-medium hover:text-[#176B9B]">+91 97894 94899</a>
                    <a href="tel:+919488679029" className="block text-sm font-medium hover:text-[#176B9B]">+91 94886 79029</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">WhatsApp Ordering</h3>
                    <a href="https://wa.me/919789494899" target="_blank" rel="noreferrer" className="mt-1 block text-sm font-medium hover:text-emerald-700">WhatsApp · +91 97894 94899</a>
                    <p className="text-xs text-slate-500">Instant response during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#176B9B]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Official Email</h3>
                    <a href="mailto:sijayaexcorp@gmail.com" className="mt-1 block text-sm font-medium hover:text-[#176B9B]">sijayaexcorp@gmail.com</a>
                    <p className="text-xs text-slate-500">For quotations and formal accounts</p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_40px_-16px_rgba(16,42,67,0.15)] sm:p-8 lg:col-span-7 xl:p-10">
          {submitted ? (
            <div role="status" className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-bold">Request received</h2>
                <p className="mt-1 text-sm">Thank you. SIJAYA Agency will get in touch with you shortly.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-3 text-sm font-semibold underline">Send another request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-busy={loading} className="space-y-5">
              <div className="border-b border-slate-100 pb-5"><h3 className="text-lg font-semibold">Your supply request</h3><p className="mt-1 text-sm text-slate-500">Fields marked * are required.</p></div>
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>Leave this field blank<input autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="request-name" className="mb-2 block text-sm font-medium text-slate-700">Your Full Name *</label>
                  <input id="request-name" name="name" autoComplete="name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Ramesh Kumar" className="input-field" />
                </div>
                <div>
                  <label htmlFor="request-phone" className="mb-2 block text-sm font-medium text-slate-700">Mobile Phone Number *</label>
                  <input id="request-phone" name="phone" autoComplete="tel" type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="e.g. 98765 43210" className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="request-email" className="mb-2 block text-sm font-medium text-slate-700">Email Address (Optional)</label>
                  <input id="request-email" name="email" autoComplete="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. name@business.com" className="input-field" />
                </div>
                <div>
                  <label htmlFor="request-category" className="mb-2 block text-sm font-medium text-slate-700">Requirement Type *</label>
                  <select id="request-category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                    <option value="Domestic LPG">Domestic LPG (4 kg / 12 kg)</option>
                    <option value="Commercial LPG">Commercial LPG (17 kg / 21 kg / 33 kg)</option>
                    <option value="Industrial LPG">Industrial LPG (33 kg LOT / 425 kg)</option>
                    <option value="Bulk LPG Supply">Bulk LPG / Multi-Cylinder Manifold</option>
                    <option value="Hotel Recurring Supply">Hotel / Restaurant Recurring Supply</option>
                    <option value="Institutional Quotation">Institutional / Hostel Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="request-message" className="mb-2 block text-sm font-medium text-slate-700">Your Delivery Address &amp; Specific Requirements *</label>
                <textarea id="request-message" name="message" autoComplete="street-address" required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Enter your complete address, street, landmark, pincode and specific requirements..." className="input-field resize-y" />
              </div>

              {submitError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-sm disabled:opacity-60">
                {loading ? <><Loader2 className="h-4 w-4 animate-spin" /><span>Sending request…</span></> : <><Send className="h-5 w-5" /><span>Send Request</span></>}
              </button>
              <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500"><ShieldCheck className="h-4 w-4 shrink-0" />Your details are only used to respond to your enquiry.</p>
            </form>
          )}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-8">
          <iframe title="Map showing SIJAYA Agency in Vellakoil" src="https://maps.google.com/maps?q=10.9662657%2C77.7001181&z=16&output=embed" className="block h-[280px] w-full sm:h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href="https://maps.app.goo.gl/NKZYsDofKWEML7aVA" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 px-4 py-3 flex-wrap text-sm font-semibold text-[#176B9B] hover:bg-blue-50 transition-colors">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> SIJAYA Agency · Vellakoil</span>
            <span>Open directions →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
