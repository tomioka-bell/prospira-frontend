"use client";
import { useEffect, useMemo, useState } from "react";
import StatCard from "../components/stat-card";
import ChartCard from "../components/chart-card";
import AppsLineChart from "../components/apps-line-chart";
import AppsPieChart from "../components/apps-piechart";
import AppsBarChart from "../components/apps-bar-chart";
import RecentTable from "../components/recent-table";
import { FiUser, FiFileText, FiClipboard, FiBriefcase } from "react-icons/fi";

import type { Summary, JobApplication } from "../types/dashboard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Content() {
  const [summary, setSummary] = useState<Summary>({
    job_applications: 0,
    job_recruitments: 0,
    questionnaires: 0,
    users: 0,
  });

  const [apps, setApps] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /** ─────────────────────────── LOAD DATA ─────────────────────────── */
  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setLoading(true)

        const [sumRes, appsRes] = await Promise.all([
          fetch(`${API_BASE}/api/dashboard/summary`),
          fetch(`${API_BASE}/api/job-application/get-job-applications?limit=50&offset=0`),
        ]);

        if (!sumRes.ok) throw new Error("โหลด summary ไม่สำเร็จ");
        if (!appsRes.ok) throw new Error("โหลด applications ไม่สำเร็จ");

        const sumJson = await sumRes.json();
        const appsJson = await appsRes.json();

        if (!active) return;

        setSummary({
          job_applications: Number(sumJson.summary?.job_applications ?? 0),
          job_recruitments: Number(sumJson.summary?.job_recruitments ?? 0),
          questionnaires: Number(sumJson.summary?.questionnaires ?? 0),
          users: Number(sumJson.summary?.users ?? 0),
        });
        setApps(Array.isArray(appsJson) ? appsJson : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  /** ───── MAP DATA ───── */

  const appsByDay = useMemo(() => {
    const today = new Date();
    const days = [...Array(30)].map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (29 - i));
      return d.toISOString().slice(5, 10);
    });

    const result = days.map((label) => ({
      day: label,
      count: apps.filter((a) => (a.created_at ?? "").slice(5, 10) === label).length,
    }));

    return result;
  }, [apps]);

  const appsByStatus = useMemo(() => {
    const map = new Map<string, number>();
    apps.forEach((a) => {
      const s = (a.status ?? "pending").toLowerCase();
      map.set(s, (map.get(s) || 0) + 1);
    });
    return [...map.entries()].map(([label, value]) => ({ label, value }));
  }, [apps]);

  const appsByPosition = useMemo(() => {
    const map = new Map<string, number>();
    apps.forEach((a) => {
      const p = a.position?.trim() || "ไม่ระบุ";
      map.set(p, (map.get(p) || 0) + 1);
    });
    return [...map.entries()].map(([name, count]) => ({ name, count }));
  }, [apps]);

  /** ─────────────────────────── UI ─────────────────────────── */
  return (
    <div>
      <div className="px-4 pt-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {/* <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Prospira Website
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                ภาพรวมข้อมูลการสมัครงานและระบบ
              </p> */}
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-slate-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600 font-medium">
                  อัปเดตล่าสุด: {new Date().toLocaleString('th-TH', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-xl shadow-lg p-5 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Apply for a Job" 
            value={summary.job_applications} 
            subtitle="ใบสมัครทั้งหมด" 
            icon={FiClipboard}
             waveColor="rgba(59,130,246,0.22)"
          />
          <StatCard 
            title="Recruitments" 
            value={summary.job_recruitments} 
            subtitle="ตำแหน่งที่เปิดรับ" 
            icon={FiBriefcase}
            waveColor="rgba(16,185,129,0.20)"
          />
          <StatCard 
            title="Users" 
            value={summary.users} 
            subtitle="ผู้ใช้งาน" 
            icon={FiUser}
            waveColor="rgba(139,92,246,0.18)"
          />
          <StatCard 
            title="Questionnaires" 
            value={summary.questionnaires} 
            subtitle="แบบสอบถาม" 
            icon={FiFileText}
            waveColor="rgba(239,68,68,0.18)"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <ChartCard title="Applications (30 วันล่าสุด)" loading={loading}>
              <AppsLineChart data={appsByDay} />
            </ChartCard>
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <ChartCard title="สัดส่วนสถานะใบสมัคร" loading={loading}>
              <AppsPieChart data={appsByStatus} />
            </ChartCard>
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <ChartCard title="Applications ตามตำแหน่ง" loading={loading}>
              <AppsBarChart data={appsByPosition} />
            </ChartCard>
          </div>

          <div className="transform transition-all duration-300 hover:scale-[1.01]">
            <ChartCard title="ล่าสุดที่สมัคร (5 รายการ)" loading={loading}>
              <RecentTable apps={apps.slice(0, 5)} />
            </ChartCard>
          </div>
        </div>
      </div>
    </div>
  );
}