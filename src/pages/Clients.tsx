
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import ClientCard, { ClientProps } from "@/components/clients/ClientCard";

// Sample data for demonstration
const MOCK_CLIENTS: ClientProps[] = [
  {
    id: "client1",
    name: "John Smith",
    address: "123 Main St, Anytown",
    phone: "(555) 123-4567",
  },
  {
    id: "client2",
    name: "Sarah Johnson",
    address: "456 Oak Ave, Somecity",
    phone: "(555) 987-6543",
  },
  {
    id: "client3",
    name: "Robert Davis",
    address: "789 Pine Rd, Anyville",
    phone: "(555) 456-7890",
  },
  {
    id: "client4",
    name: "Emily Wilson",
    address: "321 Elm St, Somewhere",
    phone: "(555) 321-6548",
  },
];

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<ClientProps[]>(MOCK_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<ClientProps[]>(MOCK_CLIENTS);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Filter clients based on search term
    if (searchTerm) {
      const filtered = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [clients, searchTerm]);

  return (
    <MainLayout title="Clients">
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientCard key={client.id} {...client} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No clients found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Clients;
