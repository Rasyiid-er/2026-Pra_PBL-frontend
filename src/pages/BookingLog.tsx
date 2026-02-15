import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Card,
} from "flowbite-react";
import { bookingServices } from "../services/bookingServices";
import type { BookingLog } from "../types/model";

export default function BookingLog() {
  const [logs, setLogs] = useState<BookingLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setIsLoading(true);
    try {
      const res = await bookingServices.getLog();
      setLogs(res.data || []);
    } catch (error) {
      console.error("Failed to load booking logs:", error);
      setLogs([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Booking Log</h2>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No booking logs available
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table striped>
                <TableHead>
                  <TableHeadCell>Borrower Name</TableHeadCell>
                  <TableHeadCell>Room</TableHeadCell>
                  <TableHeadCell>Start Time</TableHeadCell>
                  <TableHeadCell>End Time</TableHeadCell>
                  <TableHeadCell>Created At</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                </TableHead>
                <TableBody className="divide-y">
                  {logs.map((log) => (
                    <TableRow
                      key={log.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {log.borrowerName}
                      </TableCell>
                      <TableCell>{log.roomName}</TableCell>
                      <TableCell>
                        {new Date(log.startTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(log.endTime).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          log.createdAt.endsWith("Z")
                            ? log.createdAt
                            : log.createdAt + "Z",
                        ).toLocaleString("id-ID", {
                          timeZone: "Asia/Jakarta",
                        })}
                      </TableCell>
                      <TableCell>{log.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
