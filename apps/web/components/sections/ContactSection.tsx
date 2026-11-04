'use client';

import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { supplyRequestsApi } from '@/lib/api';

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
    setLoading(true);
    setSubmitError('');
    try {
      await supplyRequestsApi.create({ ...formData, website });
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', category: 'Domestic LPG', message: '' });
      setWebsite('');
    } catch {
      setSubmitError('We could not save your request right now. Please call or WhatsApp SIJAYA Agency.');
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-white px-4 py-14 text-[#102A43] sm:py-16 md:py-28">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center sm:mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Request Gas Supply or Quotation</h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Fill in your details and requirements. Our distribution officer will get in touch with you promptly.
          </p>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-5 sm:gap-8 lg:grid-cols-12">
          <aside className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-5 text-xl font-bold">Agency Contact Details</h2>
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
                    <a href="tel:+919894761199" className="block text-sm font-medium hover:text-[#176B9B]">+91 98947 61199</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">WhatsApp Ordering</h3>
                    <a href="https://wa.me/919894761199" target="_blank" rel="noreferrer" className="mt-1 block text-sm font-medium hover:text-emerald-700">WhatsApp · +91 98947 61199</a>
                    <p className="text-xs text-slate-500">Instant response during business hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#176B9B]" />
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Official Email</h3>
                    <a href="mailto:contact@sijaya.in" className="mt-1 block text-sm font-medium hover:text-[#176B9B]">contact@sijaya.in</a>
                    <p className="text-xs text-slate-500">For quotations and formal accounts</p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md sm:p-8 lg:col-span-7 xl:p-10">
          {submitted ? (
            <div className="flex items-start gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />
              <div>
                <h2 className="font-bold">Request received</h2>
                <p className="mt-1 text-sm">Thank you. SIJAYA Agency will get in touch with you shortly.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="mt-3 text-sm font-semibold underline">Send another request</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>Leave this field blank<input autoComplete="off" tabIndex={-1} value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Your Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g. Ramesh Kumar" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Mobile Phone Number *</label>
                  <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="e.g. 98765 43210" className="input-field" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Email Address (Optional)</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="e.g. name@business.com" className="input-field" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Requirement Type *</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                    <option value="Domestic LPG">Domestic LPG Refill (14.2 kg / 5 kg)</option>
                    <option value="Commercial LPG">Commercial Cylinder (19 kg)</option>
                    <option value="Bulk LPG Supply">Bulk LPG / Multi-Cylinder Manifold</option>
                    <option value="Hotel Recurring Supply">Hotel / Restaurant Recurring Supply</option>
                    <option value="Institutional Quotation">Institutional / Hostel Contract</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">Your Delivery Address &amp; Specific Requirements *</label>
                <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Enter your complete address, street, landmark, pincode and specific requirements..." className="input-field resize-y" />
              </div>

              {submitError && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{submitError}</p>}

              <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176B9B] px-6 py-4 text-base font-bold text-white shadow-md transition hover:bg-[#102A43] disabled:opacity-50">
                {loading ? 'Sending Request...' : <><Send className="h-5 w-5" /><span>Send Request</span></>}
              </button>
            </form>
          )}
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-8">
          <iframe title="Map showing SIJAYA Agency in Vellakoil" src="https://maps.google.com/maps?q=10.9662657%2C77.7001181&z=16&output=embed" className="block h-[280px] w-full sm:h-[420px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <a href="https://maps.app.goo.gl/NKZYsDofKWEML7aVA" target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-[#176B9B] hover:bg-blue-50 transition-colors">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" /> SIJAYA Agency · Vellakoil</span>
            <span>Open directions →</span>
          </a>
        </div>
      </div>
    </section>
  );
}
