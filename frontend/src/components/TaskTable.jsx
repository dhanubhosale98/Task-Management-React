import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, EllipsisVertical } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const statusArr = [
  { label: "TODO", value: "TODO" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "COMPLETED", value: "COMPLETED" },
];
export function TaskTable({ data, onEdit, onDelete, total,statusChange }) {
  function truncate(text) {
    if (text.length <= 100) {
      return text;
    }

    return text.slice(0, 100) + "...";
  }

  function onStatusChange(event,id){
    statusChange(event,id)

  }

  return (
    <>
      <Card className="mt-5">
        <CardHeader>{/* <h5>task table</h5> */}</CardHeader>
        <CardContent className="max-h-120 min-h-119 overflow-auto">
          {total == 0 ? (
            <div className="mt-5">No records found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-600 hover:bg-gray-600">
                  <TableHead className="w-[100px] text-center">Title</TableHead>
                  <TableHead className={"text-center"}>Description</TableHead>
                  <TableHead className={"text-center"}>Assign To</TableHead>
                  <TableHead className={"text-center"}>Start Date</TableHead>
                  <TableHead className={"text-center"}>End Date</TableHead>
                  <TableHead className={"text-center"}>Priority</TableHead>
                  <TableHead className={"text-center"}>Status</TableHead>

                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {data.map((d) => (
                  <TableRow key={d._id}>
                    <TableCell className="font-medium">{d.title}</TableCell>
                    <TableCell
                      className={" break-words whitespace-normal max-w-32"}
                    >
                      {d?.description.length > 100 ? (
                        <HoverCard>
                          <HoverCardTrigger>
                            {truncate(d.description)}
                          </HoverCardTrigger>
                          <HoverCardContent>{d.description}</HoverCardContent>
                        </HoverCard>
                      ) : (
                        truncate(d.description)
                      )}
                    </TableCell>
                    <TableCell> {d.assign_to?.firstName || "-"}</TableCell>

                    <TableCell>
                      {format(d?.startDate, "d MMMM, yyyy")}
                    </TableCell>
                    <TableCell>{format(d?.endDate, "d MMMM, yyyy")}</TableCell>
                    <TableCell>
                      {d.priority == "HIGH" ? (
                        <Badge className="bg-red-50 text-red-950 dark:bg-red-300 dark:text-red-800">
                          <ArrowUp className="h-4 w-4" />
                          High
                        </Badge>
                      ) : d.priority == "MEDIUM" ? (
                        <Badge className="bg-red-50 text-red-950 dark:bg-yellow-200 dark:text-yellow-800">
                          - Medium
                        </Badge>
                      ) : (
                        <Badge className="bg-red-50 text-red-950 dark:bg-blue-300 dark:text-blue-800">
                          <ArrowDown className="h-4 w-4" />
                          Low
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
              
                      <Select items={statusArr} value={d.status} onValueChange={(event)=>onStatusChange(event,d._id)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {statusArr.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <EllipsisVertical size={20} />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          }
                        />
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(d)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onDelete(d._id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
}
