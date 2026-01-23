'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDiverseMarkets, type Market } from "../data/markets";

export function BetsList() {
  const [bets, setBets] = useState<Market[]>([]);

  useEffect(() => {
    // Get 5 diverse markets on component mount
    const markets = getDiverseMarkets(5);
    setBets(markets);

    // Rotate markets every 10 seconds
    const interval = setInterval(() => {
      const newMarkets = getDiverseMarkets(5);
      setBets(newMarkets);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a2332]/90 rounded-xl p-4 md:p-5 w-full h-full border border-white/10">
      <h3 className="text-white font-semibold text-sm md:text-base mb-4">Latest Polymarket Bets</h3>

      <div className="flex flex-col gap-4">
        {bets.map((bet, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-10 h-10 ${bet.iconBg} rounded-xl flex items-center justify-center text-lg flex-shrink-0`}>
              {bet.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{bet.question}</div>
              <div className="text-xs text-gray-500">{bet.category}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-sm font-medium ${bet.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                {bet.value}
              </div>
              <div className="text-[10px] text-gray-500 flex items-center justify-end gap-1">
                <Image
                  src="/polylogo.png"
                  alt="Poly Index"
                  width={12}
                  height={12}
                  sizes="12px"
                  className="w-3 h-3 object-contain"
                />
                Pindex
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
