import { useEffect, useState } from "react";
import { Card, Label, TextInput, Button, Pagination } from "flowbite-react";
import { roomServices } from "../services/roomServices";
import type { Room } from "../types/model";

export default function Rooms() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <AddRoomSection />
        <RoomListSection />
      </div>
    </div>
  );
}

// Component for Adding Room
function AddRoomSection() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addRoom = async () => {
    setIsSubmitting(true);
    try {
      await roomServices.create({ name, location });
      setName("");
      setLocation("");
      // Trigger reload of room list through custom event
      window.dispatchEvent(new CustomEvent("roomAdded"));
    } catch (error) {
      console.error("Failed to add room:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <h2 className="text-2xl font-bold mb-4">Add New Room</h2>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          addRoom();
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label htmlFor="roomName" className="block">
              Name
            </Label>
            <TextInput
              id="roomName"
              placeholder="Room name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="roomLocation" className="block">
              Location
            </Label>
            <TextInput
              id="roomLocation"
              placeholder="Room location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>
        <Button
          type="submit"
          color="blue"
          className="bg-blue-500! hover:bg-blue-400 text-black"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Room"}
        </Button>
      </form>
    </Card>
  );
}

// Component for Room List with Search & Pagination (Client-side)
function RoomListSection() {
  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const loadRooms = async () => {
    setIsLoading(true);
    try {
      const res = await roomServices.getAll();
      setAllRooms(res.data || []);
    } catch (error) {
      console.error("Failed to load rooms:", error);
      setAllRooms([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Client-side filtering and pagination
  useEffect(() => {
    let filtered = allRooms;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(search.toLowerCase()) ||
          room.location.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredRooms(filtered);
    setPage(1); // Reset to first page when filter changes
  }, [allRooms, search]);

  // Calculate pagination
  const totalItems = filteredRooms.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const rooms = filteredRooms.slice(startIndex, endIndex);

  // Listen for room added event
  useEffect(() => {
    const handleRoomAdded = () => {
      setPage(1);
      loadRooms();
    };
    window.addEventListener("roomAdded", handleRoomAdded);
    return () => window.removeEventListener("roomAdded", handleRoomAdded);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  const deleteRoom = async (id: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await roomServices.delete(id);
      loadRooms();
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  return (
    <Card className="w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Room List</h2>
          <span className="text-sm text-gray-600">
            {search
              ? `Found: ${totalItems} of ${allRooms.length} rooms`
              : `Total: ${totalItems} room${totalItems !== 1 ? "s" : ""}`}
          </span>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <TextInput
            placeholder="Search by room name or location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1"
          />
          <Button
            type="submit"
            color="blue"
            className="bg-blue-500! hover:bg-blue-400 text-black"
          >
            Search
          </Button>
          {search && (
            <Button
              type="button"
              color="gray"
              onClick={clearSearch}
              className="bg-blue-500! hover:bg-blue-400 text-black"
            >
              Clear
            </Button>
          )}
        </form>

        {/* Room List */}
        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Loading...</div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {search
              ? "No rooms found matching your search."
              : "No rooms available."}
          </div>
        ) : (
          <div className="space-y-2">
            {rooms.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <div className="font-semibold text-lg">{r.name}</div>
                  <div className="text-sm text-gray-600">{r.location}</div>
                </div>
                <Button
                  size="xs"
                  color="failure"
                  className="bg-red-400! hover:bg-red-500 text-black"
                  onClick={() => deleteRoom(r.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              showIcons
            />
            <span className="text-sm text-gray-600">
              Page {page} of {totalPages}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
