import React, { useEffect, useState } from "react";

import { useIsMobile } from "@/hooks/use-mobile";

import { Button } from "./ui/button";

import {
  Attachment,
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
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ArrowUp,
  ArrowDown,
  CalendarDays,
  Users,
  Triangle,
  Flag,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";

import { TaskForm } from "./TaskForm";
import CommentsSection from "./comments";

export function EditViewTaskDrawer({
  open,
  setOpen,
  viewDrawerData,
  mode,
  setIsFormSubmitted,
  isFormSubmitted,
}) {
  const isMobile = useIsMobile();

  const [currentTab, setCurrentTab] = useState("Details");

  useEffect(() => {
    console.log(viewDrawerData, "...drawer data");
  }, [viewDrawerData]);

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
      showSwipeHandle={isMobile}
      swipeDirection={isMobile ? "down" : "right"}
      disablePointerDismissal
    >
      {" "}
      <DrawerContent className="flex w-auto flex-col md:w-130">
        {/* =====================================================
DRAWER HEADER
====================================================== */}{" "}
        <DrawerHeader className="flex shrink-0 justify-between">
          {" "}
          <DrawerTitle>
            {mode === "view"
              ? "View Task"
              : mode === "create"
                ? "Create Task"
                : "Edit Task"}{" "}
          </DrawerTitle>
          
          <X className="cursor-pointer" onClick={() => setOpen(false)} />
        </DrawerHeader>
        {/* =====================================================
        VIEW / EDIT
    ====================================================== */}
        {mode === "view" || mode === "edit" ? (
          <div className="flex min-h-0 flex-1 flex-col p-4 pb-0">
            <Tabs
              defaultValue="Details"
              className="flex min-h-0 flex-1 flex-col"
              onValueChange={(value) => {
                setCurrentTab(value);
                console.log(value, "current tab");
              }}
            >
              {/* =================================================
              TAB LIST
          ================================================== */}
              <TabsList variant="line" className="shrink-0">
                <TabsTrigger value="Details">Details</TabsTrigger>

                <TabsTrigger value="Comments">Comments</TabsTrigger>

                <TabsTrigger value="Activities">Activities</TabsTrigger>
              </TabsList>

              {/* =================================================
              DETAILS
          ================================================== */}
              <TabsContent
                value="Details"
                className="mt-3 min-h-0 flex-1 overflow-y-auto pr-4"
              >
                {mode === "view" ? (
                  <div>
                    {/* Task Title */}
                    <div className="text-lg font-bold text-white">
                      {viewDrawerData.ticketNo}: {viewDrawerData.title}
                    </div>

                    {/* Description */}
                    <div className="ml-1 mt-4 p-2 text-md text-white">
                      {viewDrawerData.description}
                    </div>

                    <div className="mt-3 flex flex-col gap-3">
                      {/* ===============================
                      ASSIGN TO
                  ================================ */}
                      <div className="mt-3 grid grid-cols-12">
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
                                {viewDrawerData.assign_to?.firstName || "-"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>

                      {/* ===============================
                      START DATE
                  ================================ */}
                      <div className="mt-3 grid grid-cols-12">
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
                            {viewDrawerData?.startDate
                              ? format(viewDrawerData.startDate, "d MMM, yyyy")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* ===============================
                      END DATE
                  ================================ */}
                      <div className="mt-3 grid grid-cols-12">
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
                            {viewDrawerData?.endDate
                              ? format(viewDrawerData.endDate, "d MMM, yyyy")
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* ===============================
                      STATUS
                  ================================ */}
                      <div className="mt-3 grid grid-cols-12">
                        <div className="col-span-4 flex gap-2">
                          <Triangle height="20px" className="text-gray-400" />

                          <span className="text-md text-gray-400">Status</span>
                        </div>

                        <div className="col-span-8">
                          <p className="text-md text-white">
                            {viewDrawerData.status}
                          </p>
                        </div>
                      </div>

                      {/* ===============================
                      PRIORITY
                  ================================ */}
                      <div className="mt-3 grid grid-cols-12">
                        <div className="col-span-4 flex gap-2">
                          <Flag height="20px" className="text-gray-400" />

                          <span className="text-md text-gray-400">
                            Priority
                          </span>
                        </div>

                        <div className="col-span-8">
                          <p className="text-md text-white">
                            {viewDrawerData.priority === "HIGH" ? (
                              <Badge className="bg-red-50 text-red-950 dark:bg-red-300 dark:text-red-800">
                                <ArrowUp className="h-4 w-4" />
                                High
                              </Badge>
                            ) : viewDrawerData.priority === "MEDIUM" ? (
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

                    {/* =================================================
                    ATTACHMENTS
                ================================================== */}
                    {viewDrawerData?.attachments?.length > 0 && (
                      <div className="mt-5">
                        <div className="col-span-4 flex gap-2">
                          <Users height="20px" className="text-gray-400" />

                          <span className="text-md text-gray-400">
                            Attachments
                          </span>
                        </div>

                        <AttachmentGroup className="mt-5 grid w-full grid-cols-1 gap-2 sm:grid-cols-4">
                          {viewDrawerData.attachments.map((file, index) => (
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
                          ))}
                        </AttachmentGroup>
                      </div>
                    )}
                  </div>
                ) : (
                  /* =================================================
                 EDIT FORM
              ================================================== */
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

              {/* =================================================
              COMMENTS
          ================================================== */}
              <TabsContent
                value="Comments"
                className="mt-3 min-h-0 flex-1 overflow-hidden"
              >
                <CommentsSection viewDrawerData={viewDrawerData}/>
              </TabsContent>

              {/* =================================================
              ACTIVITIES
          ================================================== */}
              <TabsContent
                value="Activities"
                className="mt-3 min-h-0 flex-1 overflow-y-auto"
              >
                <div className="space-y-4 pr-2">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod quo, qui pariatur iusto exercitationem, ad aperiam
                    doloribus alias veritatis, at sunt totam quos? Obcaecati
                    fuga debitis ipsum corrupti, in repellat quas commodi
                    quidem, natus porro consequuntur animi, veritatis dolorem
                    sed inventore officiis eaque consectetur quaerat dolore quam
                    pariatur at illo.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quod quo, qui pariatur iusto exercitationem, ad aperiam
                    doloribus alias veritatis, at sunt totam quos? Obcaecati
                    fuga debitis ipsum corrupti, in repellat quas commodi
                    quidem, natus porro consequuntur animi, veritatis dolorem
                    sed inventore officiis eaque consectetur quaerat dolore quam
                    pariatur at illo.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* =====================================================
         CREATE
      ====================================================== */
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <TaskForm
              onSuccess={() => {
                setOpen(false);
                setIsFormSubmitted(!isFormSubmitted);
              }}
              formMode={mode}
            />
          </div>
        )}
        {/* =====================================================
        DRAWER FOOTER
    ====================================================== */}
        <DrawerFooter className="flex shrink-0 justify-end">
          {/* Cancel */}
          {currentTab !== "Comments" ? (
            <DrawerClose render={<Button variant="outline">Cancel</Button>} />
          ) : null}

          {/* Submit / Update */}
          {mode !== "view" && currentTab !== "Comments" ? (
            <Button type="submit" form="task-form">
              {mode === "create" ? "Submit" : "Update"}
            </Button>
          ) : null}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
