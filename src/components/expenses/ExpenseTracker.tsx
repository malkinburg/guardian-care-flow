
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, FileImage, Upload, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatDate } from "@/lib/date-utils";
import { Participant } from "@/types/participants";

// Sample participants data for demo purposes
const PARTICIPANTS = [
  { id: "p1", name: "Sarah Johnson" },
  { id: "p2", name: "Michael Brown" },
  { id: "p3", name: "Robert Davis" }
];

// Sample expense data for demo purposes
const SAMPLE_EXPENSES = [
  {
    id: "exp1",
    date: "2025-04-06",
    amount: 24.50,
    description: "Lunch at cafe",
    participantId: "p1",
    participantName: "Sarah Johnson",
    receiptImage: null,
    status: "submitted"
  },
  {
    id: "exp2",
    date: "2025-04-05",
    amount: 36.75,
    description: "Groceries from supermarket",
    participantId: "p1",
    participantName: "Sarah Johnson",
    receiptImage: null,
    status: "approved"
  }
];

const expenseFormSchema = z.object({
  participantId: z.string({
    required_error: "Please select a participant",
  }),
  amount: z.coerce.number().positive("Amount must be positive"),
  date: z.string(),
  description: z.string().min(2, "Description is required"),
});

type ExpenseFormValues = z.infer<typeof expenseFormSchema>;

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [viewReceiptDialog, setViewReceiptDialog] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseFormSchema),
    defaultValues: {
      participantId: "",
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      description: "",
    },
  });

  const handleOpenCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      
      setCameraStream(stream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
      });
    }
  };

  const handleCloseCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setShowCamera(false);
  };

  const handleTakePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageDataUrl);
        handleCloseCamera();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: ExpenseFormValues) => {
    if (!selectedImage) {
      toast({
        variant: "destructive",
        title: "Missing Receipt",
        description: "Please upload or take a photo of the receipt",
      });
      return;
    }

    // Find participant name based on selected ID
    const participant = PARTICIPANTS.find(p => p.id === values.participantId);

    const newExpense = {
      id: `exp${expenses.length + 1}`,
      date: values.date,
      amount: values.amount,
      description: values.description,
      participantId: values.participantId,
      participantName: participant?.name || "Unknown Participant",
      receiptImage: selectedImage,
      status: "submitted"
    };

    setExpenses([newExpense, ...expenses]);
    
    toast({
      title: "Expense Submitted",
      description: "Your expense has been submitted successfully.",
    });
    
    setSelectedImage(null);
    form.reset();
    setIsDialogOpen(false);
  };

  const handleViewReceipt = (receiptImage: string | null) => {
    if (receiptImage) {
      setSelectedReceipt(receiptImage);
      setViewReceiptDialog(true);
    } else {
      toast({
        title: "No Receipt",
        description: "This expense doesn't have a receipt image attached.",
      });
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Expense Tracker</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Expense Receipt</DialogTitle>
              <DialogDescription>
                Upload or take a photo of the receipt for expense tracking.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="participantId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Participant</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select participant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {PARTICIPANTS.map((participant) => (
                            <SelectItem key={participant.id} value={participant.id}>
                              {participant.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter expense description..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Receipt</FormLabel>
                  <div className="mt-2 flex flex-col space-y-2">
                    {showCamera ? (
                      <div className="relative border rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          className="w-full h-auto aspect-[4/3]"
                          autoPlay
                          playsInline
                        />
                        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                          <Button
                            type="button"
                            variant="default"
                            size="sm"
                            onClick={handleTakePhoto}
                            className="bg-white text-black"
                          >
                            Take Photo
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={handleCloseCamera}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {selectedImage ? (
                          <div className="relative">
                            <img 
                              src={selectedImage} 
                              alt="Receipt" 
                              className="max-h-48 rounded-lg mx-auto"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => setSelectedImage(null)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex justify-center space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleOpenCamera}
                              className="flex items-center gap-2"
                            >
                              <Camera className="h-4 w-4" />
                              Take Photo
                            </Button>
                            <div className="relative">
                              <Button
                                type="button"
                                variant="outline"
                                className="flex items-center gap-2"
                                onClick={() => {
                                  const input = document.getElementById('fileInput');
                                  if (input) input.click();
                                }}
                              >
                                <FileImage className="h-4 w-4" />
                                Upload Image
                              </Button>
                              <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <DialogFooter>
                  <Button 
                    type="button"
                    variant="outline" 
                    onClick={() => {
                      handleCloseCamera();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit Expense</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {expenses.length > 0 ? (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <Card key={expense.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{expense.description}</h3>
                  <p className="text-sm text-gray-500">For {expense.participantName}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm">{formatDate(expense.date)}</p>
                    <p className="font-medium">${expense.amount.toFixed(2)}</p>
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(expense.status)}`}
                    >
                      {expense.status}
                    </span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleViewReceipt(expense.receiptImage)}
                >
                  View Receipt
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 border border-dashed rounded-lg">
          <FileImage className="mx-auto h-12 w-12 text-gray-300 mb-2" />
          <p>No expense receipts uploaded yet</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setIsDialogOpen(true)}
          >
            Upload Your First Receipt
          </Button>
        </div>
      )}

      {/* Receipt Viewer Dialog */}
      <Dialog open={viewReceiptDialog} onOpenChange={setViewReceiptDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt Image</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            {selectedReceipt && (
              <img 
                src={selectedReceipt} 
                alt="Receipt" 
                className="max-w-full max-h-[60vh] rounded-md" 
              />
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setViewReceiptDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExpenseTracker;
