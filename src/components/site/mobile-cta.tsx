"use client";

import { Phone, MessageCircle, Send } from "lucide-react";
import { clientConfig } from "@/lib/env-client";

export function MobileCTA() {
  const phone = clientConfig.NEXT_PUBLIC_PHONE;
  const zalo = clientConfig.NEXT_PUBLIC_ZALO_URL;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-neutral-200 bg-white lg:hidden">
      <a
        href={`tel:${phone}`}
        className="flex flex-col items-center gap-1 py-3 text-xs font-medium uppercase tracking-wider text-navy-900"
      >
        <Phone size={20} />
        Gọi
      </a>
      <a
        href={zalo || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 border-x border-neutral-200 py-3 text-xs font-medium uppercase tracking-wider text-navy-900"
      >
        <MessageCircle size={20} />
        Zalo
      </a>
      <a
        href="/lien-he"
        className="flex flex-col items-center gap-1 py-3 text-xs font-medium uppercase tracking-wider text-navy-900"
      >
        <Send size={20} />
        Tư vấn
      </a>
    </div>
  );
}