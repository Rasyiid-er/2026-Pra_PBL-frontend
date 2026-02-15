import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Badge, Button } from "flowbite-react";
import { bookingServices } from "../services/bookingServices";
import type { Booking, BookingStatusHistory } from "../types/model";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export default function BookingHistory() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [histories, setHistories] = useState<BookingStatusHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const bookingId = parseInt(id!);
      const [bookingRes, historyRes] = await Promise.all([
        bookingServices.getById(bookingId),
        bookingServices.getHistory(bookingId),
      ]);
      setBooking(bookingRes.data);
      setHistories(historyRes.data || []);
    } catch (err) {
      console.error("Failed to load booking history:", err);
      setError("Failed to load booking history");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "failure";
      case "Pending":
        return "warning";
      default:
        return "gray";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-4xl">
          <div className="text-center py-8 text-gray-500">Loading...</div>
        </Card>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-4xl">
          <div className="text-center py-8 text-red-500">
            {error || "Booking not found"}
          </div>
          <Button
            size="sm"
            color="blue"
            className="bg-blue-500 hover:bg-blue-400 text-white mx-auto"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Booking History</h1>
          <Button
            size="sm"
            color="blue"
            className="bg-blue-500 hover:bg-blue-400 text-white"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        {/* Booking Details Card */}
        <Card>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="text-lg font-semibold">{booking.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Borrower Name</p>
              <p className="text-lg font-semibold">{booking.borrowerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Room ID</p>
              <p className="text-lg font-semibold">{booking.roomId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Status</p>
              <Badge color={getStatusColor(booking.status)}>
                {booking.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-gray-600">Start Time</p>
              <p className="text-lg font-semibold">
                {new Date(booking.startTime).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">End Time</p>
              <p className="text-lg font-semibold">
                {new Date(booking.endTime).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Status History Table */}
        <Card>
          <h2 className="text-2xl font-bold mb-4">Status Change History</h2>
          {histories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No status changes recorded
            </div>
          ) : (
            <Table>
              <TableHead>
                <TableHeadCell>#</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell>Changed At</TableHeadCell>
              </TableHead>
              <TableBody className="divide-y">
                {histories.map((h, index) => (
                  <TableRow
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={h.id}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Badge color={getStatusColor(h.status)}>{h.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(h.changedAt).toLocaleString("id-ID", {})}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
}
