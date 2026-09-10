import { Field, FieldGroup } from "@/components/ui/field";
import { useEffect } from "react";
import { toast } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon, EyeIcon, PaperclipIcon, FileIcon } from "lucide-react";

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

import { Card, CardContent } from "@/components/ui/card";
const priorities = [
  {
    label: "LOW",
    value: "LOW",
  },
  {
    label: "MEDIUM",
    value: "MEDIUM",
  },
  {
    label: "HIGH",
    value: "HIGH",
  },
];

import React, { useState } from "react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import api from "@/api/api";

export function TaskForm({ onSuccess, editData, formMode }) {
  let { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: {
      title: editData?.title ?? "",
      description: editData?.description ?? "",
      assign_to: editData?.assign_to?._id ?? "",
      priority: editData?.priority ?? "",
      startDate: editData?.startDate ?? null,
      endDate: editData?.endDate ?? null,
      attachments: editData?.attachments ?? [],
      newAttachments: [],
      deletedAttachments: [],
    },
  });

  useEffect(() => {
    console.log(editData, ".......");
    const fetchUserDrp = async () => {
      try {
        let u = await api.get("/users");
        console.log(u.data.data);
        setAssignToDrp(u.data.data);
      } catch (error) {}
    };

    fetchUserDrp();
  }, []);

  const [openSD, setOpenSD] = useState(false);
  const [openED, setOpenED] = useState(false);
  const [assignToDrp, setAssignToDrp] = useState([]);

  async function onSubmit(data) {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("assign_to", data.assign_to);
    formData.append("priority", data.priority);

    if (data.startDate) {
      formData.append("startDate", new Date(data.startDate).toISOString());
    }

    if (data.endDate) {
      formData.append("endDate", new Date(data.endDate).toISOString());
    }

    // Add files
    if (data.newAttachments?.length) {
      data.newAttachments.forEach((file) => {
        formData.append("attachments", file);
      });
    }

    formData.append(
      "deletedAttachments",
      JSON.stringify(
        data.deletedAttachments?.length > 0 ? data.deletedAttachments : [],
      ),
    );

    console.log(formData.values, ".....form data");

    try {
      if (formMode === "edit") {
        await api.put(`/task/${editData._id}`, formData);

        toast.add({
          title: "Task Updated successfully",
        });
      } else {
        await api.post("/task", formData);

        toast.add({
          title: "Task added successfully",
        });
      }

      onSuccess();
    } catch (error) {
      console.log(error);

      toast.add({
        title: "Something went wrong",
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="task-form">
        <FieldGroup>
          <Field>
            <Label htmlFor="name-1">Title</Label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="Enter task"
            />
          </Field>
          <Field>
            <Label htmlFor="username-1">Description</Label>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter Description"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="assign_to"
              control={control}
              render={({ field }) => {
                const selectedPerson = assignToDrp.find(
                  (item) => item._id === field.value,
                );

                return (
                  <Field>
                    <Label>Assign To</Label>

                    <Select
                      value={field.value ?? ""}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select person">
                          {selectedPerson?.firstName}
                        </SelectValue>
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {assignToDrp.map((item) => (
                            <SelectItem key={item._id} value={item._id}>
                              {item.firstName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Field>
                  <Label>Priority</Label>

                  <Select
                    priorities={priorities}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {priorities.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Controller
              name="startDate"
              control={control}
              rules={{
                required: "Start date is required",
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="date-picker-simple">Start Date</Label>

                  <Popover open={openSD} onOpenChange={setOpenSD}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="date-picker-simple"
                          className="justify-start font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      }
                    />

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenSD(false);
                        }}
                        defaultMonth={field.value || new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />
            <Controller
              name="endDate"
              control={control}
              rules={{
                required: "End date is required",
              }}
              render={({ field, fieldState }) => (
                <Field>
                  <Label htmlFor="date-picker-simple">End Date</Label>

                  <Popover open={openED} onOpenChange={setOpenED}>
                    <PopoverTrigger
                      render={
                        <Button
                          variant="outline"
                          id="date-picker-simple"
                          className="justify-start font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      }
                    />

                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenED(false);
                        }}
                        defaultMonth={field.value || new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <p className="text-sm text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="newAttachments"
            control={control}
            render={({ field }) => (
              
              <Field>
                <Label>Attachments</Label>

                <label
                  htmlFor="task-attachment-input"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed bg-transparent dark:bg-input/30 p-3 hover:bg-muted"
                >
                  <PaperclipIcon className="size-4 text-muted-foreground" />

                  <span className="text-sm">Click to attach files</span>

                  <Input
                    id="task-attachment-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(event) => {
                      const files = Array.from(event.target.files || []);

                      field.onChange([...(field.value || []), ...files]);

                      event.target.value = "";
                    }}
                  />
                </label>

                {/* Selected files */}
                <AttachmentGroup className="grid w-full grid-cols-1 gap-2 sm:grid-cols-4">
                  {field.value?.map((file, index) => {
                    const fileUrl = URL.createObjectURL(file);

                    return (
                      <Attachment
                        key={`${file.name}-${index}`}
                        orientation="vertical"
                      >
                        <AttachmentMedia variant="image">
                          <img
                            src={fileUrl}
                            alt={file.name}
                            className="aspect-video w-full object-cover"
                          />
                        </AttachmentMedia>

                        <AttachmentContent>
                          <AttachmentTitle>{file.name}</AttachmentTitle>

                          <AttachmentDescription>
                            {file.type.split("/")[1]?.toUpperCase()} ·{" "}
                            {(file.size / 1024).toFixed(0)} KB
                          </AttachmentDescription>
                        </AttachmentContent>

                        <AttachmentActions>
                          <AttachmentAction
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              field.onChange(
                                field.value.filter(
                                  (_, fileIndex) => fileIndex !== index,
                                ),
                              );
                            }}
                          >
                            <XIcon />
                          </AttachmentAction>
                        </AttachmentActions>

                        <AttachmentTrigger
                          render={
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Preview ${file.name}`}
                            />
                          }
                        />
                      </Attachment>
                    );
                  })}
                </AttachmentGroup>
              </Field>
            )}
          />

          <Controller
            name="attachments"
            control={control}
            render={({ field }) => (
              <Field>
               {(getValues('attachments') || []).length>0? <Label>Existing Attachments</Label>:<div></div>}
                {/* <Label>Existing Attachments</Label> */}

                <AttachmentGroup className="grid w-full grid-cols-1 gap-2 sm:grid-cols-4">
                  {field.value?.map((attachment) => {
                    const fileUrl = `http://localhost:3000/${attachment.filePath}`;

                    return (
                      <Attachment key={attachment._id} orientation="vertical">
                        <AttachmentMedia variant="image">
                          <img
                            src={fileUrl}
                            alt={attachment.originalName}
                            className="aspect-video w-full object-cover"
                          />
                        </AttachmentMedia>

                        <AttachmentContent>
                          <AttachmentTitle>
                            {attachment.originalName}
                          </AttachmentTitle>

                          <AttachmentDescription>
                            {attachment.mimeType}
                          </AttachmentDescription>
                        </AttachmentContent>

                        <AttachmentActions>
                          <AttachmentAction
                            type="button"
                            aria-label={`Remove ${attachment.originalName}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              // 1. Get existing deleted IDs
                              const deleted =
                                getValues("deletedAttachments") || [];

                              // 2. Add this attachment ID
                              setValue("deletedAttachments", [
                                ...deleted,
                                attachment._id,
                              ]);

                              // 3. Remove it from visible attachments
                              setValue(
                                "attachments",
                                field.value.filter(
                                  (item) => item._id !== attachment._id,
                                ),
                              );
                            }}
                          >
                            <XIcon />
                          </AttachmentAction>
                        </AttachmentActions>
                        <AttachmentTrigger
                          render={
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Preview ${attachment.originalName}`}
                            />
                          }
                        />
                      </Attachment>
                    );
                  })}
                </AttachmentGroup>
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </>
  );
}
