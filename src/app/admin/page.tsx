"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Editor, loader } from "@monaco-editor/react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { Sidebar } from "@/components/Navigation";
import { ThreeDots } from "@/components/Threedots";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminChallengeTable } from "@/components/ChallengeCard";
import { useRouter } from "next/navigation";

export default function CreateChallenge() {
  const [editorContent, setEditorContent] = useState(defaultJson);
  const [userContent, setUserContent] = useState("// User data will be here");
  const [userEmail, setUserEmail] = useState("");
  const [adminName, setAdminName] = useState("");
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  
  useEffect(() => {
    setIsClient(true);
    loader.init().then((monaco) => {
      monaco.editor.defineTheme("moon", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "", foreground: "D4D4D4" },
          { token: "keyword", foreground: "569CD6" },
          { token: "string", foreground: "CE9178" },
          { token: "number", foreground: "9CDCFE" },
          { token: "comment", foreground: "6A9955" },
          { token: "delimiter", foreground: "B8D7A3" },
          { token: "variable", foreground: "DCDCAA" },
          { token: "type", foreground: "4EC9B0" },
          { token: "constant", foreground: "B5CEA8" },
          { token: "property", foreground: "D4D4D4" },
          { token: "method", foreground: "9CDCFE" },
          { token: "builtin", foreground: "D4D4D4" },
          { token: "attribute", foreground: "DCDCAA" },
          { token: "operator", foreground: "B5CEA8" },
          { token: "function", foreground: "D8A3FF" },
        ],
        colors: {
          "editor.background": "#020817",
          "editorCursor.foreground": "#569CD6",
          "editor.lineHighlightBackground": "#00000000",
          "editorBracketMatch.background": "#00000000",
          "editorBracketMatch.border": "#00000000",
          "editorLineNumber.foreground": "#858585",
          "editorLineNumber.activeForeground": "#FFFFFF",
          "editor.lineHighlightBorder": "#00000000",
          "editorOverviewRuler.border": "#00000000",
        },
      });
    });
  }, []);

  const handleEditorContentChange = (value: any) => {
    setEditorContent(value);
  };

  const handlerUserContentChange = (value: any) => {
    setUserContent(value);
  };
  const createChallenge = () => {
    fetch("/api/manageChallenge", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        challengeData: editorContent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast({
            variant: "success",
            title: "Challenge Created Successfully",
            description: "Your challenge has been created!",
          });
        } else if (data.status === 403) {
          toast({
            variant: "destructive",
            title: "Incorrect Secret Key",
            description:
              "The secret key you entered is invalid. If you believe this is a mistake, please contact a Code AAI staff member.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: data.message
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description:
          "An unexpected error occurred during the creation of this challenge. If the problem persists, please contact a Code AAI staff member.",
        });
      });
  };

  const handleInputChange = (e:any) => {
    setUserEmail(e.target.value);
  };

  async function fetchUserData() {
    try {
      const response = await fetch('/api/getUser', { // Adjust the endpoint path
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any other necessary headers here
        },
        body:JSON.stringify({email:userEmail})
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      setUserContent(JSON.stringify(data, null, 2))
      return data;
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  async function updateUser() {
    try {
      const response = await fetch('/api/getUser', { // Replace '/api/your-endpoint' with your actual API route
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data:userContent, email:userEmail})
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      setUserContent(JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getAdmin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          router.push("/")
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setAdminName(data.name)
        
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  if (!isClient || status=="loading" || adminName=="") {
    return (
    <div className="w-screen h-screen flex justify-center items-center">
      <ThreeDots />
    </div>
    )
  }

  return (
    <Sidebar path="/dashboard">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold align-center mt-4">Admin Dashboard</h1>
        <h1 className="text-1xl font-light align-center mb-4">Welcome {adminName}!</h1>
        <Tabs defaultValue="manage" className="space-y-4">
          <TabsList>
            <TabsTrigger value="manage">Manage Challenges</TabsTrigger>
            <TabsTrigger value="create">Create Challenge</TabsTrigger>
            <TabsTrigger value="manage users">Manage Users</TabsTrigger>
          </TabsList>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Manage Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <AdminChallengeTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card className="flex flex-col p-1 flex-grow min-w-[20rem] mt-2 mb-2 h-[35rem]">
              <span className="text-1xl w-full text-center mt-5 align-center">Creating a Challenge</span>
              <Editor
                height="40vh"
                theme="moon"
                value={editorContent}
                onChange={handleEditorContentChange}
                defaultLanguage="json"
              />
              <div className="flex w-full justify-center">
                <Button className="w-40 my-5 text-white" onClick={createChallenge}>
                  Create
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="manage users">
            <Card className="flex flex-col p-1 flex-grow min-w-[20rem] mt-2 mb-2 h-[35rem]">
              <span className="text-1xl w-full text-center mt-5 align-center">Editing a user</span>
              <Editor
                height="40vh"
                theme="moon"
                value={userContent}
                onChange={handlerUserContentChange}
                defaultLanguage="json"
              />
              <div className="flex flex-col items-center w-full">
                <Input
                  type="text"
                  className="w-96  p-2"
                  placeholder="Enter email"
                  value={userEmail}
                  onChange={handleInputChange}
                />

                <div className="flex space-x-1 mt-4">
                  <Button className="w-40 text-white" onClick={()=>{fetchUserData();}}>
                    Pull data
                  </Button>
                  <Button className="w-40 text-white" variant="outline" onClick={updateUser}>
                    Save
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Sidebar>
  );
}

const defaultJson = `
{
  "name": "Example Challenge",
  "id": "example_challenge_1",
  "description": "This is an example challenge description.",
  "arguments": ["arg1", "arg2"],
  "difficulty": "Medium",
  "points": 100,
  "isDaily": false,
  "testCases": [
    {
      "args": {"arg1":10, "arg2":20},
      "output": "30"
    },
    {
      "args": {"arg1":40, "arg2":50},
      "output": "90"
    }
  ]
}
`;