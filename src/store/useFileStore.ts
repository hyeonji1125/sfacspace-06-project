// mockup 구현 위한 임시 data
// 임시 data라 그냥 여기서 type 선언했습니다 어차피 지워야할 파일임

import { create } from "zustand";
export type Tfile = {
  id: number;
  category: "folder" | "file";
  name: string;
  code?: string;
  isSelected: boolean;
  status: "inprogress" | "pending" | "completed" | "error" | "none";
  percentage: number;
};

type TFileStoreState = {
  list: Tfile[];
  setList: (newList: Tfile[]) => void;
  toggleSelect: (id: number) => void;
  selectedFile?: Tfile;
  setSelectedFile: (file: Tfile | undefined) => void;
};

export const useFileStore = create<TFileStoreState>((set) => ({
  list: [
    {
      id: 1,
      category: "folder",
      name: "public",
      code: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\ The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      isSelected: false,
      status: "none",
      percentage: 92,
    },
    {
      id: 2,
      category: "folder",
      name: "src",
      code: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\ The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      isSelected: false,
      status: "none",
      percentage: 100,
    },
    {
      id: 3,
      category: "file",
      name: ".starttttttttttttttttttttttttttttttttt.json",
      code: `import SectionBusinessForever from "@/components/section-business-forever";
import SectionVideoDisplayer from "@/components/section-video-displayer";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-36 min-h-screen"
    // only background brightness is 0.5
      style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bg.svg')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <hgroup className="flex flex-col items-center py-16 gap-4 z-10">
        <Badge>Systemable</Badge>
        <h1 className="text-6xl font-bold">Build once, Business forever</h1>
        <p className="text-sm">
          We help businesses to grow and scale by providing them with the right
          tools and resources.
        </p>
      </hgroup>
      <div className="z-10 grid grid-cols-2 max-w-4xl mx-auto gap-4 my-24">
        <Card className="bg-transparent backdrop-blur-sm col-span-2">
          <CardHeader>
            <CardTitle>Analyze</CardTitle>
            <CardDescription>
              We analyze your business processes and provide you with the right ways to make sure your business is running smoothly.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Systemize</CardTitle>
            <CardDescription>
              We find the ways to systemize your business processes to make sure you are not wasting time on repetitive tasks.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-transparent backdrop-blur-sm">`,
      isSelected: false,
      status: "completed",
      percentage: 100,
    },
    {
      id: 4,
      category: "file",
      name: ".eslintrc.json",
      code: `import SectionBusinessForever from "@/components/section-business-forever";
import SectionVideoDisplayer from "@/components/section-video-displayer";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center py-36 min-h-screen"
    // only background brightness is 0.5
      style={{ background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bg.svg')", backgroundSize: "cover", backgroundPosition: "center"}}>
      <hgroup className="flex flex-col items-center py-16 gap-4 z-10">
        <Badge>Systemable</Badge>
        <h1 className="text-6xl font-bold">Build once, Business forever</h1>
        <p className="text-sm">
          We help businesses to grow and scale by providing them with the right
          tools and resources.
        </p>
      </hgroup>
      <div className="z-10 grid grid-cols-2 max-w-4xl mx-auto gap-4 my-24">
        <Card className="bg-transparent backdrop-blur-sm col-span-2">
          <CardHeader>
            <CardTitle>Analyze</CardTitle>
            <CardDescription>
              We analyze your business processes and provide you with the right ways to make sure your business is running smoothly.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-transparent backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Systemize</CardTitle>
            <CardDescription>
              We find the ways to systemize your business processes to make sure you are not wasting time on repetitive tasks.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="bg-transparent backdrop-blur-sm">`,
      isSelected: false,
      status: "pending",
      percentage: 50,
    },
    {
      id: 5,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "inprogress",
      percentage: 56,
    },
    {
      id: 6,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "error",
      percentage: 0,
    },
    {
      id: 7,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 8,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 9,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 10,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 11,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 12,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 13,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 14,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 15,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 16,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 17,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 18,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 19,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 20,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
    {
      id: 21,
      category: "file",
      name: ".ennnnnnd.json",
      isSelected: false,
      status: "none",
      percentage: 0,
    },
  ],
  setList: (newList) => set({ list: newList }),
  toggleSelect: (id) =>
    set((state) => ({
      list: state.list.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    })),
  selectedFile: undefined,
  setSelectedFile: (file) => set({ selectedFile: file }),
}));
