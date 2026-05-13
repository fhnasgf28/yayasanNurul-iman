"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Image as ImageIcon,
  Undo,
  Redo,
} from "lucide-react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL Gambar:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-gray-100 bg-gray-50 rounded-t-xl">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("bold") ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <Bold size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("italic") ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <Italic size={18} />
      </button>
      <div className="w-[1px] bg-gray-200 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("heading", { level: 1 }) ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <Heading1 size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("heading", { level: 2 }) ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <Heading2 size={18} />
      </button>
      <div className="w-[1px] bg-gray-200 mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("bulletList") ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <List size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded hover:bg-white transition-colors ${editor.isActive("orderedList") ? "text-accent bg-white shadow-sm" : "text-gray-500"}`}
      >
        <ListOrdered size={18} />
      </button>
      <div className="w-[1px] bg-gray-200 mx-1" />
      <button
        type="button"
        onClick={addImage}
        className="p-2 rounded hover:bg-white transition-colors text-gray-500"
      >
        <ImageIcon size={18} />
      </button>
      <div className="flex-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        className="p-2 rounded hover:bg-white transition-colors text-gray-500"
      >
        <Undo size={18} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        className="p-2 rounded hover:bg-white transition-colors text-gray-500"
      >
        <Redo size={18} />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] p-6 focus:outline-none text-primary",
      },
    },
  });

  return (
    <div className="w-full border border-gray-100 rounded-xl overflow-hidden bg-white focus-within:border-accent transition-colors">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
