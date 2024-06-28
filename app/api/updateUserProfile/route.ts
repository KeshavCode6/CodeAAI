//@ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/dbConnect';
import { User } from '@/lib/database/schemas/User';
import { getUserFromToken } from '@/lib/getUserFromToken';
import { promises as fs } from 'fs';
import path from 'path';


export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB
    const formData = await request.formData(); // Parse form data

    if (!formData) {
      return NextResponse.json({ status: "form data invalid" });
    }

    // Extract form data
    const avatarFile = formData.get('avatar'); // Get avatar file
    const name = formData.get('name') as string; // Get name

    const userToken = await getUserFromToken(request.cookies); // Get user info from token
    //@ts-ignore
    const userId = userToken.user.id; // Extract user ID

    if (avatarFile instanceof File) {
      if (!(["image/png", "image/jpeg", "image/jpg"].includes(avatarFile.type))) {
        return new Response("Invalid filetype for avatar!", { status: 500 });
      }

      // Prepare file storage path
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure upload directory exists

      // Generate a unique file name using user ID and original file name
      const fileName = `${userId}.png`;
      const filePath = path.join(uploadDir, fileName);

      // Read file buffer
      const fileBuffer = await avatarFile.arrayBuffer();

      // Write file to server
      await fs.writeFile(filePath, Buffer.from(fileBuffer));

      // Update user document in MongoDB with new avatar path
      const avatarPath = `/uploads/${fileName}`;

      await User.findOneAndUpdate({ id: userId }, { image: avatarPath });

    } 

    if (name !== "") {
      await User.findOneAndUpdate({ id: userId }, { name });
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
