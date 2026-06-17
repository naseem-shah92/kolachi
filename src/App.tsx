/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider } from './components/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import SignatureDishes from './components/SignatureDishes';
import Menu from './components/Menu';
import Experience from './components/Experience';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import ReservationForm from './components/ReservationForm';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CursorEffect from './components/CursorEffect';
import FloatingWidgets from './components/FloatingWidgets';

export default function App() {
  return (
    <AppProvider>
      <div id="kolachi-brand-app" className="relative min-h-screen bg-zinc-950 text-white selection:bg-amber-500/30 overflow-x-hidden">
        
        {/* Elite Ambient Cursor companion on hover */}
        <CursorEffect />

        {/* Global sticky/floating action shortcuts */}
        <FloatingWidgets />

        {/* Dynamic sliding checkout Drawer */}
        <CartDrawer />

        {/* Priority Table reservation modal */}
        <ReservationForm isModal={true} />

        {/* Sticky/Frosted Glass Header Navigation */}
        <Navbar />

        {/* View modules */}
        <main className="relative">
          {/* Panoramic Home Banner */}
          <Hero />

          {/* Seaside Story */}
          <About />

          {/* Core Masterpieces */}
          <SignatureDishes />

          {/* Interactive Menu Filtering grid */}
          <Menu />

          {/* Bento Grid Scenes */}
          <Experience />

          {/* Masorny Zoom-Lightbox Gallery */}
          <Gallery />

          {/* Sliding reviews carousel */}
          <Reviews />

          {/* Inline table booking scheduler */}
          <ReservationForm isModal={false} />

          {/* Address, timings & map embedding */}
          <Contact />
        </main>

        {/* Parallax structure Footer footnotes */}
        <Footer />

      </div>
    </AppProvider>
  );
}
