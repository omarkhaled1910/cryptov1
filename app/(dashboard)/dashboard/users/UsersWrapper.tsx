"use client";

import { getUsers } from "@/app/actions/users";
import { DataTable } from "@/components/ProductTable";
import SearchBar from "@/components/SearchBar";
import { ROWS_PER_PAGE } from "@/constants";
import { columns } from "@/constants/userTable";
import React, { useState } from "react";

const UsersWrapper = ({ initialData }: { initialData: any }) => {
  const [users, setUsers] = useState(initialData);
  const [searchQuery, setsearchQuery] = useState("");

  const queryUsers = async (formData: FormData) => {
    console.log(formData.get("userQuery"));
    const search = formData.get("userQuery");
    if (!search) {
      setUsers(initialData);
      return;
    }
    const data = await getUsers(`limit=${ROWS_PER_PAGE}&search=${search}`);
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
          count={users?.usersCount}
          columns={columns}
          data={users}
          searchQuery={searchQuery}
          classNames="dark:bg-[#000012]  rounded-lg"
          fetcher={getUsers}
          accssKey="user"
        />
      </div>
    </>
  );
};

export default UsersWrapper;
