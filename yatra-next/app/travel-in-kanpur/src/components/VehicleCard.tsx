'use client'

import Image from 'next/image'

interface VehicleCardProps {
  badge: string
  title: string
  imgSrc: string
  imgAlt: string
  specs: { label: string; value: string }[]
  tags: string[]
  onBook: (title: string) => void
  btnClass?: string
}

const BusSvg = () => (
  <svg viewBox="0 0 80 40" fill="none" style={{ width: 72, height: 72, opacity: 0.4 }}>
    <rect x="2" y="14" width="70" height="20" rx="4" fill="#0f6ec8" opacity=".18" />
    <rect x="8" y="8" width="48" height="16" rx="3" fill="#0f6ec8" opacity=".28" />
    <circle cx="16" cy="34" r="5" fill="#0f6ec8" opacity=".4" />
    <circle cx="58" cy="34" r="5" fill="#0f6ec8" opacity=".4" />
    <rect x="24" y="9" width="1.5" height="14" fill="#0f6ec8" opacity=".2" />
    <rect x="34" y="9" width="1.5" height="14" fill="#0f6ec8" opacity=".2" />
    <rect x="44" y="9" width="1.5" height="14" fill="#0f6ec8" opacity=".2" />
  </svg>
)

export default function VehicleCard({
  badge, title, imgSrc, imgAlt, specs, tags, onBook, btnClass = ''
}: VehicleCardProps) {
  return (
    <div className="vehicle-card">
      <div className="vc-img">
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Image
            src={imgSrc}
            alt={imgAlt}
            fill
            style={{ objectFit: 'cover' }}
            onError={() => {}}
          />
        </div>
        <div className="vc-img-placeholder">
          <BusSvg />
          <span>{title}</span>
        </div>
        <span className="vc-badge">{badge}</span>
      </div>
      <div className="vc-body">
        <h3>{title}</h3>
        <div className="vc-specs">
          {specs.map((s) => (
            <div key={s.label} className="vc-spec-item">
              <strong>{s.label}:</strong> {s.value}
            </div>
          ))}
        </div>
        <div className="vc-tags">
          {tags.map((t) => (
            <span key={t} className="vc-tag">{t}</span>
          ))}
        </div>
        <button
          className={`btn-book-card${btnClass ? ` ${btnClass}` : ''}`}
          onClick={() => onBook(title)}
        >
          Book {badge === 'Luxury' || badge === 'Maharaja' ? badge + ' Tempo' : badge + ' Seater'}
        </button>
      </div>
    </div>
  )
}
