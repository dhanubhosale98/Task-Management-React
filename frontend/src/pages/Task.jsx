import React, { useEffect, useState, useRef } from "react";
import { TaskCard } from "@/components/TaskCard";
import { ButtonGroup } from "@/components/ui/button-group";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { TaskTable } from "@/components/TaskTable";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { List, Grid2X2 } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import api from "@/api/api";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
const priorityArr = [
  { label: "All", value: "" },
  { label: "LOW", value: "LOW" },
  { label: "MEDIUM", value: "MEDIUM" },
  { label: "HIGH", value: "HIGH" },
];

const statusArr = [
  { label: "All", value: "" },
  { label: "TODO", value: "TODO" },
  { label: "IN_PROGRESS", value: "IN_PROGRESS" },
  { label: "COMPLETED", value: "COMPLETED" },
];
import { EditViewTaskDrawer } from "@/components/editViewTask";
export function Task() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("create");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef("");
  const [assigneeDrp, setAssigneeDrp] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState("");

  const [filter, setFilter] = useState({
    page,
    limit,
    searchText,
    priority,
    status,
    assignee: selectedAssignee,
  });
  const fetchTask = async () => {
    console.log("called");
    let taskData = await api.get("/task", {
      params: {
        page,
        limit,
        searchText,
        priority,
        status,
        assignee: selectedAssignee,
      },
    });
    setData(taskData.data.data);
    setTotalPages(Math.ceil(taskData.data.total / limit));
    setTotal(taskData.data?.total || 0);
  };

  useEffect(() => {
    fetchTask();
    let cView = JSON.parse(localStorage.getItem("currentView") || "list");
    setCurrentView(cView);
  }, [
    isFormSubmitted,
    page,
    limit,
    searchText,
    priority,
    status,
    selectedAssignee,
  ]);

  function onChangeLimit(limit) {
    setLimit(limit);
    if (Math.ceil(total / limit) < page) setPage(Math.ceil(total / limit));
  }

  function onChangePage(page) {
        console.log("on filter chnage called")
    setPage(page);
  }

  function onEdit(data) {
    
  }

  async function onDelete(id) {
    try {
      let result = await api.patch(`/task/${id}`);
      console.log(result, "...delete result");
      setIsFormSubmitted(!isFormSubmitted);
    } catch (error) {
      console.log(error);
    }
  }
  function onOpenCreate() {
    setOpen(true);
    setEditData({});
    setMode("create");
    console.log(editData, "...edit data");
  }

  function onChangeView(view) {
    setCurrentView(view);
    localStorage.setItem("currentView", JSON.stringify(view));
  }

  function onClickPrevious() {
    if (page > 1) setPage(page - 1);
  }

  function onClickNext() {
    if (page < totalPages) setPage(page + 1);
  }

  async function statusChange(event, id) {
    try {
      let result = await api.patch(`/task/changeStatus/${id}`, {
        status: event,
      });
      setIsFormSubmitted(!isFormSubmitted);
      toast.add({
        title: "Status change successfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="w-full border-amber-300">
        <div className="flex justify-between">
          <div className="text-start">
            <p className="text-xl font-bold">Task</p>
            <p className="text-xs font-light">Keep track of your work</p>
          </div>

          <div className="">
            <Button
              className="bg-indigo-600 text-white px-4"
              onClick={onOpenCreate}
            >
              Add Task
            </Button>
            <EditViewTaskDrawer
              open={open}
              setOpen={setOpen}
              mode={mode}
              setIsFormSubmitted={setIsFormSubmitted}
              isFormSubmitted={isFormSubmitted}
            />
          </div>
        </div>
        <div className="mt-8">
          <div className="w-full">
            <div className="grid grid-cols-12 gap-4">
              {/* 3 columns */}
              <div className="col-span-12 lg:col-span-3 ">
                <Field>
                  
                  <Field>
                    <InputGroup>
                      <InputGroupInput
                        id="input-group-url"
                        placeholder="Type to search..."
                        ref={inputRef}
                        onInput={(event) => {setSearchText(event.target.value);setPage(1)}}
                      />

                      <InputGroupAddon align="inline-start">
                        <Search size={20} />{" "}
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </Field>
              </div>

              {/* 9 columns */}
              <div className="col-span-12 lg:col-span-9 ">
                <div className="flex justify-end lg:gap-4 gap-3">
                  <Select
                    items={priorityArr}
                    value={priority}
                    onValueChange={(event) => {
                      console.log(event);
                      setPriority(event);
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="w-30">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {priorityArr.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    items={statusArr}
                    value={status}
                    onValueChange={(event) => {
                      console.log(event);
                      setStatus(event);
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="w-30">
                      <SelectValue placeholder="Status" />
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
                  <Select
                    items={assigneeDrp}
                    value={selectedAssignee}
                    onValueChange={(event) => {
                      console.log(event);
                      setSelectedAssignee(event);
                      setPage(1)
                    }}
                  >
                    <SelectTrigger className="w-30">
                      <SelectValue placeholder="Assignee">
                        {
                          assigneeDrp.filter(
                            (x) => x._id == selectedAssignee,
                          )[0]?.firstName
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={""}>All</SelectItem>
                        {assigneeDrp.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.firstName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  
                  <ButtonGroup>
                    <Button
                      onClick={() => onChangeView("list")}
                      className={
                        currentView == "list"
                          ? "bg-indigo-600 text-white hover:bg-indigo-600"
                          : "bg-gray-800 text-white hover:bg-gray-800"
                      }
                    >
                      <List size={16} /> List
                    </Button>
                    <Button
                      onClick={() => onChangeView("grid")}
                      className={
                        currentView == "grid"
                          ? "bg-indigo-600 text-white hover:bg-indigo-600"
                          : "bg-gray-800 text-white hover:bg-gray-800"
                      }
                    >
                      <Grid2X2 size={16} /> Grid
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {currentView == "list" ? (
            <div className="">
              <TaskTable
                data={data}
                onEdit={onEdit}
                onDelete={onDelete}
                total={total}
                statusChange={statusChange}
                isFormSubmitted={isFormSubmitted}
                setIsFormSubmitted={setIsFormSubmitted}
              />
            </div>
          ) : (
            <div className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {data.map((x) => (
                  <TaskCard
                    task={x}
                    onView={(task) => console.log("View", task)}
                    onEdit={(task) => console.log("Edit", task)}
                    onDelete={(task) => console.log("Delete", task)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        {total != 0 ? (
          <div className="w-full flex justify-between mt-5">
            <div>
              <Select
                items={[2, 3, 4]}
                value={limit}
                onValueChange={onChangeLimit}
              >
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Enter limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Limit</SelectLabel>
                    {[5, 10, 15].map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      disable
                      onClick={onClickPrevious}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (item, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={page == index + 1}
                        onClick={() => onChangePage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={onClickNext} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
