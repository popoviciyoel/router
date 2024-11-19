"use client";

import React, {useRef} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { ParagraphPlugin, Plate } from "@udecode/plate-common/react";

import { useCreateEditor } from "@/components/editor/use-create-editor";
import { SettingsDialog } from "@/components/editor/use-chat";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { FloatingToolbar } from "../plate-ui/floating-toolbar";
import { createPlateEditor } from "@udecode/plate-common/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { editorPlugins } from "./plugins/editor-plugins";

export function PlateEditor() {
  // const editor = useCreateEditor();
  // const ref = useRef()

  // console.log('ref', ref)

  const editor = createPlateEditor({
    plugins: [...editorPlugins],
  });

  return (
    <Plate editor={editor}  >
      <EditorContainer           
 variant="demo">
        <Editor style={{height: '100%', padding: '0px'}}  />
      </EditorContainer>
    </Plate>
  );
}
