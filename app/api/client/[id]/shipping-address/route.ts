import { NextRequest, NextResponse } from "next/server";
import Client from "@/models/client";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const address = await request.json();

    // Generate a unique ID for the new address
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        $push: { shipping_Details: newAddress },
      },
      { new: true }
    );

    if (!updatedClient) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("Error adding shipping address:", error);
    return NextResponse.json(
      { error: "Failed to add shipping address" },
      { status: 500 }
    );
  }
}
