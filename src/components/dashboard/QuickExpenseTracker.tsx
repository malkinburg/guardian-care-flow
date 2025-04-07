
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Receipt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/date-utils";

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

interface QuickExpenseTrackerProps {
  limit?: number;
}

const QuickExpenseTracker = ({ limit = 2 }: QuickExpenseTrackerProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading expenses data
    setTimeout(() => {
      setRecentExpenses(SAMPLE_EXPENSES.slice(0, limit));
      setIsLoading(false);
    }, 500);
  }, [limit]);

  const handleViewAllExpenses = () => {
    navigate("/timesheets", { state: { activeTab: "expenses" } });
  };

  const handleAddNewExpense = () => {
    navigate("/timesheets", { state: { activeTab: "expenses", action: "add" } });
  };

  return (
    <Card className="mb-6 cursor-pointer hover:shadow-md transition-shadow" onClick={handleViewAllExpenses}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <div className="flex items-center">
            <Receipt className="h-4 w-4 mr-2 text-sky-500" />
            Expenses
          </div>
          <ChevronRight className="h-4 w-4 text-gray-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-500">
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : recentExpenses.length > 0 ? (
            `${recentExpenses.length} recent expenses`
          ) : (
            "No recent expenses"
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default QuickExpenseTracker;
