import React, { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskCard } from "@/components/TaskCard";
import { ButtonGroup } from "@/components/ui/button-group";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FieldGroup } from "@/components/ui/field";
import { TaskTable } from "@/components/TaskTable";
import { TaskFilterComp } from "@/components/TaskFilterComp";
import api from "@/api/api";

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

  const [filter, setFilter] = useState({});

  useEffect(() => {

    const fetchTask = async () => {
      let taskData = await api.get("/task", {
        params: { ...filter, limit, page },
      });
      setData(taskData.data.data);
      setTotalPages(Math.ceil(taskData.data.total / limit));
      setTotal(taskData.data?.total || 0);
    };
    fetchTask();
    let cView = JSON.parse(localStorage.getItem("currentView") || "list");
    setCurrentView(cView);
  }, [isFormSubmitted, filter, limit, page]);

  function onFilterChange(filterData) {
    setPage(1);
    setFilter(filterData);
  }

  function onChangeLimit(limit) {
    setLimit(limit);

    console.log(limit);
    if (Math.ceil(total / limit) < page) setPage(Math.ceil(total / limit));
  }

  function onChangePage(page) {
    setPage(page);
  }

  function onEdit(data) {
    // setOpen(true);
    // setMode("edit");
    // setEditData(data);
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

            {/* <Dialog open={open} onOpenChange={setOpen}>
              <form>
                <DialogTrigger
                  render={<Button className="bg-indigo-600 text-white px-4" onClick={onOpenCreate}>Add Task</Button>}
                />
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>
                      {mode == "create" ? "Add Task" : "Edit Task"}
                    </DialogTitle>
                  </DialogHeader>
                  <FieldGroup>


                    <TaskForm
                      onSuccess={() => {
                        setOpen(false);
                        setMode("create");
                        setIsFormSubmitted(!isFormSubmitted);
                      }}
                      editData={editData}
                      formMode={mode}
                    />
                  </FieldGroup>
                </DialogContent>
              </form>
            </Dialog> */}
          </div>
        </div>
        <div className="mt-8">
          <TaskFilterComp
            onFilterChange={onFilterChange}
            onChangeView={onChangeView}
            currentView={currentView}
          />
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
                  // <TaskCard task={x} key={x._id} />
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
