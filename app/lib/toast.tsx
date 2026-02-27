/**
 * pToast — PayLink branded toast helper
 *
 * Matches the left-side design from the reference: 
 * full light-colored background, matching colored border, matching colored text/icon, X dismiss.
 */

import { toast } from 'sonner';

// ── Icons and Theme Styles matching the Left Column ──────────────────────────
const themes = {
    success: {
        bg: "bg-[#E6F7F0]",
        border: "border-[#A7DFCA]",
        textDark: "text-[#16A34A]",
        textLight: "text-[#16A34A]/80",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#16A34A" strokeWidth="1.5" />
                <path d="M16 9L10 15L7.5 12.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    warning: {
        bg: "bg-[#FFF4DD]",
        border: "border-[#F3DFB7]",
        textDark: "text-[#B45309]",
        textLight: "text-[#B45309]/80",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="12" y1="9" x2="12" y2="13" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1" fill="#B45309" />
            </svg>
        )
    },
    info: {
        bg: "bg-[#E0E7FF]",
        border: "border-[#B0C3FE]",
        textDark: "text-[#1D4ED8]",
        textLight: "text-[#1D4ED8]/80",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#1D4ED8" strokeWidth="1.5" />
                <path d="M12 11V17" stroke="#1D4ED8" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="7.5" r="1" fill="#1D4ED8" />
            </svg>
        )
    },
    error: {
        bg: "bg-[#FFE4E6]",
        border: "border-[#FECDD3]",
        textDark: "text-[#BE123C]",
        textLight: "text-[#BE123C]/80",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#BE123C" strokeWidth="1.5" />
                <path d="M12 8V13" stroke="#BE123C" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="16.5" r="1" fill="#BE123C" />
            </svg>
        )
    }
};

type ToastType = 'success' | 'warning' | 'info' | 'error';

function makeToast(type: ToastType, title: string, description?: string) {
    const t = themes[type];

    toast.custom(
        (id) => (
            <div className={`flex items-start sm:items-center gap-3.5 ${t.bg} border ${t.border} rounded-2xl px-5 py-3.5 w-full max-w-[360px] shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] pointer-events-auto`} style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}>
                <div className="shrink-0 mt-0.5 sm:mt-0">
                    {t.icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className={`text-[15px] font-bold ${t.textDark} leading-snug`}>{title}</p>
                    {description && <p className={`text-[13px] font-medium ${t.textLight} mt-0.5 leading-snug`}>{description}</p>}
                </div>
                <button
                    onClick={() => toast.dismiss(id)}
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${t.textDark} opacity-60 hover:opacity-100 hover:bg-black/5 transition-colors mt-0.5 sm:mt-0 -mr-1`}
                >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
        ),
        { duration: 4000, position: 'top-center' }
    );
}

export const pToast = {
    success: (title: string, description?: string) => makeToast('success', title, description),
    warning: (title: string, description?: string) => makeToast('warning', title, description),
    info: (title: string, description?: string) => makeToast('info', title, description),
    error: (title: string, description?: string) => makeToast('error', title, description),
};
