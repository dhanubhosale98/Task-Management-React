import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { ButtonGroup } from "@/components/ui/button-group";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import api from "@/api/api";

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
export function TaskFilterComp({ onFilterChange }) {
  const [searchText, setSearchText] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef("");
  const [assigneeDrp, setAssigneeDrp] = useState([]);
  const [selectedAssignee, setSelectedAssignee] = useState("");

  useEffect(() => {
    onFilterChange({
      status,
      priority,
      searchText,
      assignee: selectedAssignee,
    });
    console.log(status, priority, "...status p");

    const getAssigneeDrp = async () => {
      try {
        let u = await api.get("/users");
        console.log(u.data.data);
        setAssigneeDrp(u.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAssigneeDrp();
  }, [status, priority, searchText, selectedAssignee]);

  function clearFilters() {
    setSearchText("");
    setPriority("");
    setStatus("");
    setSelectedAssignee("");
  }

  return (
    <>
      <div className="md:flex md:gap-4 ">
        <Field>
          {/* <FieldLabel htmlFor="input-button-group">Search</FieldLabel> */}
          <ButtonGroup>
            <Input
              id="input-button-group"
              placeholder="Type to search..."
              ref={inputRef}
            />
            <Button
              variant="outline"
              onClick={() => setSearchText(inputRef.current.value)}
            >
              Search
            </Button>
          </ButtonGroup>
        </Field>
        <Select
          items={priorityArr}
          value={priority}
          onValueChange={(event) => {
            console.log(event);
            setPriority(event);
          }}
        >
          <SelectTrigger className="w-[180px]">
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
          }}
        >
          <SelectTrigger className="w-[180px]">
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
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assignee">
              {
                assigneeDrp.filter((x) => x._id == selectedAssignee)[0]
                  ?.firstName
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
        <Button variant="outline" onClick={clearFilters}>
          {" "}
          Clear Filter
        </Button>
      </div>
    </>
  );
}
