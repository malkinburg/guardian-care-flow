
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Receipt } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import QuickActionCard from "./QuickActionCard";

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

  const handleViewExpenses = () => {
    navigate("/timesheets", { state: { activeTab: "expenses" } });
  };

  return (
    <QuickActionCard
      icon={<Receipt className="h-5 w-5 text-sky-500" />}
      title="Expenses"
      description={isLoading ? 
        <Skeleton className="h-4 w-20" /> : 
        `${recentExpenses.length} recent expenses`
      }
      onClick={handleViewExpenses}
    />
  );
};

export default QuickExpenseTracker;
