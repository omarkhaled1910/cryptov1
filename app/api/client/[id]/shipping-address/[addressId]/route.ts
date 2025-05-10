import { NextRequest, NextResponse } from "next/server";
import Client from "@/models/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; addressId: string } }
) {
  try {
    const { id, addressId } = params;

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        $pull: { shipping_Details: { id: addressId } },
      },
      { new: true }
    );

    if (!updatedClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error deleting shipping address:", error);
    return NextResponse.json(
      { error: "Failed to delete shipping address" },
      { status: 500 }
    );
  }
}
