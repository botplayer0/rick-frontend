import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";

import { FormInstance } from "antd";
import { useState } from "react";
import AceEditor from "react-ace";

interface IEditorProps {
  value?: string;
  readOnly?: boolean;
  contorl?: FormInstance;
  keyName?: string;
}

const EditorJsonForm: React.FC<IEditorProps> = (props) => {
  const [code, setCode] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeChangeForm = (newCode: string) => {
    props?.contorl?.setFieldValue(props.keyName, newCode);
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
      value={
        props?.contorl?.getFieldValue(props.keyName) || props?.value || code
      }
      onChange={(props?.contorl && handleCodeChangeForm) || handleCodeChange}
      name="json-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        tabSize: 2,
      }}
      readOnly={props?.readOnly || false}
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
export default EditorJsonForm;
