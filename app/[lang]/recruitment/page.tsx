import type { Metadata } from 'next';
import JobRecruitmentClient from './recruitment-client';
import type { Job } from '../types/job';

export const metadata: Metadata = {
  title: "Recruitment | PROSPIRA Corporation",
  description: "Join PROSPIRA Corporation's team. Explore career opportunities and job openings at our company.",
};

export default async function RecruitmentPage() {
  let initialJobs: Job[] = [];
  let error: string | null = null;

  const USE_MOCK_DATA = false;    

  if (USE_MOCK_DATA) {

    initialJobs = [];
    error = "Backend API server is not available. Please set up the backend service first.";
  } else {
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
      const url = `${apiBaseUrl}/api/job-recruitment/get-job-recruitments?limit=100&offset=0`;
      
      const resp = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { revalidate: 3600 }, 
      });
      
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}: Failed to fetch jobs`);
      }
      
      const data = await resp.json();
      initialJobs = Array.isArray(data) ? data : (data.data as Job[]) || [];
    } catch (err) {
      console.error('Error fetching jobs on server:', err);
      error = err instanceof Error ? err.message : 'เกิดข้อผิดพลาดขณะดึงข้อมูล';
      // Continue with empty jobs and error message
    }
  }

  return (
    <div>
      <JobRecruitmentClient initialJobs={initialJobs} initialError={error} />
    </div>
  )
}