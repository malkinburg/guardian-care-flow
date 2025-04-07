
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { formatDate } from "@/lib/date-utils";
import { FileText, Send, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the structure for invoice items
interface InvoiceItem {
  id: string;
  date: string;
  description: string;
  hours: string;
  rate: number;
  amount: number;
}

// Define the structure for invoice data
interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  clientDetails: {
    name: string;
    ndisNumber?: string;
    phone?: string;
    email?: string;
  };
  workerDetails: {
    name: string;
    abn?: string;
    phone?: string;
  };
  items: InvoiceItem[];
  bankDetails?: {
    bsb: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
}

// Props for the component
interface InvoiceGeneratorProps {
  timesheetEntries: Array<{
    id: string;
    title: string;
    clientName: string;
    date: string;
    startTime: string;
    endTime: string;
    totalHours: string;
    activities?: string;
    status: string;
  }>;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ timesheetEntries }) => {
  const { toast } = useToast();
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<InvoiceData | null>(null);

  // Function to generate an invoice from timesheet entries
  const generateInvoice = () => {
    if (timesheetEntries.length === 0) {
      toast({
        title: "No timesheet entries",
        description: "Please add timesheet entries before generating an invoice.",
        variant: "destructive"
      });
      return;
    }

    // Sort entries by date
    const sortedEntries = [...timesheetEntries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Get the client name from the first entry
    const clientName = sortedEntries[0].clientName;
    
    // Generate invoice items from timesheet entries
    const invoiceItems: InvoiceItem[] = sortedEntries.map(entry => {
      // Extract numeric hours value from the totalHours string
      const hoursValue = parseFloat(entry.totalHours.replace(/[^0-9.]/g, ''));
      
      // Default hourly rate - in a real app this would come from a database
      const hourlyRate = 80;
      
      return {
        id: entry.id,
        date: entry.date,
        description: `${entry.title} - ${formatDate(entry.date)}`,
        hours: entry.totalHours,
        rate: hourlyRate,
        amount: hoursValue * hourlyRate
      };
    });
    
    // Calculate subtotal
    const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
    
    // Add transport item if needed
    if (sortedEntries.length > 0) {
      invoiceItems.push({
        id: 'transport-1',
        date: sortedEntries[0].date,
        description: 'Transport fee',
        hours: '',
        rate: 0,
        amount: 50
      });
    }
    
    // Calculate total after adding transport
    const total = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
    
    // Create invoice data
    const invoiceData: InvoiceData = {
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      invoiceDate: format(new Date(), 'yyyy-MM-dd'),
      dueDate: format(new Date(new Date().setDate(new Date().getDate() + 14)), 'yyyy-MM-dd'),
      clientDetails: {
        name: clientName,
        ndisNumber: 'NDIS-12345678',
        phone: '0412 345 678',
        email: `${clientName.toLowerCase().replace(/\s/g, '')}@example.com`
      },
      workerDetails: {
        name: 'Terver Akaaga', // This would come from the user profile in a real app
        abn: '35136969443',
        phone: '0405604555'
      },
      items: invoiceItems,
      bankDetails: {
        bsb: '064-000',
        accountNumber: '1422 5289',
        accountName: 'Terver Akaaga',
        bankName: 'Commonwealth Bank'
      }
    };
    
    setCurrentInvoice(invoiceData);
    setIsInvoiceOpen(true);
  };

  const handleSendInvoice = () => {
    toast({
      title: "Invoice sent",
      description: "The invoice has been sent to the client.",
    });
    setIsInvoiceOpen(false);
  };

  const handleDownloadInvoice = () => {
    toast({
      title: "Invoice downloaded",
      description: "The invoice has been downloaded as a PDF.",
    });
  };

  return (
    <>
      <Button
        variant="default"
        className="bg-green-600 hover:bg-green-700 text-white"
        onClick={generateInvoice}
      >
        <FileText className="mr-2 h-4 w-4" />
        Generate Invoice
      </Button>
      
      <Dialog open={isInvoiceOpen} onOpenChange={setIsInvoiceOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice</DialogTitle>
            <DialogDescription>
              Review the invoice before sending or downloading
            </DialogDescription>
          </DialogHeader>
          
          {currentInvoice && (
            <div className="invoice-container border border-gray-200 p-6 bg-white">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">{currentInvoice.workerDetails.name}</h1>
                <h2 className="text-2xl tracking-widest mt-2 mb-6">INVOICE</h2>
                <div className="text-left">
                  <p>INVOICE NO: {currentInvoice.invoiceNumber}</p>
                  <p>DATE: {formatDate(currentInvoice.invoiceDate)}</p>
                </div>
              </div>
              
              <div className="client-details mb-6">
                <Card>
                  <CardHeader className="py-2 bg-gray-50">
                    <CardTitle className="text-sm font-medium">BILL TO: {currentInvoice.clientDetails.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableBody>
                        {currentInvoice.clientDetails.ndisNumber && (
                          <TableRow>
                            <TableCell className="py-2">NDIS #:</TableCell>
                            <TableCell className="py-2">{currentInvoice.clientDetails.ndisNumber}</TableCell>
                          </TableRow>
                        )}
                        {currentInvoice.clientDetails.phone && (
                          <TableRow>
                            <TableCell className="py-2">PHONE:</TableCell>
                            <TableCell className="py-2">{currentInvoice.clientDetails.phone}</TableCell>
                          </TableRow>
                        )}
                        {currentInvoice.clientDetails.email && (
                          <TableRow>
                            <TableCell className="py-2">EMAIL:</TableCell>
                            <TableCell className="py-2">{currentInvoice.clientDetails.email}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div className="worker-details mb-6">
                <Card>
                  <CardHeader className="py-2 bg-gray-50">
                    <CardTitle className="text-sm font-medium">FROM: {currentInvoice.workerDetails.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableBody>
                        {currentInvoice.workerDetails.abn && (
                          <TableRow>
                            <TableCell className="py-2">A.B.N No:</TableCell>
                            <TableCell className="py-2">{currentInvoice.workerDetails.abn}</TableCell>
                          </TableRow>
                        )}
                        <TableRow>
                          <TableCell className="py-2">Phone:</TableCell>
                          <TableCell className="py-2">{currentInvoice.workerDetails.phone}</TableCell>
                          <TableCell className="py-2">Contact Name:</TableCell>
                          <TableCell className="py-2">{currentInvoice.workerDetails.name}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              
              <div className="invoice-items mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">QTY</TableHead>
                      <TableHead className="w-[300px]">DESCRIPTION</TableHead>
                      <TableHead className="text-center" colSpan={2}>
                        UNIT PRICE
                        <div className="grid grid-cols-2">
                          <div className="text-center">PRICE</div>
                          <div className="text-center">GST</div>
                        </div>
                      </TableHead>
                      <TableHead className="text-right">AMOUNT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentInvoice.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.hours || '-'}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="text-center">${item.rate}/hr</TableCell>
                        <TableCell className="text-center">-</TableCell>
                        <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-left">
                        {currentInvoice.bankDetails && (
                          <div className="bank-details text-sm mt-4">
                            <p className="font-medium">Comments:</p>
                            <p>BSB: {currentInvoice.bankDetails.bsb}</p>
                            <p>Account No: {currentInvoice.bankDetails.accountNumber}</p>
                            <p>Account Name: {currentInvoice.bankDetails.accountName}</p>
                            <p>Name of Bank: {currentInvoice.bankDetails.bankName}</p>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right font-medium">SUBTOTAL</TableCell>
                      <TableCell className="text-right font-medium">
                        ${currentInvoice.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="text-right font-medium">G.S.T</TableCell>
                      <TableCell className="text-right font-medium">-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}></TableCell>
                      <TableCell className="text-right font-bold">TOTAL</TableCell>
                      <TableCell className="text-right font-bold">
                        ${currentInvoice.items.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handleDownloadInvoice}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={handleSendInvoice}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Invoice
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InvoiceGenerator;
