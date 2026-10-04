import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Circle,
} from "react-leaflet";

const collectors = [
  {
    id: 1,
    name: "GreenRoute Logistics",
    position: [12.9719, 77.5937],
    distance: "1.8 km",
    rating: "4.9",
    vehicle: "BMW-4821",
    status: "Available",
  },
  {
    id: 2,
    name: "EcoWaste Services",
    position: [12.9784, 77.6012],
    distance: "3.2 km",
    rating: "4.8",
    vehicle: "BMW-3517",
    status: "Available",
  },
  {
    id: 3,
    name: "CleanMed Transport",
    position: [12.9656, 77.5851],
    distance: "4.7 km",
    rating: "4.7",
    vehicle: "BMW-9044",
    status: "Available",
  },
  {
    id: 4,
    name: "BioCare Waste Solutions",
    position: [12.9848, 77.5785],
    distance: "5.4 km",
    rating: "4.8",
    vehicle: "BMW-7128",
    status: "Busy",
  },
];

function CollectorMap() {
  const hospitalPosition = [12.9716, 77.5946];

  return (
    <MapContainer
      center={hospitalPosition}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Hospital */}
      <Marker position={hospitalPosition}>
        <Popup>
          <div className="p-1">
            <strong>CityCare Hospital</strong>
            <br />
            Your hospital
          </div>
        </Popup>
      </Marker>

      {/* Search radius */}
      <Circle
        center={hospitalPosition}
        radius={5000}
        pathOptions={{
          color: "#10b981",
          fillColor: "#10b981",
          fillOpacity: 0.08,
        }}
      />

      {/* Collectors */}
      {collectors.map((collector) => (
        <Marker key={collector.id} position={collector.position}>
          <Popup>
            <div className="min-w-[180px] p-1">
              <h3 className="font-semibold">{collector.name}</h3>

              <p className="mt-1 text-sm">
                {collector.distance} away
              </p>

              <p className="mt-1 text-sm">
                ⭐ {collector.rating}
              </p>

              <p className="mt-1 text-sm">
                Vehicle: {collector.vehicle}
              </p>

              <button
                disabled={collector.status !== "Available"}
                className={`mt-3 w-full rounded-lg px-3 py-2 text-sm font-semibold ${
                  collector.status === "Available"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {collector.status === "Available"
                  ? "Request Pickup"
                  : "Currently Busy"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default CollectorMap;