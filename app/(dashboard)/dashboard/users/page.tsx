import { Plus, PlusSquare } from "lucide-react";
import React, { ReactElement } from "react";

import { ROWS_PER_PAGE } from "@/constants";
import SearchBar from "@/components/SearchBar";
import UsersWrapper from "./UsersWrapper";
import { Button } from "@/components/ui/button";
import { getUsers } from "@/app/actions/users";

const Users = async ({
  children,
  params: { locale },
  searchParams,
}: {
  children: ReactElement;
  params: { locale: string };
  searchParams: any;
}) => {
  const data = await getUsers(`limit=${ROWS_PER_PAGE}`);
  return (
    <main className="flex  flex-col py-4   ">
      <div className="flex justify-between w-full ">
        <h2 className=" text-xl text-center">Our Users</h2>
        {/* <a href="product/add">
          <Button variant={"outline"}>
            <Plus />
          </Button>
        </a> */}
      </div>
      <br />
      <UsersWrapper initialData={data} />
    </main>
  );
};

export default Users;
