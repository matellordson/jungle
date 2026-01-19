"use client";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000";

interface UserDataItem {
  id: number;
  data: any;
  created_at: string;
}

export function UserData() {
  const [data, setData] = useState<UserDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [newData, setNewData] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/user/data`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await res.json();
      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newData.trim()) return;

    try {
      const res = await fetch(`${API_URL}/user/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ data: { message: newData } }),
      });

      if (!res.ok) {
        throw new Error("Failed to save data");
      }

      setNewData("");
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h3>Your Data</h3>

      {/* Save form */}
      <form onSubmit={handleSave} className="space-y-2">
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter some data..."
        />
        <button type="submit">Save Data</button>
      </form>

      {/* Error display */}
      {error && <p>{error}</p>}

      {/* Data list */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-3">
          {data.length === 0 ? (
            <p>No data yet. Save something!</p>
          ) : (
            data.map((item) => (
              <div key={item.id}>
                <pre>{JSON.stringify(item.data, null, 2)}</pre>
                <p>{new Date(item.created_at).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}

      <button onClick={fetchData}>Refresh</button>
    </div>
  );
}
