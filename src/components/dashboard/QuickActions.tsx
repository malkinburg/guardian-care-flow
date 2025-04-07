
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import QuickIncidentReport from "./QuickIncidentReport";
import QuickReceiptUpload from "./QuickReceiptUpload";

const QuickActions = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common tasks you might want to perform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <QuickReceiptUpload />
          <QuickIncidentReport />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
