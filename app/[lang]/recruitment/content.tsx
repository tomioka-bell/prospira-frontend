"use client";
import { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Divider, Badge, Spin, Drawer, Grid } from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  FireOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import Header from './header';
import Footer from './footer';
import type { Job } from '../types/job';
import JobApplyButton from './job-apply-button';
const { CheckableTag } = Tag;
import RecruitmentHeader from './recruitment';


export default function JobRecruitment() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selectedLocation] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false)

  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;


  const departments = useMemo(() => Array.from(new Set(jobs.map((j) => j.department))), [jobs]);
  const types = useMemo(() => Array.from(new Set(jobs.map((j) => j.type))), [jobs]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJobs() {
      setLoading(true);
      setError(null);
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
        const resp = await axios.get(
          `${apiBaseUrl}/api/job-recruitment/get-job-recruitments`,
          {
            params: { limit: 100, offset: 0 },
            signal: controller.signal,
          }
        );

        const apiData = resp.data as Job[];
        setJobs(apiData);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled');
        } else {
          console.error(err);
          const errorMessage = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดขณะดึงข้อมูล';
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
    return () => {
      controller.abort();
    };
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (selectedDept && job.department !== selectedDept) return false;
      if (selectedType && job.type !== selectedType) return false;
      if (query) {
        const q = query.trim().toLowerCase();
        const inText = `${job.title} ${job.description} ${job.requirements.join(' ')}`.toLowerCase();
        if (!inText.includes(q)) return false;
      }
      return true;
    });
  }, [jobs, selectedDept, selectedLocation, selectedType, query]);

  const resetFilters = () => {
    setSelectedDept(null);
    setSelectedType(null);
    setQuery('');
  };

  useEffect(() => {
    if (!isMobile) {
      if (filteredJobs.length > 0 && !selectedJob) {
        setSelectedJob(filteredJobs[0]);
      } else if (
        filteredJobs.length > 0 &&
        !filteredJobs.find(j => j.job_recruitment_id === selectedJob?.job_recruitment_id)
      ) {
        setSelectedJob(filteredJobs[0]);
      } else if (filteredJobs.length === 0) {
        setSelectedJob(null);
      }
    }
  }, [filteredJobs, isMobile]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    if (isMobile) {
      setMobileOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <RecruitmentHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-0 py-6">
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex-1 overflow-x-auto sm:overflow-visible">
            <div className="flex flex-wrap sm:flex-nowrap gap-2 items-center py-1">
              {departments.map((d) => (
                <CheckableTag
                  key={d}
                  checked={selectedDept === d}
                  onChange={(checked) => setSelectedDept(checked ? d : null)}
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${selectedDept === d ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
                    }`}
                >
                  {d}
                </CheckableTag>
              ))}

              {types.map((t) => (
                <CheckableTag
                  key={t}
                  checked={selectedType === t}
                  onChange={(checked) => setSelectedType(checked ? t : null)}
                  className={`cursor-pointer whitespace-nowrap border border-gray-300 rounded-md px-3 py-1 hover:bg-[#08a4b8]/10 ${selectedType === t ? 'bg-[#08a4b8] rounded-full text-white border-[#08a4b8]' : ''
                    }`}
                >
                  {t}
                </CheckableTag>
              ))}

              <button
              aria-label="ล้างค้นหา"
                onClick={resetFilters}
                style={{ fontSize: '14px' }}
                className="ml-auto sm:ml-2 flex items-center gap-1 px-3 py-0.5 text-sm font-medium text-[#08a4b8] border border-[#08a4b8] rounded-md hover:bg-[#08a4b8] hover:text-white transition-all duration-200"
              >
                <ClearOutlined style={{ fontSize: '14px' }} /> ล้าง
              </button>
            </div>

            <div className="w-full md:w-1/2 mt-4">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="ค้นหาตำแหน่งหรือคุณสมบัติ..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full px-5 py-3.5 pl-12 pr-12 bg-linear-to-r from-white to-gray-50 backdrop-blur-sm border border-gray-300 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#08a4b8] focus:ring-4 focus:ring-[#08a4b8]/20 focus:shadow-xl transition-all shadow-lg"
                />

                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#08a4b8] group-focus-within:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>

                {query && (
                  <button
                  aria-label="ล้างค้นหา"
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge count={filteredJobs.filter((j) => j.hot).length} offset={[-4, 0]}>
              <div className="relative px-4 py-2 bg-linear-to-r from-[#08a4b8] to-[#0bc9e0] rounded-xl shadow-xl text-sm font-bold text-white border-2 border-[#08a4b8]/30 hover:scale-105 transition-transform overflow-hidden">
                <div className="relative z-10 flex items-center gap-2">
                  ตำแหน่งด่วน
                </div>
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                <div className="absolute -inset-1 bg-linear-to-r from-[#08a4b8] to-[#0bc9e0] blur opacity-30"></div>
              </div>
            </Badge>
            <div className="px-3 py-1.5 bg-gray-900 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg text-sm font-medium text-white">
              รวม {filteredJobs.length} ตำแหน่ง
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-0  py-4">
        {loading && (
          <div className="text-center py-10">
            <Spin size="large" />
            <p className="text-gray-600 mt-4">กำลังดึงข้อมูลตำแหน่งงาน...</p>
          </div>
        )}


        {error && (
          <div className="text-center py-10 text-gray-600 text-lg font-medium">
            ยังไม่เปิดรับสมัครงานในขณะนี้
          </div>
        )}

        {/* ================ เมนูตำแหน่งงาน ================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* ซ้าย: รายการงาน */}
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <div
                key={job.job_recruitment_id}
                onClick={() => handleJobClick(job)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${selectedJob?.job_recruitment_id === job.job_recruitment_id
                  ? 'bg-[#08a4b8]/10 border-[#08a4b8]'
                  : 'bg-white hover:shadow-lg border-gray-200'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  {job.hot && (
                    <Tag color="volcano" icon={<FireOutlined />}>
                      ด่วน
                    </Tag>
                  )}
                </div>
                <p className="text-[#08a4b8] font-medium">{job.department}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-[#08a4b8]/10 to-cyan-100/10 border border-[#08a4b8]/30 rounded-lg hover:border-[#08a4b8]/60 transition-all duration-200 group">
                    <EnvironmentOutlined className="text-[#08a4b8] group-hover:scale-110 transition-transform" />
                    <span style={{fontSize: "12px"}} className="text-sm font-medium text-gray-700">{job.location}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-amber-50/50 to-orange-50/50 border border-amber-200/50 rounded-lg hover:border-amber-300 transition-all duration-200 group">
                    <ClockCircleOutlined className="text-amber-600 group-hover:scale-110 transition-transform" />
                    <span style={{fontSize: "12px"}} className="text-sm font-medium text-gray-700">{job.type}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-linear-to-r from-emerald-50/50 to-green-50/50 border border-emerald-200/50 rounded-lg hover:border-emerald-300 transition-all duration-200 group">
                    <DollarOutlined className="text-emerald-600 group-hover:scale-110 transition-transform" />
                    <span style={{fontSize: "12px"}} className="text-sm font-medium text-gray-700">{job.salary}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ขวา: รายละเอียด (แสดงเฉพาะเดสก์ท็อป) */}
          <div className="hidden md:block bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex-col h-full">
            {selectedJob ? (
              <>
                {/* Header Section */}
                <div className="bg-linear-to-r from-[#08a4b8]/80 to-cyan-600/80 px-8 py-6">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                    {selectedJob.title}
                  </h2>
                </div>

                {/* Content Section - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  {/* Description */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">รายละเอียดงาน</h3>
                        <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">คุณสมบัติที่ต้องการ</h3>
                    </div>

                    <ul className="space-y-3">
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                          <div className="w-6 h-6 bg-linear-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                            <span className="text-white text-xs font-bold">{i + 1}</span>
                          </div>
                          <span className="text-gray-700 leading-relaxed flex-1">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Section - Fixed at Bottom */}
                <div className="border-t border-gray-200 bg-white px-8 py-6 flex justify-center">
                  <JobApplyButton job={selectedJob} />
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
                <div className="w-24 h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">เลือกตำแหน่งงาน</h3>
                <p className="text-gray-500 max-w-xs">
                  เลือกตำแหน่งงานทางซ้ายเพื่อดูรายละเอียดและสมัครงาน
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drawer สำหรับมือถือ */}
        <Drawer
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          title={selectedJob?.title ?? 'รายละเอียดงาน'}
          placement="bottom"
          size="large"
          destroyOnClose
          styles={{ body: { padding: 16 } }}
          className="rounded-4xl"
        >
          {selectedJob ? (
            <>
              <div className="mb-4 text-[#08a4b8] font-medium">{selectedJob.department}</div>
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-[#08a4b8]/10 to-cyan-100/10 border border-[#08a4b8]/30 rounded-lg hover:border-[#08a4b8]/60 transition-all duration-200 group">
                  <EnvironmentOutlined className="text-[#08a4b8] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700">{selectedJob.location}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-amber-50/50 to-orange-50/50 border border-amber-200/50 rounded-lg hover:border-amber-300 transition-all duration-200 group">
                  <ClockCircleOutlined className="text-amber-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700">{selectedJob.type}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-emerald-50/50 to-green-50/50 border border-emerald-200/50 rounded-lg hover:border-emerald-300 transition-all duration-200 group">
                  <DollarOutlined className="text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium text-gray-700">{selectedJob.salary}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#08a4b8] mb-2">รายละเอียดงาน</h3>
              <p className="text-gray-800 mb-4">{selectedJob.description}</p>

              <Divider />

              <h3 className="text-lg font-semibold text-[#08a4b8] mb-2">คุณสมบัติ</h3>
              <ul className="list-decimal pl-6 space-y-2 text-gray-700">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>

              <div className="mt-6">
                <JobApplyButton job={selectedJob} />
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-10">ไม่พบรายละเอียด</div>
          )}
        </Drawer>
        {/* ========================================================== */}
      </div>

      <Footer />
    </div>
  );
}
