import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { bookingServices } from "../services/bookingServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Card, Button } from "flowbite-react";

export default function Bookings() {
  const navigate = useNavigate();
  const [data, setData] = useState<any[]>([]);

  const load = async () => {
    const res = await bookingServices.getAll();
    setData(res.data.data);
  };
  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await bookingServices.updateStatus(id, status);
    load();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-7xl">
        <h2 className="text-2xl font-bold text-center mb-6">Booking Status</h2>

        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Action</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((b) => (
              <TableRow key={b.id}>
                <TableCell>{b.borrowerName}</TableCell>
                <TableCell>{b.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="xs"
                    type="button"
                    color="blue"
                    className="bg-green-500! hover:bg-green-400 text-black"
                    onClick={() => updateStatus(b.id, "Approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    size="xs"
                    type="button"
                    color="failure"
                    className="bg-red-500! hover:bg-red-400 text-white"
                    onClick={() => updateStatus(b.id, "Rejected")}
                  >
                    Reject
                  </Button>
                  <Button
                    size="xs"
                    type="button"
                    color="info"
                    className="bg-blue-600! hover:bg-blue-500 text-white"
                    onClick={() => navigate(`/booking-history/${b.id}`)}
                  >
                    History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
