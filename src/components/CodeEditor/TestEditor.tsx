import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

import { useEffect, useState } from "react";
import AceEditor from "react-ace";

interface IEditorProps {
  value?: string;
  setValue?: (varKey: string, varScript: string) => void;
  readOnly?: boolean;
}

const TestEditor: React.FC<IEditorProps> = (props) => {
  const [code, setCode] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    ace.config.loadModule("ace/ext/language_tools", () => {
      ace.require("ace/ext/language_tools");
    });
  }, []);

  return (
    <AceEditor
      mode="json"
      theme="monokai"
      value={props.value || code}
      onChange={props.setValue || setCode}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        tabSize: 2,
      }}
      readOnly={props.readOnly || false}
      showPrintMargin={false}
      showGutter={true}
      wrapEnabled={true}
      highlightActiveLine={true}
      fontSize={16}
      tabSize={4}
      width="100%"
      height="600px"
    />
  );
};
export default TestEditor;
