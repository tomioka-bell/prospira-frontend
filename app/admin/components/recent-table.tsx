import type { JobApplication } from "../types/dashboard";

export default function RecentTable({ apps }: { apps: JobApplication[] }) {
  const statusColor = (s: string) => {
    switch (s?.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-700 border-green-300";
      case "reject":
      case "rejected":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
    }
  };

  return (
    <div className="overflow-x-auto rounded-s-lg border border-gray-200 shadow-sm">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b text-gray-700">
          <tr>
            <th className="p-3 font-medium">ชื่อ</th>
            <th className="p-3 font-medium">ตำแหน่ง</th>
            <th className="p-3 font-medium">สถานะ</th>
            <th className="p-3 font-medium">วันที่</th>
          </tr>
        </thead>

        <tbody>
          {apps.map((a, i) => (
            <tr
              key={i}
              className="border-b border-cyan-100 hover:bg-gray-50 transition-colors"
            >
              <td className="p-3">{a.full_name}</td>
              <td className="p-3">{a.position || "ไม่ระบุ"}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full border text-xs font-medium ${statusColor(
                    a.status || "pending"
                  )}`}
                >
                  {a.status || "pending"}
                </span>
              </td>

              <td className="p-3">
                {a.created_at
                  ? new Date(a.created_at).toLocaleDateString("th-TH")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
