import dbConnect from '@/lib/database/dbConnect';
import { User } from '@/lib/database/schemas/User';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from '@/lib/getUserFromToken';
import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect(); // Connect to MongoDB
    const formData = await request.formData(); // Parse form data
    console.log(formData)

    if (!formData) {
      return NextResponse.json({ status: "form data invalid" });
    }
    console.log(formData)

    // Extract form data
    const avatarFile = formData.get('avatar'); // Get avatar file
    const name = formData.get('name') as string; // Get name

    const userToken = await getUserFromToken(request.cookies); // Get user info from token
    //@ts-ignore
    const userId = userToken.user.id; // Extract user ID

    if (avatarFile instanceof File) {
      // Prepare file storage path
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await fs.mkdir(uploadDir, { recursive: true }); // Ensure upload directory exists

      // Generate a unique file name using user ID and original file name
      const fileName = `${userId}-${Date.now()}-${avatarFile.name}`;
      const filePath = path.join(uploadDir, fileName);

      // Read file buffer
      const fileBuffer = await avatarFile.arrayBuffer();

      // Write file to server
      await fs.writeFile(filePath, Buffer.from(fileBuffer));

      // Update user document in MongoDB with new avatar path
      const avatarPath = `/uploads/${fileName}`;
      await User.findOneAndUpdate({ id: userId }, { name, avatar: avatarPath });

      return NextResponse.json({ status: "ok" });
    } else {
      // Handle case where no avatar file is uploaded
      if (name != "") {
        await User.findOneAndUpdate({ id: userId }, { name });
      }

      return NextResponse.json({ status: "ok" });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(`Error processing request: ${error.message}`, { status: 500 });
  }
}
