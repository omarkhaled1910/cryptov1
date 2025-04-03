"use client";
import { getClients } from "@/app/actions/users";
import { DataTable } from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { ROWS_PER_PAGE } from "@/constants";
import { clientColumns } from "@/constants/userTable";
import React, { useState } from "react";

const ClientsWrapper = ({ initialData }: any) => {
  const [users, setUsers] = useState(initialData);
  const [searchQuery, setsearchQuery] = useState("");

  const queryUsers = async (formData: FormData) => {
    console.log(formData.get("userQuery"));
    const search = formData.get("userQuery");
    if (!search) {
      setUsers(initialData);
      return;
    }
    const data = await getClients(`limit=${ROWS_PER_PAGE}&search=${search}`);
    console.log(data);
    setUsers(data);
  };
  console.log(users);
  return (
    <>
      <SearchBar
        name="userQuery"
        onSubmit={queryUsers}
        classNames="pb-6 h-[80px] w-3/4"
        onChange={setsearchQuery}
      />
      <div
        style={{ maxHeight: "calc(100vh - 220px)", overflowY: "auto" }}
        className=" rounded-md   bg-zinc-100 dark:bg-zinc-900 space-x-4"
      >
        <DataTable
          count={users?.clientCount || 0}
          columns={clientColumns}
          data={users?.client || []}
          searchQuery={searchQuery}
          classNames="dark:bg-[#000012]  rounded-lg"
          fetcher={getClients}
          accssKey="client"
        />
      </div>
    </>
  );
};

export default ClientsWrapper;
