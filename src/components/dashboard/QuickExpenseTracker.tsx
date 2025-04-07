
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Clock } from "lucide-react";
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
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-sky-500" />
            Recent Expenses
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-sky-500 p-0"
            onClick={handleViewAllExpenses}
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(limit)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        ) : recentExpenses.length > 0 ? (
          <div className="space-y-3">
            {recentExpenses.map(expense => (
              <div
                key={expense.id}
                className="border-l-2 border-sky-200 pl-3 py-1 cursor-pointer hover:bg-sky-50 rounded-sm"
                onClick={handleViewAllExpenses}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{expense.description}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(expense.date)}
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(expense.status)}`}>
                    {expense.status}
                  </span>
                </div>
              </div>
            ))}
            
            <Button
              onClick={handleAddNewExpense}
              variant="outline" 
              className="w-full mt-3 border-sky-200 text-sky-700 hover:bg-sky-50"
            >
              View All Expenses
            </Button>
          </div>
        ) : (
          <div className="text-center py-4 text-sm text-gray-500">
            No recent expenses available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickExpenseTracker;
