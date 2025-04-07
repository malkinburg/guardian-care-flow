
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Plus } from "lucide-react";
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

const QuickExpenseTracker = () => {
  const navigate = useNavigate();
  const [expenses] = useState(SAMPLE_EXPENSES);

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
        {expenses.length > 0 ? (
          <div className="space-y-3">
            {expenses.slice(0, 2).map((expense) => (
              <div 
                key={expense.id} 
                className="p-3 bg-gray-50 rounded-md border border-gray-100 hover:border-gray-200"
                onClick={handleViewAllExpenses}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{expense.description}</p>
                    <p className="text-xs text-gray-500">For {expense.participantName}</p>
                  </div>
                  <p className="font-medium">${expense.amount.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">{formatDate(expense.date)}</p>
                  <span 
                    className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClass(expense.status)}`}
                  >
                    {expense.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-md border border-dashed">
            <p className="text-gray-500 text-sm">No recent expenses</p>
          </div>
        )}
        
        <Button 
          onClick={handleAddNewExpense}
          variant="outline" 
          className="w-full mt-3 border-sky-200 text-sky-700 hover:bg-sky-50"
        >
          <Plus className="h-4 w-4 mr-1" /> Add New Expense
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickExpenseTracker;
