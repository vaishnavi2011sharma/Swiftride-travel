'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import BookingCard from '../components/BookingCard'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

/* ─── DATA ─── */
const VEHICLES = [
  {
    badge: '12 Seater', title: '12 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/12seater.jpg', imgAlt: '12 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '12 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹23/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'Pushback Seats', 'Lucknow Trip', 'Family Tours'],
  },
  {
    badge: '14 Seater', title: '14 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/14seater.jpg', imgAlt: '14 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '14 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹24/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'Pushback Seats', 'Corporate Tours', 'Family Trips'],
  },
  {
    badge: '16 Seater', title: '16 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/16seater.jpg', imgAlt: '16 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '16 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹26/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'Extra Legroom', 'Varanasi Trip', 'Office Outings'],
  },
  {
    badge: '18 Seater', title: '18 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/18seater.jpg', imgAlt: '18 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '18 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹28/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'More Legroom', 'Delhi Trip', 'Group Tours'],
  },
  {
    badge: '20 Seater', title: '20 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/20seater.jpg', imgAlt: '20 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '20 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹30/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'Max Luggage', 'Wedding Baraat', 'Pilgrimage'],
  },
  {
    badge: '24 Seater', title: '24 Seater Tempo Traveller in Kanpur',
    imgSrc: '/images/24seater.jpg', imgAlt: '24 Seater Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '24 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: '₹35/km' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Full AC', 'Large Groups', 'Corporate Events', 'Pilgrimage'],
  },
  {
    badge: 'Luxury', title: 'Luxury Tempo Traveller in Kanpur',
    imgSrc: '/images/luxury.jpg', imgAlt: 'Luxury Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '9-16 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: 'On Request' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Premium AC', 'LED Lighting', 'Music System', 'Charging Points'],
  },
  {
    badge: 'Maharaja', title: 'Maharaja Tempo Traveller in Kanpur',
    imgSrc: '/images/maharaja.jpg', imgAlt: 'Maharaja Tempo Traveller in Kanpur',
    specs: [
      { label: 'Seating Capacity', value: '9–16 Passengers + 1 Driver' },
      { label: 'Starting Fare', value: 'On Request' },
      { label: 'Driving Charges', value: '₹500/day' },
      { label: 'Minimum Km/Day', value: '250 km/day' },
      { label: 'Facility', value: 'AC, Pushback Seat, Music System' },
    ],
    tags: ['Sofa Seats', 'Full Recline', 'VIP Travel', 'Grand Weddings'],
  },
]

const OPTIONS_TABLE = [
  { vehicle: '12 Seater Tempo Traveller in Kanpur', capacity: '12 + Driver', ac: 'AC', ideal: 'Small and medium family groups - local sightseeing in Kanpur, day trips, and outstation routes to Lucknow and Prayagraj' },
  { vehicle: '14 Seater Tempo Traveller in Kanpur', capacity: '14 + Driver', ac: 'AC', ideal: 'Medium family groups and office teams - ideal for corporate outings, school trips, and comfortable outstation travel from Kanpur' },
  { vehicle: '16 Seater Tempo Traveller in Kanpur', capacity: '16 + Driver', ac: 'AC', ideal: 'Medium to large groups - corporate tours, school excursions, wedding parties, and longer outstation routes to Varanasi and Delhi' },
  { vehicle: '18 Seater Tempo Traveller in Kanpur', capacity: '18 + Driver', ac: 'AC', ideal: 'Large family gatherings and pilgrimage groups - comfortable seating with good luggage space for trips to Delhi, Agra, and Ayodhya' },
  { vehicle: '20 Seater Tempo Traveller in Kanpur', capacity: '20 + Driver', ac: 'AC', ideal: 'Large groups - baraat transport, religious pilgrimage groups, and large family gatherings travelling together from Kanpur' },
  { vehicle: '24 Seater Tempo Traveller in Kanpur', capacity: '24 + Driver', ac: 'AC', ideal: 'Very large groups - big corporate events, college excursions, and multi-city pilgrimage tours from Kanpur across North India' },
  { vehicle: 'Luxury Tempo Traveller in Kanpur', capacity: '9–16 + Driver', ac: 'Premium AC', ideal: 'VIP guests, wedding functions, corporate travel - soft pushback seats, LED lighting, music system, and charging points included' },
  { vehicle: 'Maharaja Tempo Traveller in Kanpur', capacity: '9–16 + Driver', ac: 'Premium AC', ideal: 'Ultimate VIP travel, grand weddings, senior citizens - pushback sofa seats, full recline, premium interiors, air suspension' },
]

const ROUTES_TABLE = [
  { route: 'Kanpur to Lucknow', dist: '~80 km', vehicle: '12 or 16 Seater' },
  { route: 'Kanpur to Prayagraj', dist: '~190 km', vehicle: '12 or 16 Seater' },
  { route: 'Kanpur to Varanasi', dist: '~330 km', vehicle: '12 or 16 Seater' },
  { route: 'Kanpur to New Delhi', dist: '~450 km', vehicle: '12 or 16 Seater' },
  { route: 'Kanpur to Agra', dist: '~300 km', vehicle: '12 or 16 Seater' },
  { route: 'Kanpur to Ayodhya', dist: '~165 km', vehicle: '12 or 16 Seater' },
]

const USE_TAGS = [
  'Kanpur Local Sightseeing', 'Wedding Guest Transfers', 'Baraat Transport Kanpur',
  'VIP Guest Movement', 'Kanpur to Lucknow Group Travel', 'Kanpur to Varanasi Pilgrimage',
  'Kanpur to Prayagraj Kumbh', 'Kanpur to Delhi Outstation', 'Corporate Office Outings',
  'Family Multi-Day Trips', 'Religious Pilgrimage Groups', 'Airport Group Transfers',
]

const FEATURES = [
  { icon: 'heart', title: 'Premium Pushback Seats', desc: 'Soft and wide pushback seats provide extra comfort and support for long journeys — ideal for wedding hire and VIP travel in Kanpur' },
  { icon: 'wind', title: 'Fully Air-Conditioned', desc: 'All luxury tempo travellers are fully AC — keeps passengers comfortable during long outstation trips and local Kanpur city sightseeing in any weather' },
  { icon: 'rows', title: 'Extra Legroom', desc: 'Wide aisles and generous legroom — passengers can relax without feeling cramped on long routes from Kanpur to Varanasi or Delhi' },
  { icon: 'monitor', title: 'Stylish Interiors and Ambient Lighting', desc: 'Premium flooring, roof lights, and soft LED lighting give a VIP travel experience that makes an impression at every wedding and corporate event' },
  { icon: 'luggage', title: 'Large Luggage Space', desc: 'Ample luggage space for suitcases, shopping bags, and gifts — perfect for outstation trips, airport transfers, and wedding travel from Kanpur' },
  { icon: 'shield', title: 'Smooth Suspension', desc: 'Superior suspension system built for highways — smooth and comfortable ride even on long routes like Kanpur to Lucknow or Kanpur to Varanasi' },
  { icon: 'tv', title: 'Entertainment and Charging Points', desc: 'Music systems, LED TVs, and mobile charging points in most luxury tempo travellers — makes the journey fun and connected for every passenger' },
  { icon: 'person', title: 'Professional and Polite Drivers', desc: 'Trained, polite drivers who know local Kanpur routes, highways, and sightseeing spots — ensure safe and timely travel for weddings and corporate groups' },
]

const INCLUDED = [
  'Base fare of Tempo Traveller',
  'Fuel charges included',
  'Driver day allowance included',
  'Clean, well-maintained vehicle',
  'Driver accommodation (Multi-day trips)',
]
const EXCLUDED = [
  'Toll tax charges (as per actual during the trip)',
  'State entry tax / permit charges (if applicable)',
  'Parking charges (as per actual at locations)',
  'Driver night allowance (₹500 for Tempo Traveller, if applicable)',
  'Luggage carrier charges',
]

const BENEFITS = [
  { title: 'Comfortable Travel for Large Groups', desc: 'Luxury tempo travellers seat 12, 16, or 20 people comfortably. Families and wedding guests travel together in one vehicle instead of splitting into multiple cars — reducing confusion, saving time, and ensuring everyone arrives together and on time.' },
  { title: 'Premium Interiors and Amenities', desc: 'Fully air-conditioned interiors, reclining seats, LED lighting, music systems, and ample legroom. For weddings, guests enjoy a smooth and stylish ride between the wedding venue, airport, and hotel.' },
  { title: 'Professional and Polite Drivers', desc: 'Experienced and polite drivers who know local Kanpur routes, handle city traffic efficiently, and ensure timely arrivals for events. Wedding travel stays safe and stress-free especially for senior citizens and VIP guests.' },
  { title: 'Flexible for All Wedding Travel Needs', desc: 'From baraat transport and VIP guest pickup to shuttle services between venues, luxury tempo travellers are versatile — ideal for short local trips or long-distance travel to nearby cities and temples.' },
  { title: 'Cost Effective and Convenient', desc: 'Hiring a single luxury tempo traveller in Kanpur is more economical than multiple cars. Save on fuel, parking, and traffic hassle while providing premium comfort and style to your guests.' },
  { title: 'On-Time and Organised', desc: 'At Yatra Travel India we focus on quality service, on-time pickup, and transparent pricing. Our luxury tempo travellers are well-maintained and regularly checked for safety and comfort before every trip.' },
]

const OUTSTATION_ROUTES = [
  {
    title: 'Kanpur to Lucknow Tempo Traveller',
    meta: ['~80 km', '1–2 Hours', 'Most Booked Route'],
    desc: 'The most popular outstation route from Kanpur. Whether it is a family outing, corporate tour, wedding travel, or a pilgrimage trip, a Kanpur to Lucknow tempo traveller ensures everyone can travel together in one vehicle. Our experienced drivers know the Kanpur to Lucknow route well, ensuring timely pickup and drop and smooth highway travel. Both standard and luxury tempo traveller options available for this route.',
  },
  {
    title: 'Kanpur to Prayagraj Tempo Traveller',
    meta: ['~190 km', '3–4 Hours', 'Pilgrimage and Family'],
    desc: 'Make your group travel from Kanpur to Prayagraj simple and comfortable by hiring a tempo traveller. Perfect for families, friends, corporate teams, wedding guests, or pilgrims. Our 12 seater and 16 seater tempo travellers in Kanpur are fully air-conditioned, spacious, and feature reclining seats with enough room for all luggage. The driver handles all traffic and directions so your group can relax for the full journey.',
  },
  {
    title: 'Kanpur to Varanasi Tempo Traveller',
    meta: ['~330 km', '5–6 Hours', 'Kashi Pilgrimage'],
    desc: 'Travelling from Kanpur to Varanasi with a group is easy and stress-free when you hire a tempo traveller. Whether it is a family trip, office tour, wedding party, or a pilgrimage journey to Kashi, a Kanpur to Varanasi tempo traveller keeps everyone together. Long distance travel is comfortable with reclining seats, full AC, and plenty of luggage space. The driver knows the route well and ensures timely pickups and drop-offs.',
  },
  {
    title: 'Kanpur to New Delhi Tempo Traveller',
    meta: ['~450 km', '6–7 Hours', 'Family and Corporate'],
    desc: 'Skip the hassle of multiple cars and long drives by hiring a tempo traveller from Kanpur to New Delhi. Perfect for family trips, office tours, wedding parties, or pilgrimage journeys. Our 12 seater and 16 seater tempo travellers are fully air conditioned and have reclining seats with enough room for luggage, making the long-distance journey smooth and relaxing. The driver knows the Kanpur to New Delhi route well and ensures timely arrival.',
  },
]

const WHY_CARDS = [
  { title: 'Clean and Well-Maintained Vehicles', desc: 'All tempo travellers in Kanpur are clean, well-maintained, fully air conditioned, and designed for comfort with reclining seats, enough legroom, and ample luggage space.' },
  { title: 'Experienced and Polite Drivers', desc: 'Drivers know all Kanpur city roads and highways well. You can enjoy the journey without worrying about traffic or navigation — especially for long routes to Varanasi and Delhi.' },
  { title: 'Fair and Transparent Pricing', desc: 'Wide range — 12 seater, 16 seater, and luxury — at fair pricing with fuel, tolls, and driver allowance included and no hidden costs.' },
  { title: 'Easy Online Booking and 24x7 Support', desc: 'Easy online booking, 24x7 support, and vehicles kept in top condition for every trip. Call 9044019511 or WhatsApp anytime — someone always picks up.' },
  { title: 'Doorstep Pickup Anywhere in Kanpur', desc: 'Whether near the railway station, a hotel, or any residential area in Kanpur, pickup can be arranged right to your doorstep. Just share the correct location while booking.' },
  { title: 'Multi-Day and Multi-City Trips', desc: 'Kanpur to Varanasi, Ayodhya, Lucknow, or a longer North India pilgrimage — the plan can be fully customised for your group\'s needs and travel dates.' },
]

const FAQS = [
  { q: 'Q1. How early should I book a tempo traveller in Kanpur?', a: 'If your travel dates are fixed, do not wait till the last moment. In Kanpur, vehicles get booked quickly during wedding season and long weekends. Booking 4 to 7 days in advance is usually a safe choice if you want a good vehicle at a reasonable price.' },
  { q: 'Q2. Will the tempo traveller come to my exact pickup location in Kanpur?', a: 'Yes, in most cases the vehicle will come right to your doorstep. Whether you are near the railway station, a hotel, or any residential area in Kanpur, pickup can be arranged easily. Just share the correct location while booking.' },
  { q: 'Q3. Are there any hidden charges in tempo traveller rental in Kanpur?', a: 'This depends on the service provider. A good rental company will clearly explain everything — like toll tax, parking, and driver allowance. At Yatra Travel India it is always better to ask once before confirming so there are no surprises later.' },
  { q: 'Q4. Can I plan a multi-day or multi-city trip from Kanpur?', a: 'Yes, and honestly this is where a tempo traveller makes the most sense. Whether you are planning Kanpur to Varanasi, Ayodhya, Lucknow, or even a longer North India trip, the plan can be customized based on your group\'s needs.' },
  { q: 'Q5. Is there any difference between a normal and a luxury tempo traveller?', a: 'Yes, there is a noticeable difference. A normal tempo traveller is simple and budget-friendly. A luxury tempo traveller comes with better seats, more leg space, charging points, and sometimes even extra features like TV or lighting. If comfort matters, go for the luxury option.' },
  { q: 'Q6. Is a tempo traveller a good option for family trips?', a: 'Honestly, yes. Instead of managing multiple cars and coordinating with everyone, a tempo traveller keeps the whole family together. It makes the journey more relaxed and enjoyable, especially on long routes.' },
  { q: 'Q7. Can I book a tempo traveller in Kanpur just for one day?', a: 'Yes, you can. Many people book it for one-day trips like local sightseeing or nearby places. It is simple, convenient, and saves you from the hassle of arranging multiple vehicles.' },
  { q: 'Q8. Do drivers know the routes well for outstation travel?', a: 'Most drivers are experienced and regularly travel on routes like Kanpur to Lucknow, Prayagraj, Varanasi, and Delhi. They know the roads, stops, and timing well, which makes your journey smoother.' },
  { q: 'Q9. Why do people prefer tempo travellers over cars for group travel?', a: 'The biggest reason is convenience. Everyone travels together, there is enough space for luggage, and the cost per person becomes much lower compared to booking multiple cars. It just makes the whole trip easier.' },
  { q: 'Q10. Is AC available in tempo travellers in Kanpur?', a: 'Yes, AC tempo travellers are easily available and are actually the most preferred option, especially in summer. They make a big difference in comfort during long journeys.' },
]

const NETWORK_LINKS = [
  { href: '/travel-in-new-delhi.html', city: 'tempo-traveller-in-new-delhi', type: 'Corporate Travel, Weddings & Outstation' },
  { href: '/travel-in-ranchi.html', city: 'tempo-traveller-in-ranchi', type: 'City Tours, IT Movement & Transfers' },
  { href: '/travel-in-jaipur.html', city: 'tempo-traveller-in-jaipur', type: 'Weddings, Tourism & Destination Events' },
  { href: '/travel-in-lucknow.html', city: 'tempo-traveller-in-lucknow', type: 'Family Travel & Religious Tours' },
  { href: '/travel-in-indore.html', city: 'tempo-traveller-in-indore', type: 'Business Travel & Regional Movement' },
  { href: '/travel-in-patna.html', city: 'tempo-traveller-in-patna', type: 'School Trips, Weddings & Outstation' },
  { href: '/travel-in-varanasi.html', city: 'tempo-traveller-in-varanasi', type: 'Pilgrimage Groups & Cultural Tours' },
]

/* ─── SVG ICONS ─── */
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const CrossIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 3 }}>
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
  </svg>
)
const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.11 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
  </svg>
)

/* ─── PAGE ─── */
export default function KanpurTempoPage() {
  const toastRef = useRef<any>(null)
  const bookingRef = useRef<HTMLDivElement>(null)
  const [selectedVehicle, setSelectedVehicle] = useState('Select Vehicle')

  const showToast = useCallback((msg: string) => {
    toastRef.current?.showToast(msg)
  }, [])

  const scrollToBooking = useCallback(() => {
    bookingRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleSelectVehicle = useCallback((title: string) => {
    setSelectedVehicle(title)
    scrollToBooking()
    showToast(`${title} selected. Enter destination to continue.`)
  }, [scrollToBooking, showToast])

  return (
    <>
      {/* TOP BAR */}
      <div className="topbar">
        <div className="topbar-inner">
          <p>Kanpur&apos;s Trusted Tempo Traveller — Weddings, VIP Travel, Lucknow, Varanasi, Prayagraj and Delhi</p>
          <div className="topbar-right">
            <a href="https://wa.me/919044019511">WhatsApp Us</a>
            <a href="tel:+919044019511">+91 90440 19511</a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <Navbar onBookNowClick={scrollToBooking} />

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/#services">Services</Link>
          <span>/</span>
          <span>Tempo Traveller in Kanpur</span>
        </div>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-heading">Tempo Traveller on Rent in Kanpur</h1>
          <p className="hero-sub">Weddings and VIP Travel · Lucknow · Varanasi · Prayagraj · Delhi · Agra · Local Sightseeing</p>
          <div className="hero-badges">
            {['12 and 16 Seater Available', 'Luxury Tempo Traveller', 'Fully Air Conditioned', 'Fixed Fare · No Hidden Charges'].map(b => (
              <span key={b} className="hero-badge">{b}</span>
            ))}
          </div>
          <div ref={bookingRef}>
            <BookingCard onSearch={showToast} selectedVehicle={selectedVehicle} />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust-strip">
        <div className="trust-inner">
          {[
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>, title: 'On-Time Pickup', sub: 'Pickup from your exact location' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, title: 'Clean and Well Maintained', sub: 'Regularly serviced before every trip' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>, title: 'Transparent Pricing', sub: 'Fuel, toll, driver allowance included' },
            { icon: <svg viewBox="0 0 24 24" fill="none" stroke="#0f6ec8" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>, title: 'Professional Drivers', sub: 'Know all Kanpur routes and highways' },
          ].map(item => (
            <div key={item.title} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div className="trust-text"><strong>{item.title}</strong><span>{item.sub}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="page-body">

        {/* INFO BOX */}
        <div className="info-box">
          <p>Yatra Travel India offers <strong>tempo traveller on rent in Kanpur</strong> for local sightseeing, wedding guest transfers, VIP movement, and outstation trips to Lucknow, Varanasi, Prayagraj, Delhi, and Agra. <strong>12 seater, 16 seater, and Luxury Tempo Traveller available.</strong> Fully AC, clean, pushback seats, experienced drivers. Transparent pricing — fuel, tolls, and driver allowance all included. Call <strong>9044019511</strong> to book.</p>
        </div>

        {/* INTRO */}
        <div className="intro-section">
          <h1>Tempo Traveller on Rent in Kanpur — Comfortable Group Travel for Every Occasion</h1>
          <p>Kanpur is a busy city, and travelling in multiple cars can be tiring and costly. With a tempo traveller rental in Kanpur, your whole group can sit in one vehicle and enjoy the journey together. Our tempo travellers are fully air conditioned, clean, and well maintained, making them perfect for all age groups including senior citizens and children.</p>
          <p>We offer 12 seater, 16 seater, and luxury tempo travellers for premium travel. These vehicles come with comfortable pushback seats, good legroom, and proper luggage space. Whether you are going for local sightseeing in Kanpur or planning an outstation trip to Lucknow, Varanasi, Prayagraj, or Delhi, a tempo traveller with a driver in Kanpur makes travel smooth and relaxed. With easy online booking, 24x7 support, and vehicles kept in top condition, tempo traveller hire in Kanpur with Yatra ensures a reliable, convenient, and enjoyable travel experience for every group.</p>
        </div>

        {/* VEHICLE CARDS */}
        <h2 className="section-title" id="services">Tempo Traveller Options in Kanpur</h2>
        <div className="vehicles-grid">
          {VEHICLES.map(v => {
            const BusSvg = () => (
              <svg viewBox="0 0 80 40" fill="none" style={{ width: 72, height: 72, opacity: 0.4 }}>
                <rect x="2" y="14" width="70" height="20" rx="4" fill="#0f6ec8" fillOpacity=".18" />
                <rect x="8" y="8" width="48" height="16" rx="3" fill="#0f6ec8" fillOpacity=".28" />
                <circle cx="16" cy="34" r="5" fill="#0f6ec8" fillOpacity=".4" />
                <circle cx="58" cy="34" r="5" fill="#0f6ec8" fillOpacity=".4" />
                <rect x="24" y="9" width="1.5" height="14" fill="#0f6ec8" fillOpacity=".2" />
                <rect x="34" y="9" width="1.5" height="14" fill="#0f6ec8" fillOpacity=".2" />
                <rect x="44" y="9" width="1.5" height="14" fill="#0f6ec8" fillOpacity=".2" />
              </svg>
            )
            return (
              <div key={v.badge} className="vehicle-card">
                <div className="vc-img">
                  <div className="vc-img-placeholder">
                    <BusSvg />
                    <span>{v.title}</span>
                  </div>
                  <span className="vc-badge">{v.badge}</span>
                </div>
                <div className="vc-body">
                  <h3>{v.title}</h3>
                  <div className="vc-specs">
                    {v.specs.map(s => (
                      <div key={s.label} className="vc-spec-item"><strong>{s.label}:</strong> {s.value}</div>
                    ))}
                  </div>
                  <div className="vc-tags">
                    {v.tags.map(t => <span key={t} className="vc-tag">{t}</span>)}
                  </div>
                  <button className="btn-book-card" onClick={() => handleSelectVehicle(v.title)}>
                    Book {v.badge} {v.badge === 'Luxury' || v.badge === 'Maharaja' ? 'Tempo' : 'Seater'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* VEHICLE OPTIONS TABLE */}
        <h2 className="section-title">Tempo Traveller Options in Kanpur</h2>
        <div className="vot-wrap">
          <table className="vehicle-options-table">
            <thead>
              <tr>
                <th>Vehicle Type</th>
                <th>Seating Capacity</th>
                <th>Air Conditioning</th>
                <th>Ideal For</th>
              </tr>
            </thead>
            <tbody>
              {OPTIONS_TABLE.map(row => (
                <tr key={row.vehicle}>
                  <td>{row.vehicle}</td>
                  <td>{row.capacity}</td>
                  <td><span className={`ac-badge${row.ac === 'Premium AC' ? ' climate' : ''}`}>{row.ac}</span></td>
                  <td>{row.ideal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FARE TABLE */}
        <h2 className="section-title green">Tempo Traveller Hire in Kanpur - Key Routes</h2>
        <div className="fare-table-wrap">
          <table className="fare-table">
            <thead>
              <tr>
                <th>Route</th><th>Distance</th><th>Vehicle</th><th>Fare</th>
              </tr>
            </thead>
            <tbody>
              {ROUTES_TABLE.map(row => (
                <tr key={row.route}>
                  <td>{row.route}</td>
                  <td>{row.dist}</td>
                  <td>{row.vehicle}</td>
                  <td>
                    <a href="tel:+919044019511" className="call-now-btn">
                      <PhoneIcon />&nbsp;Call Now
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* IDEAL FOR */}
        <h2 className="section-title orange">Perfect For</h2>
        <div className="use-tags">
          {USE_TAGS.map(t => <span key={t} className="use-tag">{t}</span>)}
        </div>

        {/* LUXURY SECTION */}
        <div className="why-tempo-section">
          <h2 className="section-title">Luxury Tempo Traveller in Kanpur</h2>
          <div className="why-tempo-content">
            <p>If you want comfort with a premium touch, booking a luxury tempo traveller in Kanpur is the perfect choice. It is ideal for wedding guests, corporate travel, VIP movement, family tours, and long outstation trips. A luxury tempo traveller gives you more space, better seating, and a smooth travel experience compared to regular vehicles.</p>
            <p>Our luxury tempo traveller on rent in Kanpur comes with fully air-conditioned interiors, soft pushback seats, extra legroom, and stylish lighting. The interiors are clean, modern, and designed to make long journeys relaxing. There is enough luggage space, making it suitable for airport transfers and multi-day trips.</p>
            <p>We offer 12 seater and 16 seater luxury tempo travellers in Kanpur, driven by professional and polite drivers who know city roads and highways well. Whether you are planning a wedding function, business trip, religious tour, or an outstation journey to Lucknow, Varanasi, Delhi, or Agra, a luxury tempo traveller with driver in Kanpur ensures a smooth and stress-free ride.</p>
          </div>
        </div>

        {/* FEATURES */}
        <h2 className="section-title">Features of Luxury Tempo Traveller in Kanpur</h2>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="fc-icon">
                <svg viewBox="0 0 24 24" fill="#fff" width="24" height="24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* INCLUSIONS / EXCLUSIONS */}
        <h2 className="section-title">Fare Inclusions and Exclusions</h2>
        <div className="ei-split">
          <div className="ei-box">
            <div className="ei-box-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              <span>INCLUDED</span>
            </div>
            <ul>
              {INCLUDED.map(item => (
                <li key={item}><CheckIcon />{item}</li>
              ))}
            </ul>
          </div>
          <div className="ei-box">
            <div className="ei-box-header">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              <span>EXCLUDED</span>
            </div>
            <ul>
              {EXCLUDED.map(item => (
                <li key={item}><CrossIcon />{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* WEDDING SECTION */}
        <div className="why-tempo-section">
          <h2 className="section-title">Luxury Tempo Traveller in Kanpur for Weddings and VIP Guests</h2>
          <div className="why-tempo-content">
            <p>Kanpur has a strong VIP and grand wedding culture. From big family weddings to high-profile business events, people in Kanpur prefer classy, well-managed, and comfortable travel. Whether it is a large wedding at a banquet hall, a destination wedding, or a VIP guest arrival, travel arrangements play a big role in making the event smooth and impressive.</p>
            <p>A luxury tempo traveller in Kanpur is a perfect choice for wedding guests and VIP movement. These vehicles are designed for premium travel, offering stylish interiors, soft pushback seats, extra legroom, and full air conditioning. Guests can travel together comfortably, without the rush and confusion of multiple cars.</p>
            <p>For weddings, a luxury tempo traveller on rent in Kanpur is commonly used to move baraat members, close relatives, and outstation guests between hotels, wedding venues, and function locations. For VIP guests, it ensures privacy, comfort, and a professional travel experience. Our drivers understand event timing and VIP travel needs and always ensure on-time pickup and smooth driving.</p>
          </div>
        </div>

        {/* BENEFITS */}
        <h2 className="section-title">Why Luxury Tempo Travellers Are Popular for Weddings in Kanpur</h2>
        <div className="benefits-grid">
          {BENEFITS.map(b => (
            <div key={b.title} className="benefit-card">
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>

        {/* OUTSTATION ROUTES */}
        <h2 className="section-title orange" id="attractions">Popular Outstation Routes from Kanpur</h2>
        <div className="routes-grid">
          {OUTSTATION_ROUTES.map(r => (
            <div key={r.title} className="route-card">
              <h4>{r.title}</h4>
              <div className="route-meta">
                {r.meta.map(m => <span key={m}>{m}</span>)}
              </div>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        {/* WHY CHOOSE US */}
        <h2 className="section-title">Why Book a Tempo Traveller with Yatra Travel India in Kanpur</h2>
        <div className="why-grid">
          {WHY_CARDS.map(w => (
            <div key={w.title} className="why-card">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="#0f6ec8"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* NOTE BOX */}
        <div className="note-box">
          <p><strong>Advance Booking Recommended:</strong> Kanpur tempo travellers get booked quickly during <strong>wedding season and long weekends.</strong> Booking <strong>4 to 7 days in advance</strong> is usually a safe choice if you want a good vehicle at a reasonable price. For luxury tempo travellers during peak wedding season, book <strong>1 to 2 weeks ahead.</strong> Multi-day outstation trips to Varanasi and Delhi should be confirmed early to secure vehicle and driver availability.</p>
        </div>

        {/* FAQ */}
        <h2 className="section-title">Frequently Asked Questions — Tempo Traveller in Kanpur</h2>
        <div className="faq-grid">
          {FAQS.map(f => (
            <div key={f.q} className="faq-item">
              <strong>{f.q}</strong>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        {/* CTA BANNER */}
        <div className="cta-banner">
          <div>
            <h3>Book Your Kanpur Group Trip Today</h3>
            <p>Enjoy stylish, comfortable group travel without any hassle. Weddings, VIP movement, Lucknow, Varanasi, Prayagraj, Delhi — call us with your group size and travel date. We handle everything else.</p>
          </div>
          <div className="cta-buttons">
            <button className="btn-cta-primary" onClick={() => window.location.href = 'tel:+919044019511'}>
              Call Now — +91 90440 19511
            </button>
            <button className="btn-cta-secondary" onClick={() => window.open('https://wa.me/919044019511')}>
              WhatsApp Us
            </button>
          </div>
        </div>

        {/* NETWORK */}
        <div className="popular-routes-section">
          <div className="network-section">
            <div className="network-title-row">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <h2 className="network-title">Our Pan-India Tempo Traveller Network</h2>
            </div>
            <p className="network-sub">Connecting India&apos;s major cities with premium group travel services.</p>
            <div className="network-grid">
              {NETWORK_LINKS.map(n => (
                <a key={n.href} href={n.href} className="network-item">
                  <LinkIcon />
                  <div className="network-item-text">
                    <div className="city">{n.city}</div>
                    <div className="type">{n.type}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="network-footer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <rect x="1" y="3" width="22" height="16" rx="2" /><path d="M1 9h22" />
                <circle cx="8" cy="16" r="1.5" fill="#64748b" /><circle cx="16" cy="16" r="1.5" fill="#64748b" />
              </svg>
              <span>© 2026 Yatra Travel India. All rights reserved. Your Safe Travel Partner.</span>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING BUTTONS */}
      <a href="tel:+919044019511" className="call-float">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" width="26" height="26">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.11 1.18 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
        </svg>
      </a>
      <a href="https://wa.me/919044019511" className="wa-float" target="_blank" rel="noreferrer">
        <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <Toast ref={toastRef} />
    </>
  )
}
