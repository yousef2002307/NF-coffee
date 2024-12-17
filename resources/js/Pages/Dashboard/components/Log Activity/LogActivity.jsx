import React, { useEffect, useState } from "react";
import { Host } from "../../../Api/Api";

const LogActivity = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await fetch(`${Host}/api/v1/activitylog`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setLogs(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activity logs:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col ml-auto gap-5  bg-[#F3ECE6] px-6 py-4">
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-white">
          
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                User ID
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                Log
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                Date
              </th>
              <th className="py-3 px-4 text-center font-medium text-gray-600">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
               
                <td className="py-3 px-4 text-center text-gray-800">{log.user_id}</td>
                <td className="py-3 px-4 text-center text-gray-800">{log.log}</td>
                <td className="py-3 px-4 text-center text-gray-800">
                  {log.created_at
                    ? new Date(log.created_at).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="py-3 px-4 text-center text-gray-500">
                  {log.created_at
                    ? new Date(log.created_at).toLocaleTimeString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-gray-600 text-sm">Showing {logs.length} logs</p>
       
      </div>
    </div>
  );
};

export default LogActivity;
