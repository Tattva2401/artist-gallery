"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitCommissionRequest(data: {
  name: string;
  email: string;
  details: string;
  requestedSize: string;
}) {
  await prisma.commission.create({
    data: {
      name: data.name,
      email: data.email,
      details: data.details,
      requestedSize: data.requestedSize,
      status: "PENDING",
    }
  });

  // Tell the admin dashboard to refresh its data
  revalidatePath("/admin");
  revalidatePath("/admin/commissions");
}