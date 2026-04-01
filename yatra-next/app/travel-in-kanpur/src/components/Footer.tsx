import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-icon" style={{ width: 40, height: 40 }}>
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <path d="M4 20 L8 10 L14 17 L20 8 L24 20 Z" fill="#fff" stroke="#fff" strokeWidth=".5" />
                <circle cx="8" cy="22" r="2.5" fill="#ff6b35" />
                <circle cx="20" cy="22" r="2.5" fill="#ff6b35" />
                <rect x="6" y="18" width="16" height="5" rx="1" fill="none" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>
            <div className="logo-text-wrap">
              <span className="logo-main">Yatra<span>Travel</span></span>
              <span className="logo-sub">India</span>
            </div>
          </div>
          <p>India&apos;s trusted tempo traveller and bus rental platform. Serving 50+ cities with 1000+ vehicles for pilgrimage, corporate, and leisure travel.</p>
          <div className="footer-social">
            <a href="#">FB</a>
            <a href="#">IG</a>
            <a href="#">TW</a>
            <a href="#">YT</a>
          </div>
        </div>

        <div className="footer-col">
          <h5>Services in Kanpur</h5>
          <ul>
            {['12 Seater Tempo Traveller', '16 Seater Tempo Traveller', '20 Seater Tempo Traveller', '12 Seater Luxury Tempo', '16 Seater Luxury Tempo', 'Wedding Baraat Transport'].map(s => (
              <li key={s}><a href="#">{s}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5>Popular Routes</h5>
          <ul>
            {['Kanpur to Lucknow', 'Kanpur to Varanasi', 'Kanpur to Prayagraj', 'Kanpur to Delhi', 'Kanpur to Agra', 'Kanpur to Ayodhya'].map(r => (
              <li key={r}><a href="#">{r}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cancellation Policy</a></li>
            <li><a href="/#contact">Contact Us</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>2025 Yatra Travel India. All rights reserved. Serving group travel across India. Made in India with love.</p>
        <div className="footer-payments">
          {['UPI', 'Net Banking', 'Cash', 'Credit Card'].map(p => (
            <span key={p} className="fp">{p}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}
