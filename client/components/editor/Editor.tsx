"use client";

import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import List from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Code from "@tiptap/extension-code";
import Quote from "@tiptap/extension-blockquote";

const CustomHeader = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "font-bold",
        renderHTML: (attr) => ({ class: attr.class }),
      },
    };
  },
  renderHTML({ node, HTMLAttributes }) {
    const l = this.options.levels.includes(node.attrs.level)
      ? node.attrs.level
      : this.options.levels[0];
    const levelClass = {
      2: "text-2xl sm:text-3xl font-bold",
      3: "text-xl sm:text-2xl font-bold",
      4: "text-lg sm:text-xl font-bold",
    };
    return [
      `h${l}`,
      { ...HTMLAttributes, class: levelClass[l as keyof typeof levelClass] },
      0,
    ];
  },
});
const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      class: {
        default: "text-gray-700",
        renderHTML: (attr) => ({ class: attr.class }),
      },
    };
  },
});

const CustomQuote = Quote.extend({
  addAttributes() {
    return {
      class: {
        default: "border-l-4 border-gray-400 pl-4 italic text-gray-700",
        renderHTML: (attrs) => ({ class: attrs.class }),
      },
    };
  },
});

const CustomList = List.extend({
  addAttributes() {
    return {
      class: {
        default: "list-disc  text-gray-800",
        renderHTML: (attrs) => ({ class: attrs.class }),
      },
    };
  },
});
const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      class: {
        default: "pl-4 text-gray-800",
        renderHTML: (attrs) => ({ class: attrs.class }),
      },
    };
  },
});
const CustomCode = Code.extend({
  addAttributes() {
    return {
      class: {
        default:
          "bg-[#1e1e1e] text-green-300 font-mono text-sm leading-relaxed p-4 block rounded-lg overflow-x-auto whitespace-pre",
        renderHTML: (attrs) => ({ class: attrs.class }),
      },
    };
  },
});
export const MenuBar = ({ editor }: { editor: Editor }) => {
  if (!editor) return null;

  return (
    <div className="flex gap-3 border-b-0 flex-wrap border-2 border-gray-300 rounded-t-sm p-2 ">
      <Button
        type="button"
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive("paragraph") ? "is-active" : ""}
      >
        P
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        H2
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        Bold
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        Italic
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        List
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        Code
      </Button>
      <Button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        Quote
      </Button>
    </div>
  );
};
export const editorExtensions = [
  StarterKit.configure({
    heading: false,
    paragraph: false,
    bulletList: false,
    codeBlock: false,
    blockquote: false,
  }),
  CustomCode,
  CustomList,
  CustomHeader.configure({ levels: [2, 3, 4] }),
  CustomParagraph,
  CustomQuote,
  CustomListItem,
];
