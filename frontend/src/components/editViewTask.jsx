import React, { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@/components/ui/attachment";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";

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
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { TaskForm } from "./TaskForm";
// const attachments = [
//   {
//     _id: "att1",
//     name: "workspace.png",
//     url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
//     size: 820000,
//     type: "image/png",
//   },
//   {
//     _id: "att2",
//     name: "design.png",
//     url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
//     size: 540000,
//     type: "image/png",
//   },
//   {
//     _id: "att2",
//     name: "design.png",
//     url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
//     size: 540000,
//     type: "image/png",
//   },
//   {
//     _id: "att2",
//     name: "design.png",
//     url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800",
//     size: 540000,
//     type: "image/png",
//   },
// ];
export function EditViewTaskDrawer({
  open,
  setOpen,
  viewDrawerData,
  mode,
  setIsFormSubmitted,
  isFormSubmitted,
}) {
  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(viewDrawerData, "...drawr data");
  }, [viewDrawerData]);
  return (
    <>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        showSwipeHandle={isMobile}
        swipeDirection={isMobile ? "down" : "right"}
        disablePointerDismissal
      >
        <DrawerContent className="w-auto md:w-130 ">
          <DrawerHeader className="flex justify-between">
            <DrawerTitle>
              {mode == "view"
                ? "View Task"
                : mode == "create"
                  ? "Create Task"
                  : "Edit Task"}
            </DrawerTitle>
            <X className="cursor-pointer" onClick={() => setOpen(false)} />
          </DrawerHeader>

          {mode == "view" || mode == "edit" ? (
            <div className="scroll-fade overflow-y-auto p-4">
              <Tabs defaultValue="overview" className="">
                <TabsList variant="line">
                  <TabsTrigger value="Details">Details</TabsTrigger>
                  <TabsTrigger value="Comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="Details"
                  className="mt-3 h-[75vh]  overflow-y-auto pr-4"
                >
                  {mode == "view" ? (
                    <div>
                      <div className="text-lg text-white font-bold ">
                        {viewDrawerData.ticketNo}: {viewDrawerData.title}
                      </div>
                      <div className="text-md text-white mt-4 ml-1 p-2">
                        {viewDrawerData.description}
                      </div>
                      <div className="flex flex-col gap-3 mt-3">
                        <div className="grid grid-cols-12 mt-3">
                          <div className="col-span-4 flex gap-2">
                            <Users height="20px" className="text-gray-400" />
                            <span className="text-md text-gray-400">
                              Assign To
                            </span>
                          </div>
                          <div className="col-span-8">
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <Avatar className="h-7 w-7">
                                    <AvatarImage src="https://github.com/maxleiter.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                }
                              />
                              <TooltipContent>
                                <p>
                                  {" "}
                                  {viewDrawerData.assign_to?.firstName || "-"}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-3">
                          <div className="col-span-4 flex gap-2">
                            <CalendarDays
                              height="20px"
                              className="text-gray-400"
                            />
                            <span className="text-md text-gray-400">
                              Start Date
                            </span>
                          </div>
                          <div className="col-span-8">
                            <p className="text-md text-white">
                              {" "}
                              {viewDrawerData?.startDate
                                ? format(
                                    viewDrawerData?.startDate,
                                    "d MMM, yyyy",
                                  )
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-3">
                          <div className="col-span-4 flex gap-2">
                            <CalendarDays
                              height="20px"
                              className="text-gray-400"
                            />
                            <span className="text-md text-gray-400">
                              End Date
                            </span>
                          </div>
                          <div className="col-span-8">
                            <p className="text-md text-white">
                              {" "}
                              {viewDrawerData?.endDate
                                ? format(viewDrawerData?.endDate, "d MMM, yyyy")
                                : "-"}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-3">
                          <div className="col-span-4 flex gap-2">
                            <Triangle height="20px" className="text-gray-400" />
                            <span className="text-md text-gray-400">
                              Status
                            </span>
                          </div>
                          <div className="col-span-8">
                            <p className="text-md text-white">
                              {viewDrawerData.status}
                            </p>
                          </div>
                        </div>
                        <div className="grid grid-cols-12 mt-3">
                          <div className="col-span-4 flex gap-2">
                            <Flag height="20px" className="text-gray-400" />
                            <span className="text-md text-gray-400">
                              Priority
                            </span>
                          </div>
                          <div className="col-span-8">
                            <p className="text-md text-white">
                              {/* {viewDrawerData.priority} */}

                              {viewDrawerData.priority == "HIGH" ? (
                                <Badge className="bg-red-50 text-red-950 dark:bg-red-300 dark:text-red-800">
                                  <ArrowUp className="h-4 w-4" />
                                  High
                                </Badge>
                              ) : viewDrawerData.priority == "MEDIUM" ? (
                                <Badge className="bg-red-50 text-red-950 dark:bg-yellow-200 dark:text-yellow-800">
                                  - Medium
                                </Badge>
                              ) : (
                                <Badge className="bg-red-50 text-red-950 dark:bg-blue-300 dark:text-blue-800">
                                  <ArrowDown className="h-4 w-4" />
                                  Low
                                </Badge>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      {viewDrawerData?.attachments?.length > 0 ? (
                        <div className="mt-5">
                          <div className="col-span-4 flex gap-2">
                            <Users height="20px" className="text-gray-400" />
                            <span className="text-md text-gray-400">
                              {" "}
                              Attachments
                            </span>
                          </div>

                          <AttachmentGroup className="grid w-full grid-cols-1 gap-2 sm:grid-cols-4 mt-5">
                            {viewDrawerData.attachments?.map((file, index) => {
                              return (
                                <Attachment
                                  key={file._id || `${file?.name}-${index}`}
                                  orientation="vertical"
                                >
                                  <AttachmentMedia variant="image">
                                    <img
                                      src={`http://localhost:3000/${file.filePath}`}
                                      alt={file.originalName}
                                      className="aspect-video w-full object-cover"
                                    />
                                  </AttachmentMedia>

                                  <AttachmentContent>
                                    <AttachmentTitle>
                                      {file.originalName}
                                    </AttachmentTitle>

                                    <AttachmentDescription>
                                      {file.mimeType?.split("/")[1]?.toUpperCase()}{" "}
                                      ·{" "}
                                      {file.size
                                        ? `${(file.size / 1024).toFixed(0)} KB`
                                        : ""}
                                    </AttachmentDescription>
                                  </AttachmentContent>

                                  <AttachmentTrigger
                                    render={
                                      <a
                                        href={`http://localhost:3000/${file.filePath}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={`Preview ${file.originalName}`}
                                      />
                                    }
                                  />
                                </Attachment>
                              );
                            })}
                          </AttachmentGroup>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    <div className="h-full">
                      <TaskForm
                        onSuccess={() => {
                          setOpen(false);
                          setIsFormSubmitted(!isFormSubmitted);
                        }}
                        editData={viewDrawerData}
                        formMode={mode}
                      />
                    </div>
                  )}
                </TabsContent>

                <TabsContent
                  value="Comments"
                  className="mt-3 border h-[75vh]  overflow-y-auto border-red-700"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
                  quo, qui pariatur iusto exercitationem, ad aperiam doloribus
                  alias veritatis, at sunt totam quos? Obcaecati fuga debitis
                  ipsum corrupti, in repellat quas commodi quidem, natus porro
                  consequuntur animi, veritatis dolorem sed inventore officiis
                  eaque consectetur quaerat dolore quam pariatur at illo.
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="p-5 h-full overflow-y-auto">
              <TaskForm
                onSuccess={() => {
                  setOpen(false);
                  setIsFormSubmitted(!isFormSubmitted);
                }}
                formMode={mode}
              />
            </div>
          )}

          <DrawerFooter className="flex justify-end ">
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
            {mode != "view" ? (
              <Button type="submit" form="task-form">
                {mode == "create" ? "Submit" : "Update"}
              </Button>
            ) : (
              ""
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
