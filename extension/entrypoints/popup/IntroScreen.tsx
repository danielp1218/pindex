import { useState } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  eventTitle: string;
  profileImage: string | null;
  onStart: () => void;
  onNotNow: () => void;
}

export default function IntroScreen({
  eventTitle,
  profileImage,
  onStart,
  onNotNow,
}: IntroScreenProps) {
  const [startHover, setStartHover] = useState(false);
  const [notNowHover, setNotNowHover] = useState(false);

  return (
    <div style={{
      width: '420px',
      minWidth: '420px',
      maxWidth: '420px',
      height: '600px',
      maxHeight: '600px',
      background: 'linear-gradient(145deg, #0f1520 0%, #0a0e16 50%, #080c12 100%)',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: profileImage ? 'transparent' : 'linear-gradient(135deg, #475569, #334155)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
          overflow: 'hidden',
        }}>
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Event" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%' 
              }} 
            />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
          <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: '#64748b' }}>Pindex</span>
          <h1 style={{ 
            margin: 0, 
            fontSize: '16px', 
            fontWeight: 600, 
            color: '#f1f5f9',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {eventTitle}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 32px',
        textAlign: 'center',
        gap: '24px',
      }}>
        {/* Logo/Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px',
          }}
        >
          <svg width="64" height="64" viewBox="0 0 994 900" style={{ filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.3))' }}>
            <defs>
              <linearGradient id="introLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
            </defs>
            <g transform="translate(0, 900) scale(0.1, -0.1)">
              <path
                fill="url(#introLogoGradient)"
                d="M0 4500 l0 -4500 4970 0 4970 0 0 4500 0 4500 -4970 0 -4970 0 0 -4500z m8010 -125 l0 -2635 -3040 0 -3040 0 0 1369 c0 1487 -4 1375 51 1406 10 5 108 69 218 140 202 131 484 313 913 590 128 82 281 181 340 220 141 93 273 178 375 242 97 61 66 65 291 -40 86 -41 180 -84 207 -97 28 -12 165 -75 305 -140 140 -64 287 -132 326 -149 l71 -33 124 75 c68 40 237 140 374 222 138 81 277 165 310 185 33 20 139 83 235 140 96 56 342 202 545 323 469 279 600 356 755 447 250 147 397 234 505 300 61 38 116 68 123 69 9 1 12 -532 12 -2634z"
              />
            </g>
          </svg>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
        >
          <h2 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: '#f1f5f9',
            margin: 0,
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}>
            Ready to analyze?
          </h2>
          <p style={{
            fontSize: '14px',
            color: '#94a3b8',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '320px',
          }}>
            Pindex will analyze related markets and provide recommendations for this event.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            width: '100%',
            maxWidth: '280px',
            marginTop: '16px',
          }}
        >
          <button
            onClick={onStart}
            onMouseEnter={() => setStartHover(true)}
            onMouseLeave={() => setStartHover(false)}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              border: startHover 
                ? '1px solid rgba(59, 130, 246, 0.5)' 
                : '1px solid rgba(59, 130, 246, 0.3)',
              background: startHover
                ? 'linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)'
                : 'linear-gradient(180deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.15) 100%)',
              color: startHover ? '#ffffff' : '#60a5fa',
              transition: 'all 0.2s ease',
              boxShadow: startHover
                ? '0 8px 32px rgba(59, 130, 246, 0.4)'
                : '0 4px 16px rgba(0, 0, 0, 0.2)',
              filter: startHover ? 'brightness(1.1)' : 'brightness(1)',
            }}
          >
            Start Pindex
          </button>
          
          <button
            onClick={onNotNow}
            onMouseEnter={() => setNotNowHover(true)}
            onMouseLeave={() => setNotNowHover(false)}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '10px',
              fontWeight: 500,
              fontSize: '13px',
              cursor: 'pointer',
              border: notNowHover 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              background: notNowHover
                ? 'rgba(255, 255, 255, 0.05)'
                : 'transparent',
              color: '#94a3b8',
              transition: 'all 0.2s ease',
            }}
          >
            Not now
          </button>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.04)',
        background: 'rgba(0, 0, 0, 0.2)',
      }}>
        <span style={{ fontSize: '9px', color: '#334155', fontWeight: 500 }}>
          ESC to close
        </span>
        <span style={{ fontSize: '9px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', color: '#475569' }}>
          pindex
        </span>
      </div>
    </div>
  );
}

