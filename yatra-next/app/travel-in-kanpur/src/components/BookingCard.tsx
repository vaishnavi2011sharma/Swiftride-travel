'use client'

import { useState, useEffect } from 'react'

const TABS = ['Local Sightseeing', 'Wedding Transfer', 'Lucknow / Varanasi', 'Delhi / Agra']

interface BookingCardProps {
  onSearch: (msg: string) => void
  selectedVehicle: string
}

export default function BookingCard({ onSearch, selectedVehicle }: BookingCardProps) {
  const [activeTab, setActiveTab] = useState(0)
  const [fromCity, setFromCity] = useState('Kanpur')
  const [toCity, setToCity] = useState('')
  const [pickDate, setPickDate] = useState('')
  const [vtype, setVtype] = useState('Select Vehicle')

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    setPickDate(today)
  }, [])

  useEffect(() => {
    if (selectedVehicle && selectedVehicle !== 'Select Vehicle') {
      setVtype(selectedVehicle)
    }
  }, [selectedVehicle])

  const handleSearch = () => {
    if (!toCity.trim()) {
      onSearch('Please enter your destination.')
      return
    }
    onSearch(`Searching vehicles from ${fromCity} to ${toCity}...`)
  }

  return (
    <div className="booking-card" id="booking">
      <div className="booking-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`b-tab${activeTab === i ? ' active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="form-grid">
        <div>
          <div className="fg-label">From</div>
          <input
            type="text"
            className="fg-input"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            placeholder="Pickup location"
          />
        </div>
        <div>
          <div className="fg-label">To</div>
          <input
            type="text"
            className="fg-input"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            placeholder="Destination"
          />
        </div>
        <div>
          <div className="fg-label">Pickup Date</div>
          <input
            type="date"
            className="fg-input"
            value={pickDate}
            onChange={(e) => setPickDate(e.target.value)}
          />
        </div>
        <div>
          <div className="fg-label">Vehicle Type</div>
          <select
            className="fg-input"
            value={vtype}
            onChange={(e) => setVtype(e.target.value)}
          >
            <option>Select Vehicle</option>
            <option>12 Seater Tempo Traveller</option>
            <option>16 Seater Tempo Traveller</option>
            <option>20 Seater Tempo Traveller</option>
            <option>12 Seater Luxury Tempo Traveller</option>
            <option>16 Seater Luxury Tempo Traveller</option>
          </select>
        </div>
        <button className="btn-search" onClick={handleSearch}>Search</button>
      </div>
    </div>
  )
}
