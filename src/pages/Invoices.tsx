
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Eye, Plus } from "lucide-react";
import { formatDate } from "@/lib/date-utils";

// Sample invoice data
const SAMPLE_INVOICES = [
  {
    id: "inv1",
    invoiceNumber: "INV-2025-001",
    clientName: "Sarah Johnson",
    date: "2025-04-01",
    amount: 690.00,
    status: "paid"
  },
  {
    id: "inv2",
    invoiceNumber: "INV-2025-002",
    clientName: "John Smith",
    date: "2025-04-03",
    amount: 540.00,
    status: "pending"
  },
  {
    id: "inv3",
    invoiceNumber: "INV-2025-003",
    clientName: "Robert Davis",
    date: "2025-04-05",
    amount: 810.50,
    status: "unpaid"
  }
];

const Invoices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const handleCreateInvoice = () => {
    navigate("/timesheets");
  };

  const handleViewInvoice = (id: string) => {
    // In a real app, this would navigate to a specific invoice detail page
    console.log(`Viewing invoice ${id}`);
  };

  const handleDownloadInvoice = (id: string) => {
    // In a real app, this would trigger a download
    console.log(`Downloading invoice ${id}`);
  };

  // Filter invoices based on active tab
  const filteredInvoices = SAMPLE_INVOICES.filter(invoice => {
    if (activeTab === "all") return true;
    return invoice.status === activeTab;
  });

  return (
    <MainLayout title="Invoices">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button onClick={handleCreateInvoice}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Invoice
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="all">All Invoices</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoices.length > 0 ? (
                      filteredInvoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                          <TableCell>{invoice.clientName}</TableCell>
                          <TableCell>{formatDate(invoice.date)}</TableCell>
                          <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                              invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" onClick={() => handleViewInvoice(invoice.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDownloadInvoice(invoice.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <div className="flex flex-col items-center justify-center">
                            <FileText className="h-12 w-12 text-gray-300 mb-2" />
                            <p className="text-gray-500">No invoices found</p>
                            <Button variant="outline" className="mt-4" onClick={handleCreateInvoice}>
                              Create Your First Invoice
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Invoices;
