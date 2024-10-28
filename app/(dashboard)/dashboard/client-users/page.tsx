import React from "react";
import ClientsWrapper from "./ClientsWrapper";
import { ROWS_PER_PAGE } from "@/constants";
import { getClients } from "@/app/actions/users";

const ClientsPage = async () => {
  const data = await getClients(`limit=${ROWS_PER_PAGE}`);

  return (
    <main>
      {" "}
      <div className="flex justify-between w-full ">
        <h2 className=" text-xl text-center">Our Clients</h2>
        {/* <a href="product/add">
          <Button variant={"outline"}>
            <Plus />
          </Button>
        </a> */}
      </div>
      <br />
      <ClientsWrapper initialData={data} />
    </main>
  );
};

export default ClientsPage;
