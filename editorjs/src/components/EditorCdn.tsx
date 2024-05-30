import React, { useEffect, useRef } from "react";
import edjsHTML from "editorjs-html";

import "./Editor.css";

const DEFAULT_INITIAL_DATA: any = {"time":1717034632642,"blocks":[{"id":"XwGw1vD0-Q","type":"header","data":{"text":"This is my awesome editor!","level":1}},{"id":"Ewj09-IbJd","type":"paragraph","data":{"text":"Texto aqui"}},{"id":"hJTNj1jDDm","type":"list","data":{"style":"ordered","items":["Lista","lista"]}},{"id":"Fgl8i2Ek7U","type":"paragraph","data":{"text":"textoooo"}}],"version":"2.29.1"}

const parser = edjsHTML();

const html = parser.parse(DEFAULT_INITIAL_DATA);
console.log("html", html);

const loadScript = (src: string) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

const EditorComponent: React.FC = () => {
  const ejInstance = useRef<any | null>(null);

  useEffect(() => {
    const loadEditorJS = async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest");
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/header@latest");
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/list@latest");
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/checklist@latest");
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/raw@latest");
        await loadScript("https://cdn.jsdelivr.net/npm/@editorjs/delimiter@latest");

        const EditorJS = (window as any).EditorJS;
        const Header = (window as any).Header;
        const List = (window as any).List;
        const Checklist = (window as any).Checklist;
        const RawTool = (window as any).RawTool;
        const Delimiter = (window as any).Delimiter;

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
            raw: RawTool,
            delimiter: Delimiter,
          },
          data: DEFAULT_INITIAL_DATA,
        });
      } catch (error) {
        console.error("Failed to load EditorJS scripts", error);
      }
    };

    if (ejInstance.current === null) {
      loadEditorJS();
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
