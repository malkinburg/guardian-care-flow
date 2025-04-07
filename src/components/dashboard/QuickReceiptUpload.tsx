
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const QuickReceiptUpload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // In a real app, you would upload the file to a server here
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      toast({
        title: "Receipt uploaded",
        description: "Your receipt has been uploaded successfully."
      });
    }, 1000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleViewAllReceipts = () => {
    navigate("/timesheets", { state: { activeTab: "expenses" } });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center">
          <FileText className="h-4 w-4 mr-2 text-sky-500" />
          Quick Receipt Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          capture="environment"
        />
        
        {selectedImage ? (
          <div className="space-y-3">
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <img 
                src={selectedImage} 
                alt="Receipt preview" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={triggerFileInput}
                variant="outline"
                className="flex-1 border-sky-200 hover:bg-sky-50"
                disabled={isUploading}
              >
                <Camera className="h-4 w-4 mr-2" />
                New Photo
              </Button>
              <Button
                onClick={handleViewAllReceipts}
                className="flex-1 bg-sky-500 hover:bg-sky-600"
              >
                View All Expenses
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center py-6 bg-gray-50 rounded-md border-2 border-dashed border-gray-300 cursor-pointer" onClick={triggerFileInput}>
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm font-medium mb-1">Upload a receipt</p>
            <p className="text-xs text-gray-500">Take a photo or select a file</p>
          </div>
        )}
        
        <Button
          variant="ghost" 
          size="sm" 
          className="w-full mt-2 text-sky-600 border border-sky-100"
          onClick={handleViewAllReceipts}
        >
          View All Receipts
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickReceiptUpload;
