import { ChevronRightIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontalIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUp, ArrowDown, Calendar } from "lucide-react";
export function TaskCard({ task }) {
  const featureName = "Scheduled reports";

  useEffect(() => {
    console.log(task);
  });

  function truncate(text) {
    if (text.length <= 100) {
      return text;
    }

    return text.slice(0, 100) + "...";
  }

  return (
    <Card className="w-full max-w-xs hover:shadow-sm hover:shadow-gray-700">
      <CardContent>
        <div className="flex justify-between">
          <div>
            {task.priority == "HIGH" ? (
              <Badge className="bg-red-50 text-red-950 dark:bg-red-300 dark:text-red-800">
                <ArrowUp className="h-4 w-4" />
                High
              </Badge>
            ) : task.priority == "MEDIUM" ? (
              <Badge className="bg-red-50 text-red-950 dark:bg-yellow-200 dark:text-yellow-800">
                - Medium
              </Badge>
            ) : (
              <Badge className="bg-red-50 text-red-950 dark:bg-blue-300 dark:text-blue-800">
                <ArrowDown className="h-4 w-4" />
                Low
              </Badge>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontalIcon />
                  <span className="sr-only">Open menu</span>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(d)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(d)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-md text-left font-extrabold">{task?.title}</div>
        <div className="text-sm text-left mt-3 h-16 text-wrap">
          {truncate(task?.description || "")}
        </div>
        <div className="text-sm text-left mt-6">
          <span className="flex justify-start">
            <Calendar className="mr-2 h-4 w-4" /> Due:
            {" " + format(task?.endDate, "d MMMM, yyyy")}
          </span>
        </div>
        <div className="text-sm text-left mt-3">Assignee: {task.assign_to?.firstName || '-'}</div>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 flex align-bottom">
        <Button variant="outline" size="sm" className="w-full">
          See what&apos;s new
        </Button>
      </CardFooter> */}
    </Card>
  );
}
