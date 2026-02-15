import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Card, Label, TextInput, Select, Button } from "flowbite-react";
import { bookingServices } from "../services/bookingServices";
import { roomServices } from "../services/roomServices";
import type { Room } from "../types/model";

export default function CreateBooking() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [borrowerName, setBorrowerName] = useState("");
  const [roomId, setRoomId] = useState<number>(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    const res = await roomServices.getAll();
    setRooms(res.data);
  };

  const handleSubmit = async () => {
    if (!borrowerName || !roomId || !startTime || !endTime) {
      alert("Lengkapi semua field!");
      return;
    }

    await bookingServices.create({
      borrowerName,
      roomId,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
    });

    alert("Booking berhasil dibuat!");
    navigate("/bookings");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Booking</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {/* Borrower */}
          <div className="space-y-2">
            <Label htmlFor="borrowerName" className="block text-base">
              Borrower Name
            </Label>
            <TextInput
              id="borrowerName"
              placeholder="Masukkan nama"
              value={borrowerName}
              onChange={(e) => setBorrowerName(e.target.value)}
              required
            />
          </div>
          {/* Room */}
          <div className="space-y-2">
            <Label htmlFor="room" className="block text-base">
              Room
            </Label>
            <Select
              id="room"
              value={roomId}
              onChange={(e) => setRoomId(Number(e.target.value))}
              required
            >
              <option value={0}>-- pilih room --</option>
              {rooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} - {r.location}
                </option>
              ))}
            </Select>
          </div>
          {/* Start */}
          <div className="space-y-2">
            <Label htmlFor="startTime" className="block text-base">
              Start Time
            </Label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>
          {/* End */}
          <div className="space-y-2">
            <Label htmlFor="endTime" className="block text-base">
              End Time
            </Label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={startTime}
              className="w-full px-4 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500! hover:bg-blue-400 text-black"
            color="blue"
          >
            Create Booking
          </Button>
        </form>
      </Card>
    </div>
  );
}
