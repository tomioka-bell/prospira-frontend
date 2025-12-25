import type { IconType } from "react-icons";
import { motion } from "framer-motion";

interface StatCardProps {
    title: string;
    value: number | string;
    subtitle?: string;
    icon: IconType;
    waveColor?: string;
}

export default function StatCard({
    title,
    value,
    subtitle = "",
    icon: Icon,
    waveColor,
}: StatCardProps) {
    const isNumber = typeof value === "number";
    const formattedValue = isNumber ? (value as number).toLocaleString() : (value as string);

    return (
        <div className="relative overflow-hidden rounded-lg shadow-sm transition-transform transform hover:-translate-y-0.5 hover:shadow-md border border-slate-200">
            <div className="relative bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{title}</h3>
                    <motion.div
                        initial={{ y: -2 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 120, damping: 12 }}
                        className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100"
                    >
                        <Icon size={18} className="text-slate-700" />
                    </motion.div>
                </div>

                <div className="text-xl font-bold text-slate-800 mb-1">{formattedValue}</div>
                {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}

                {/* bottom underline accent */}
                <div className="mt-3 h-1 w-full rounded-full" style={{ backgroundColor: waveColor}}></div>
            </div>
        </div>
    );
}
