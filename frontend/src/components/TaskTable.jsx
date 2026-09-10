import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUp,
  ArrowDown,
  EllipsisVertical,
  CalendarDays,
  Users,
  Triangle,
  Flag,
  Paperclip,
  FileText,
   Pencil,
  Trash2,Eye
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

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
  { label: "IN PROGRESS", value: "IN_PROGRESS" },
  { label: "COMPLETED", value: "COMPLETED" },
];

import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

/////

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditViewTaskDrawer } from "./editViewTask";

export function TaskTable({
  data,
  onEdit,
  onDelete,
  total,
  statusChange,
  setIsFormSubmitted,
  isFormSubmitted,
}) {
  const [mode, setMode] = useState("view");
  function truncate(text) {
    if (text.length <= 100) {
      return text;
    }

    return text.slice(0, 100) + "...";
  }

  function onStatusChange(event, id) {
    statusChange(event, id);
  }

  const [open, setOpen] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("asap");
  const isMobile = useIsMobile();
  const [viewDrawerData, setViewDrawerData] = useState({});
  function handleConfirm() {
    const selected = deliveryTimes.find((time) => time.value === deliveryTime);
    if (!selected) {
      return;
    }
    setOpen(false);
  }

  function openViewDrawer(drawerData) {
    setOpen(true);
    setViewDrawerData(drawerData);
  }

  return (
    <>
      <Card className="mt-8">
        <CardContent className="p-0 sm:px-3">
          {total === 0 ? (
            <div className="mt-5 flex min-h-[119px] items-center justify-center px-4 text-sm text-muted-foreground">
              No records found
            </div>
          ) : (
            <div className="max-h-[550px] min-h-[119px] overflow-auto pr-2">
              <Table className="min-w-[1050px] table-fixed">
                <TableHeader className="sticky top-0 z-20 bg-gray-600">
                  <TableRow className="bg-gray-600 hover:bg-gray-600">
                    {/* Title */}
                    <TableHead className="w-[180px] bg-gray-600 text-center text-white">
                      Title
                    </TableHead>

                    {/* Description */}
                    <TableHead className="w-[280px] bg-gray-600 text-center text-white">
                      Description
                    </TableHead>

                    {/* Assign To */}
                    <TableHead className="w-[120px] bg-gray-600 text-center text-white">
                      Assign To
                    </TableHead>

                    {/* End Date */}
                    <TableHead className="w-[130px] bg-gray-600 text-center text-white">
                      End Date
                    </TableHead>

                    {/* Priority */}
                    <TableHead className="w-[120px] bg-gray-600 text-center text-white">
                      Priority
                    </TableHead>

                    {/* Status */}
                    <TableHead className="w-[160px] bg-gray-600 text-center text-white">
                      Status
                    </TableHead>

                    {/* Action */}
                    <TableHead className="w-[80px] bg-gray-600 text-center text-white">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.map((d) => (
                    <TableRow key={d._id}>
                      {/* TITLE */}
                      <TableCell className="whitespace-normal break-words align-middle font-medium">
                        <div className="line-clamp-2">{d.title}</div>
                      </TableCell>

                      {/* DESCRIPTION */}
                      <TableCell className="whitespace-normal break-words align-middle">
                        {d?.description?.length > 100 ? (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span className="cursor-pointer">
                                {truncate(d.description)}
                              </span>
                            </HoverCardTrigger>

                            <HoverCardContent className="max-w-[350px] break-words">
                              {d.description}
                            </HoverCardContent>
                          </HoverCard>
                        ) : (
                          truncate(d?.description || "-")
                        )}
                      </TableCell>

                      {/* ASSIGN TO */}
                      <TableCell className="align-middle">
                        <Tooltip>
                          <TooltipTrigger
                            render={
                              <div className="flex justify-center">
                                <AvatarGroup className="w-fit">
                                  <Avatar className="h-7 w-7 grayscale">
                                    <AvatarImage
                                      src="https://github.com/shadcn.png"
                                      alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>

                                  <Avatar className="h-7 w-7 grayscale">
                                    <AvatarImage
                                      src="https://github.com/maxleiter.png"
                                      alt="@maxleiter"
                                    />
                                    <AvatarFallback>LR</AvatarFallback>
                                  </Avatar>
                                </AvatarGroup>
                              </div>
                            }
                          />

                          <TooltipContent>
                            <p>{d.assign_to?.firstName || "-"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TableCell>

                      {/* END DATE */}
                      <TableCell className="whitespace-nowrap text-center align-middle">
                        {d?.endDate ? format(d.endDate, "d MMM, yyyy") : "-"}
                      </TableCell>

                      {/* PRIORITY */}
                      <TableCell className="text-center align-middle">
                        <div className="flex justify-center">
                          {d.priority === "HIGH" ? (
                            <Badge className="whitespace-nowrap bg-red-50 text-red-950 dark:bg-red-300 dark:text-red-800">
                              <ArrowUp className="mr-1 h-4 w-4" />
                              High
                            </Badge>
                          ) : d.priority === "MEDIUM" ? (
                            <Badge className="whitespace-nowrap bg-yellow-50 text-yellow-950 dark:bg-yellow-200 dark:text-yellow-800">
                              Medium
                            </Badge>
                          ) : (
                            <Badge className="whitespace-nowrap bg-blue-50 text-blue-950 dark:bg-blue-300 dark:text-blue-800">
                              <ArrowDown className="mr-1 h-4 w-4" />
                              Low
                            </Badge>
                          )}
                        </div>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell className="align-middle">
                        <div className="flex justify-center">
                          <Select
                            items={statusArr}
                            value={d.status}
                            onValueChange={(value) =>
                              onStatusChange(value, d._id)
                            }
                          >
                            <SelectTrigger className="h-8 w-[140px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                {statusArr.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell className="text-center align-middle">
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
                            <DropdownMenuItem
                              onClick={() => {
                                openViewDrawer(d);
                                setMode("view");
                              }}
                            >
                            <Eye />  View
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                openViewDrawer(d);
                                onEdit(d);
                                setMode("edit");
                              }}
                            >
                                <Pencil /> Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              variant="destructive"
                              onClick={() => onDelete(d._id)}
                            >
                             <Trash2 />   Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <EditViewTaskDrawer
        open={open}
        setOpen={setOpen}
        viewDrawerData={viewDrawerData}
        mode={mode}
        isFormSubmitted={isFormSubmitted}
        setIsFormSubmitted={setIsFormSubmitted}
      />
      {/* drawer */}
    </>
  );
}
