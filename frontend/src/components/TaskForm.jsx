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
  let { register, handleSubmit, control } = useForm({
    defaultValues: {
      title: editData.title ?? "",
      description: editData.description ?? "",
      assign_to: editData.assign_to?._id ?? "",
      priority: editData.priority ?? "",
      startDate: editData.startDate ?? null,
      endDate: editData.endDate ?? null,
    },
  });

  useEffect(() => {
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
    if (formMode == "edit") {
      try {
        await api.put(`/task/${editData._id}`, data);
         toast.add({
          title: "Task Updated successfully",
        });
      } catch (error) {
         toast.add({
          title: "something went wrong",
        });
      }
      
    } else {
      try {
        let ud = await api.post("/task", data);
        console.log(ud, ".....ud");
        toast.add({
          title: "Task added successfully",
        });
      } catch (error) {
        console.log(error);
      }
    }

    onSuccess();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            <Button type="submit">submit</Button>
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
