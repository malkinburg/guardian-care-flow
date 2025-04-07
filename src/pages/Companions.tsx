
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Smartphone } from "lucide-react";

const Companions = () => {
  // Mock data for companion cards
  const companionCards = [
    {
      id: "1",
      name: "Sarah Johnson",
      cardType: "digital",
      cardNumber: "**** **** **** 4532",
      expiryDate: "05/27"
    },
    {
      id: "2",
      name: "Michael Brown",
      cardType: "digital",
      cardNumber: "**** **** **** 6721",
      expiryDate: "08/26"
    },
    {
      id: "3",
      name: "Lisa Chen",
      cardType: "physical",
      cardNumber: "**** **** **** 3389",
      expiryDate: "11/25"
    },
    {
      id: "4",
      name: "David Thompson",
      cardType: "physical",
      cardNumber: "**** **** **** 2210",
      expiryDate: "03/26"
    }
  ];

  return (
    <MainLayout title="Companion Cards">
      <div className="p-4">
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Companion Card Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90">
                Manage digital and physical companion cards for your participants.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <Smartphone className="h-5 w-5 mr-2 text-indigo-500" />
              Digital Cards
            </h2>
            {companionCards
              .filter(card => card.cardType === "digital")
              .map(card => (
                <Card key={card.id} className="mb-3 hover:shadow-md transition-all">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{card.name}</h3>
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded-full">Digital</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{card.cardNumber}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-500">Expiry: {card.expiryDate}</span>
                      <button className="text-indigo-500 font-medium">Manage</button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
          
          <div>
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-indigo-500" />
              Physical Cards
            </h2>
            {companionCards
              .filter(card => card.cardType === "physical")
              .map(card => (
                <Card key={card.id} className="mb-3 hover:shadow-md transition-all">
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{card.name}</h3>
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Physical</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{card.cardNumber}</p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-500">Expiry: {card.expiryDate}</span>
                      <button className="text-indigo-500 font-medium">Manage</button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Companions;
