'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Commercial LPG',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API contact enquiry submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', category: 'Commercial LPG', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#176B9B] text-xs font-semibold uppercase tracking-wider mb-3">
            Get in Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#102A43] tracking-tight">
            Contact SIJAYA Agencies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Have a commercial query, require a bulk quotation, or need domestic refill support? Reach out today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="text-xl font-bold text-[#102A43] mb-6">Agency Information</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#176B9B] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Agency Office & Depot</span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      SIJAYA Agencies
                    </p>
                    <p className="text-xs text-slate-500">
                      [Business Address — Configurable in Admin Content Settings]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#176B9B] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Direct Phone Support</span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      [Phone Number — Configurable in Admin Settings]
                    </p>
                    <p className="text-xs text-slate-500">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">WhatsApp Ordering</span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      [WhatsApp Support Channel — Configurable in Settings]
                    </p>
                    <p className="text-xs text-slate-500">Instant response during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-100/70 text-[#176B9B] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Official Email</span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      contact@sijaya.in
                    </p>
                    <p className="text-xs text-slate-500">For quotations and formal accounts</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase">Distribution Hours</span>
                    <p className="text-sm font-medium text-slate-800 mt-0.5">
                      Monday to Saturday: 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-xs text-slate-500">Sunday: Closed (Emergency delivery on request)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map Visual Placeholder */}
            <div className="rounded-2xl bg-slate-100 border border-slate-200 p-6 flex flex-col items-center justify-center text-center h-48 relative overflow-hidden">
              <MapPin className="w-8 h-8 text-[#176B9B] mb-2 animate-bounce" />
              <div className="font-bold text-sm text-[#102A43]">Depot & Warehouse Location Map</div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Interactive Google Map embed viewable upon setting the Google Maps Embed Key in Content Management.
              </p>
            </div>
          </div>

          {/* Right Column: Working Contact & Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-slate-200 shadow-md">
              <h3 className="text-2xl font-bold text-[#102A43] mb-2">Request Gas Supply or Quotation</h3>
              <p className="text-sm text-slate-600 mb-8">
                Fill in your details and requirements. Our distribution officer will get in touch with you promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-base">Enquiry Received Successfully!</h4>
                    <p className="text-sm mt-1 text-emerald-800">
                      Thank you for contacting SIJAYA Agencies. Our dispatch and customer team will review your requirement and call you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 98765 43210"
                        className="input-field"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. contact@business.com"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Requirement Type *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="input-field"
                      >
                        <option value="Domestic LPG">Domestic LPG Refill (14.2 kg / 5 kg)</option>
                        <option value="Commercial LPG">Commercial Cylinder (19 kg)</option>
                        <option value="Bulk LPG Supply">Bulk LPG / Multi-Cylinder Manifold</option>
                        <option value="Hotel Recurring Supply">Hotel / Restaurant Recurring Supply</option>
                        <option value="Institutional Quotation">Institutional / Hostel Contract</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Delivery Address & Specific Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please mention business name (if applicable), location/landmark, expected cylinder count or monthly requirement..."
                      className="input-field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-[#176B9B] hover:bg-[#102A43] text-white font-bold text-base shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Gas Request / Enquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
