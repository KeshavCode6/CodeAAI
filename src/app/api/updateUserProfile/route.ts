//@ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/getUserFromToken';
import { promises as fs } from 'fs';
import path from 'path';
import { prismaClient } from '@/lib/prisma';
import {ApiErrors} from "@/lib/apiErrors";


export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData(); // Parse form data

    if (!formData) {
      return NextResponse.json({ status: "form data invalid" });
    }

    // Extract form data
    const editedUserProfilePicture = formData.get('editedUserProfilePicture'); // Get avatar file
    const editedUserName = formData.get('editedUserName') as string; // Get name

    const user = await getUserFromToken(request.cookies); // Get user info from token

    if (editedUserProfilePicture instanceof File) {
      if (!(["image/png", "image/jpeg", "image/jpg"].includes(editedUserProfilePicture.type))) {
        return new Response(...ApiErrors.INVALID_PARAMETERS_FORMAT);
      }

      // Prepare file storage path
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure upload directory exists
      
      const userDb = await prismaClient.user.findUnique({where:{email:user.email}})

      // Generate a unique file name using user ID and original file name
      const fileName = `${userDb.id}.png`;
      const filePath = path.join(uploadDir, fileName);

      // Read file buffer
      const fileBuffer = await editedUserProfilePicture.arrayBuffer();

      // Write file to server
      await fs.writeFile(filePath, Buffer.from(fileBuffer));

      // Update user document in MongoDB with new avatar path
      const avatarPath = `/uploads/${fileName}`;
      console.log(avatarPath)
      await prismaClient.user.update({where:{email:user.email}, data:{image:avatarPath}})

    } 

    if (editedUserName !== "") {
      await prismaClient.user.update({where:{email:user.email}, data:{name:editedUserName}})
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: Exception) {
    console.error("Error: ", err);
    return new Response(...ApiErrors.ERROR_PROCESSING_REQUEST(err));
  }
}
