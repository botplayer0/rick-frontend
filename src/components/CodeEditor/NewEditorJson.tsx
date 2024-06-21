import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

import { useState } from "react";

import AceEditor from "react-ace";

interface IEditorProps {
  id?: string;
  readonly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const NewEditorJson: React.FC<IEditorProps> = (props) => {
  const { id, value = "", onChange } = props;
  const [code, setNewCode] = useState<string>("");

  const triggerChange = (changeValue: string) => {
    if (onChange) {
      onChange(changeValue);
    } else {
      setNewCode(changeValue);
    }
  };

  const handleCodeChange = (newCode: string) => {
    triggerChange(newCode);
  };

  // useEffect(() => {
  //   ace.config.loadModule("ace/ext/language_tools", () => {
  //     ace.require("ace/ext/language_tools");
  //   });
  // }, []);

  return (
    <AceEditor
      mode="json"
      theme="monokai"
      value={value || code}
      key={id || "ace-json"}
      onChange={handleCodeChange}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        tabSize: 2,
      }}
      readOnly={props?.readonly || false}
      showPrintMargin={false}
      showGutter={true}
      wrapEnabled={true}
      highlightActiveLine={true}
      fontSize={16}
      tabSize={4}
      width="100%"
      style={{
        minHeight: "300px",
      }}
    />
  );
};
export default NewEditorJson;
