import { motion } from 'framer-motion';

interface MascotLoaderProps {
  size?: number;
}

export function MascotLoader({ size = 120 }: MascotLoaderProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
    }}>
      {/* Mascot Container */}
      <motion.div
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: 'relative',
          width: size,
          height: size + 40,
        }}
      >
        {/* Left Arm */}
        <motion.div
          animate={{
            rotate: [30, -30, 30],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            left: -8,
            top: size * 0.35,
            width: 20,
            height: 8,
            background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
            borderRadius: '4px',
            transformOrigin: 'right center',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
          }}
        >
          {/* Left Hand */}
          <div style={{
            position: 'absolute',
            left: -6,
            top: -2,
            width: 12,
            height: 12,
            background: '#60a5fa',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.5)',
          }} />
        </motion.div>

        {/* Right Arm */}
        <motion.div
          animate={{
            rotate: [-30, 30, -30],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            right: -8,
            top: size * 0.35,
            width: 20,
            height: 8,
            background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
            borderRadius: '4px',
            transformOrigin: 'left center',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.4)',
          }}
        >
          {/* Right Hand */}
          <div style={{
            position: 'absolute',
            right: -6,
            top: -2,
            width: 12,
            height: 12,
            background: '#60a5fa',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.5)',
          }} />
        </motion.div>

        {/* Left Leg */}
        <motion.div
          animate={{
            rotate: [-20, 20, -20],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            left: size * 0.25,
            bottom: 0,
            width: 10,
            height: 28,
            background: 'linear-gradient(180deg, #2563eb, #1d4ed8)',
            borderRadius: '5px',
            transformOrigin: 'top center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
          }}
        >
          {/* Left Foot */}
          <div style={{
            position: 'absolute',
            bottom: -4,
            left: -3,
            width: 16,
            height: 8,
            background: '#2563eb',
            borderRadius: '4px 4px 8px 8px',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.5)',
          }} />
        </motion.div>

        {/* Right Leg */}
        <motion.div
          animate={{
            rotate: [20, -20, 20],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: 'absolute',
            right: size * 0.25,
            bottom: 0,
            width: 10,
            height: 28,
            background: 'linear-gradient(180deg, #2563eb, #1d4ed8)',
            borderRadius: '5px',
            transformOrigin: 'top center',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)',
          }}
        >
          {/* Right Foot */}
          <div style={{
            position: 'absolute',
            bottom: -4,
            right: -3,
            width: 16,
            height: 8,
            background: '#2563eb',
            borderRadius: '4px 4px 8px 8px',
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.5)',
          }} />
        </motion.div>

        {/* Logo Body */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: size,
            height: size,
            filter: 'drop-shadow(0 4px 12px rgba(59, 130, 246, 0.4))',
          }}
        >
          <svg
            viewBox="0 0 994 900"
            width={size}
            height={size}
            style={{ display: 'block' }}
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="logoGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <g transform="translate(0, 900) scale(0.1, -0.1)">
              {/* Main shape */}
              <path
                fill="url(#logoGradient)"
                d="M0 4500 l0 -4500 4970 0 4970 0 0 4500 0 4500 -4970 0 -4970 0 0 -4500z m8010 -125 l0 -2635 -3040 0 -3040 0 0 1369 c0 1487 -4 1375 51 1406 10 5 108 69 218 140 202 131 484 313 913 590 128 82 281 181 340 220 141 93 273 178 375 242 97 61 66 65 291 -40 86 -41 180 -84 207 -97 28 -12 165 -75 305 -140 140 -64 287 -132 326 -149 l71 -33 124 75 c68 40 237 140 374 222 138 81 277 165 310 185 33 20 139 83 235 140 96 56 342 202 545 323 469 279 600 356 755 447 250 147 397 234 505 300 61 38 116 68 123 69 9 1 12 -532 12 -2634z"
              />
              {/* Decorative paths */}
              <path
                fill="url(#logoGradientDark)"
                d="M7570 6375 c-47 -28 -209 -125 -360 -215 -151 -89 -286 -170 -300 -180 -14 -9 -83 -51 -155 -92 -71 -42 -175 -102 -230 -135 -55 -33 -224 -134 -375 -224 -151 -89 -315 -187 -365 -217 -49 -29 -97 -58 -105 -63 -67 -39 -303 -179 -430 -254 -229 -135 -184 -132 -411 -27 -318 147 -438 201 -565 257 -67 29 -149 67 -182 84 -34 17 -85 40 -112 51 l-51 20 -177 -116 c-206 -135 -260 -170 -477 -309 -289 -187 -368 -237 -585 -380 -118 -77 -263 -172 -322 -209 l-108 -68 0 -349 c0 -240 3 -349 11 -349 5 0 61 30 122 67 62 36 155 89 207 118 52 28 136 75 185 104 114 67 818 472 905 521 36 20 144 81 240 135 96 54 227 127 290 162 l114 62 56 -31 c64 -36 324 -179 425 -233 67 -37 103 -56 300 -160 50 -26 94 -51 100 -56 16 -15 31 -10 91 30 33 21 156 100 274 176 118 76 251 161 295 190 328 214 658 428 905 587 187 121 587 381 670 438 47 31 118 76 158 99 l72 43 0 289 c0 225 -3 289 -12 288 -7 0 -51 -25 -98 -54z"
              />
              <path
                fill="#fff"
                opacity="0.3"
                d="M7493 5338 c-95 -62 -228 -149 -295 -192 -68 -44 -200 -130 -293 -191 -94 -61 -215 -140 -270 -175 -55 -34 -149 -95 -210 -135 -163 -107 -730 -472 -805 -518 -91 -56 -311 -206 -334 -228 -22 -20 -12 -24 -266 116 -105 58 -353 191 -500 268 -52 27 -114 60 -137 73 -23 13 -48 24 -56 24 -14 0 -570 -311 -591 -330 -11 -11 27 -30 249 -125 99 -42 198 -85 220 -95 22 -10 101 -43 175 -74 74 -31 149 -63 165 -71 52 -25 239 -106 265 -115 14 -4 56 -22 93 -39 l69 -31 65 30 c35 17 67 30 69 30 5 0 78 32 264 116 41 18 221 96 400 173 304 130 505 218 895 389 88 38 246 107 350 152 212 91 494 214 540 235 17 7 51 23 78 34 l47 20 0 386 c0 212 -3 385 -8 385 -4 0 -85 -51 -179 -112z"
              />
            </g>
            {/* Eyes */}
            <ellipse cx="350" cy="420" rx="28" ry="32" fill="#1e293b" />
            <ellipse cx="530" cy="420" rx="28" ry="32" fill="#1e293b" />
            {/* Eye shine */}
            <ellipse cx="358" cy="410" rx="10" ry="12" fill="#fff" opacity="0.8" />
            <ellipse cx="538" cy="410" rx="10" ry="12" fill="#fff" opacity="0.8" />
            {/* Smile */}
            <motion.path
              animate={{
                d: [
                  "M 320 520 Q 440 580 560 520",
                  "M 320 510 Q 440 600 560 510",
                  "M 320 520 Q 440 580 560 520",
                ]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              stroke="#1e293b"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        animate={{
          scale: [1, 0.7, 1],
          opacity: [0.3, 0.15, 0.3],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: size * 0.6,
          height: 12,
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)',
          borderRadius: '50%',
          marginTop: -15,
        }}
      />

      {/* Loading text */}
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#60a5fa',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginTop: 8,
        }}
      >
        Loading...
      </motion.div>
    </div>
  );
}
