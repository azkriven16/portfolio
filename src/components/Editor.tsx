"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function Editor({ content, onChange }: EditorProps) {
 const editor = useEditor({
  immediatelyRender: false,
  extensions: [
    StarterKit,
    Image,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder: "Write your blog content here..." }),
  ],
  content,
  onUpdate: ({ editor }) => onChange(editor.getHTML()),
});

  if (!editor) return null;

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b border-gray-300 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded text-sm font-bold ${editor.isActive("bold") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded text-sm italic ${editor.isActive("italic") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 rounded text-sm line-through ${editor.isActive("strike") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          S
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 1 }) ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 2 }) ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("heading", { level: 3 }) ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          H3
        </button>
        <div className="w-px bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("bulletList") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("orderedList") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("blockquote") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          Quote
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-2 py-1 rounded text-sm ${editor.isActive("codeBlock") ? "bg-black text-white" : "hover:bg-gray-200"}`}
        >
          Code
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-64 focus:outline-none"
      />
    </div>
  );
}