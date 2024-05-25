import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import RawTool from "@editorjs/raw";
import Delimiter from "@editorjs/delimiter";
import edjsHTML from "editorjs-html";

import "./Editor.css";

const DEFAULT_INITIAL_DATA: any = {
  time: 1716658054610,
  blocks: [
    {
      id: "XwGw1vD0-Q",
      type: "header",
      data: { text: "This is my awesome editor!", level: 1 },
    },
    { id: "Ewj09-IbJd", type: "paragraph", data: { text: "Texto aqui" } },
    {
      id: "hJTNj1jDDm",
      type: "list",
      data: { style: "ordered", items: ["Lista", "lista"] },
    },
  ],
  version: "2.29.1",
};

const parser = edjsHTML()

const html = parser.parse(DEFAULT_INITIAL_DATA)
console.log('html', html)

const EditorComponent: React.FC = () => {
  const ejInstance = useRef<EditorJS | null>();
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      onChange: async () => {
        let content = await editor.saver.save();

        console.log(content);
        console.log(JSON.stringify(content));
      },
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        rawTool: RawTool,
        delimiter: Delimiter,
      },
      data: DEFAULT_INITIAL_DATA,
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);
  return (
    <div>
      <div id="editorjs" />
    </div>
  );
};

export default EditorComponent;

/*
- Implementação básica de alguns blocos

No app: 

- Colocar um botão de salvar que envia o conteudo para um bucket no Vbase
- Trazer esses dados para preencher o parametro data

- 
Converter os dados em HTML e salvar no masterdata

*/