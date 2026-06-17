import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Mail, Phone, User, Landmark, CheckCircle, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { useApp } from './AppContext';
import { Reservation } from '../types';

interface ReservationFormProps {
  isModal?: boolean;
}

export default function ReservationForm({ isModal = false }: ReservationFormProps) {
  const { isReserveOpen, setIsReserveOpen, submitReservation, activeReservationCount } = useApp();

  const [formData, setFormData] = useState<Reservation>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: 2,
    seatingPreference: 'any',
    specialNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Reservation, string>>>({});

  const validate = () => {
    const tempErrors: Partial<Record<keyof Reservation, string>> = {};
    if (!formData.name.trim()) tempErrors.name = 'Please provide your full name.';
    if (!formData.phone.trim()) tempErrors.phone = 'Please provide your phone contact.';
    if (!formData.email.trim()) {
      tempErrors.email = 'Please provide your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please provide a valid email format.';
    }
    if (!formData.date) tempErrors.date = 'Seaside date is required.';
    if (!formData.time) tempErrors.time = 'Preferred time slot is required.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate luxury security processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      submitReservation(formData);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: 2,
      seatingPreference: 'any',
      specialNotes: '',
    });
    setIsSuccess(false);
    if (isModal) setIsReserveOpen(false);
  };

  const seatDetails = {
    'sea-front': 'Direct sea edge deck with waves beneath (Highly Premium)',
    'inner-deck': 'Protected frosted glass wooden gazebo',
    'royal-lounge': 'Plush elevated sofa clusters with panoramic sea views',
    'any': 'Best available scenic spot chosen by our chief steward'
  };

  const formContent = (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="reservation-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Form Fields: Name */}
            <div className="space-y-1 mt-1">
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <User className="w-4 h-4 text-gold/60" />
                </span>
                <input
                  type="text"
                  placeholder="Zain Al-Hassan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                    errors.name ? 'border-red-500' : 'border-gold/15'
                  } rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder-zinc-750`}
                />
              </div>
              {errors.name && <p className="text-[10px] text-red-500 font-mono">{errors.name}</p>}
            </div>

            {/* Form Fields: Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Phone className="w-4 h-4 text-gold/60" />
                  </span>
                  <input
                    type="tel"
                    placeholder="0300 1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.phone ? 'border-red-500' : 'border-gold/15'
                    } rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder-zinc-750`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-red-500 font-mono">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Mail className="w-4 h-4 text-gold/60" />
                  </span>
                  <input
                    type="email"
                    placeholder="zain@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.email ? 'border-red-500' : 'border-gold/15'
                    } rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors placeholder-zinc-750`}
                  />
                </div>
                {errors.email && <p className="text-[10px] text-red-500 font-mono">{errors.email}</p>}
              </div>
            </div>

            {/* Form Fields: Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Reservation Date
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Calendar className="w-4 h-4 text-gold/60" />
                  </span>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.date ? 'border-red-500' : 'border-gold/15'
                    } rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors [color-scheme:dark]`}
                  />
                </div>
                {errors.date && <p className="text-[10px] text-red-500 font-mono">{errors.date}</p>}
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Seaside Hour
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Clock className="w-4 h-4 text-gold/60" />
                  </span>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-950 border ${
                      errors.time ? 'border-red-500' : 'border-gold/15'
                    } rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors`}
                  >
                    <option value="" disabled>Select Time Slot</option>
                    <option value="17:00">5:00 PM (Sunset Dusk)</option>
                    <option value="18:35">6:35 PM (Sunset Glow)</option>
                    <option value="20:00">8:00 PM (Seaside Prime)</option>
                    <option value="21:30">9:30 PM (Ocean Cool)</option>
                    <option value="23:00">11:00 PM (Late Night Breeze)</option>
                  </select>
                </div>
                {errors.time && <p className="text-[10px] text-red-500 font-mono">{errors.time}</p>}
              </div>
            </div>

            {/* Guest Picker and Seating Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Total Guests
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Users className="w-4 h-4 text-gold/60" />
                  </span>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    placeholder="2"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 2 })}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-gold/15 rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                  Seating Zone
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Landmark className="w-4 h-4 text-gold/60" />
                  </span>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as any })}
                    className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-gold/15 rounded-none text-sm text-white focus:outline-none focus:border-gold/50 transition-colors"
                  >
                    <option value="any">Steward's Choice (Best Ambient)</option>
                    <option value="sea-front">Direct Sea Front Deck</option>
                    <option value="inner-deck">Inner Wooden Gazebo</option>
                    <option value="royal-lounge">Elevated Royal Sofa Lounge</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                Dietary or Celebration Requests
              </label>
              <textarea
                placeholder="E.g., Anniversary Setup, wheelchair access, high-chair needed, allergic to nuts..."
                rows={2}
                value={formData.specialNotes}
                onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                className="w-full p-4 bg-zinc-950 border border-gold/15 rounded-none text-xs text-white placeholder-zinc-650 focus:outline-none focus:border-gold/50 transition-colors"
              />
            </div>

            {/* Live reservation capacity reminder card */}
            <div className="p-3.5 bg-gold/5 border border-gold/15 rounded-none flex items-center space-x-2 text-gold">
              <ShieldCheck className="w-4 h-4 shrink-0 text-gold" />
              <p className="text-[10px] leading-relaxed font-mono uppercase tracking-wider">
                Only 12 seaside-deck tables left for tonight. {activeReservationCount} live bookings in last hour.
              </p>
            </div>

            {/* Submit Action */}
            <button
              id="reserve-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#C5A059] to-[#E2C284] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg transition-all cursor-pointer select-none rounded-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Securing Royal Seating...</span>
                </div>
              ) : (
                <span>Confirm VIP Reservation</span>
              )}
            </button>
          </motion.form>
        ) : (
          /* VIP Success Voucher Receipt Card */
          <motion.div
            key="reservation-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 border border-gold/25 bg-[#0B0B0B] rounded-none shadow-2xl space-y-6 text-center text-zinc-100"
          >
            <div className="flex justify-center">
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="p-4 bg-gold/10 rounded-none border border-gold/25 text-gold"
              >
                <CheckCircle className="w-12 h-12" />
              </motion.div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#E2C284] font-semibold flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Kolachi Royal Seal
              </span>
              <h3 className="text-xl font-medium font-serif italic tracking-wider text-white">
                Seaside Table Secured!
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Greetings **{formData.name}**, your table block request has been confirmed. A formal digital voucher copy was delivered to **{formData.email}**.
              </p>
            </div>

            {/* Ticket details stub */}
            <div className="border border-gold/15 py-4 font-mono text-xs text-left space-y-2.5 bg-[#0A0A0A]/60 px-6 rounded-none">
              <div className="flex justify-between">
                <span className="text-zinc-550 uppercase text-[9px]">Guest Name:</span>
                <span className="text-white font-semibold">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-550 uppercase text-[9px]">Seaside Date:</span>
                <span className="text-white font-semibold">{formData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-550 uppercase text-[9px]">Sunset hour:</span>
                <span className="text-white font-semibold">{formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-550 uppercase text-[9px]">Party Count:</span>
                <span className="text-white font-semibold">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-550 uppercase text-[9px]">Zone Pick:</span>
                <span className="text-gold font-semibold uppercase">{formData.seatingPreference}</span>
              </div>
            </div>

            <p className="text-[9px] text-zinc-500 uppercase font-mono leading-normal">
              Note: Reserved slots are locked for exactly 15 minutes past target arrival hours before releasing to the walk-in deck queues.
            </p>

            <button
              id="reserve-success-dismiss"
              onClick={handleReset}
              className="w-full py-3 bg-zinc-950 border border-gold/15 hover:border-gold rounded-none text-xs font-bold uppercase tracking-widest text-[#E2C284] cursor-pointer transition-colors"
            >
              Done & Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isModal) {
    return (
      <AnimatePresence>
        {isReserveOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            {/* Backdrop close handle */}
            <div
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setIsReserveOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-lg bg-[#0D0D0D] border border-gold/15 rounded-none p-6 md:p-8 shadow-2xl z-10"
            >
              <button
                id="reserve-modal-close"
                onClick={() => setIsReserveOpen(false)}
                className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-gold cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-medium font-serif italic text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-gold fill-gold" /> Secure your Seaside Deck
                </h3>
                <p className="text-xs text-zinc-400 font-light pr-4 leading-relaxed">
                  Fill in your coordinates to lock in high-end oceanfront seating under the stars of Karachi DHA Do Darya.
                </p>
              </div>

              {formContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Inline Section Rendering layout
  return (
    <section id="reservations" className="relative py-24 bg-[#0A0A0A] text-[#F5F5F5] scroll-mt-20 border-t border-gold/10">
      {/* Decorative background vectors */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-gold/10 border border-gold/15 rounded-none">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              <span className="text-[10px] uppercase font-mono tracking-[0.15em] text-gold font-bold">
                Priority Table Reservations
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-light font-serif italic text-white leading-tight">
              Lock in your evening under <br /> the stars.
            </h2>
            
            <p className="text-sm text-zinc-400 leading-relaxed font-light">
              Avoid long seaside queues! Due to extreme weekend demands, early bookings are highly advised. Reserved seats are kept forExactly **15 minutes** before release.
            </p>

            <div className="space-y-4 pt-4 border-t border-gold/10">
              {Object.entries(seatDetails).map(([key, desc]) => (
                <div key={key} className="flex items-start space-x-3 text-xs">
                  <span className="capitalize font-mono text-gold font-bold shrink-0 min-w-[90px]">
                    {key === 'any' ? 'Steward' : key.replace('-', ' ')}:
                  </span>
                  <span className="text-zinc-400 leading-relaxed font-light">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/[0.01] border border-gold/10 p-6 sm:p-8 rounded-none relative">
            <div className="absolute inset-x-0 -top-px h-[1.5px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            {formContent}
          </div>

        </div>
      </div>
    </section>
  );
}
