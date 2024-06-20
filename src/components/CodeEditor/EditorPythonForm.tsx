import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";

import { FormInstance } from "antd";
import { useState } from "react";
import AceEditor from "react-ace";

interface IEditorProps {
  var_script?: string | null;
  updateCurrentScriptInfo?: (varKey: string, varScript: string) => void;
  script?: string;
  setScript?: (script: string) => void;
  control?: FormInstance;
}

const EditorPythonForm: React.FC<IEditorProps> = (props) => {
  const [code, setCode] = useState<string>("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCodeChangeForForm = (newCode: string) => {
    props?.control?.setFieldsValue({ run_command: newCode });
  };
  // useEffect(() => {
  //   ace.config.loadModule("ace/ext/language_tools", () => {
  //     ace.require("ace/ext/language_tools");
  //   });
  // }, []);

  return (
    <AceEditor
      mode="python"
      theme="monokai"
      value={
        props?.control?.getFieldValue("run_command") || props?.script || code
      }
      // value={props.var_script}
      // onChange={(e) => props.updateCurrentScriptInfo("var_script", e)}
      onChange={
        (props?.control && handleCodeChangeForForm) ||
        props?.setScript ||
        handleCodeChange
      }
      name="python-editor"
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        // enableLiveAutocompletion: true,
      }}
      showGutter={true}
      highlightActiveLine={true}
      fontSize={16}
      tabSize={4}
      width="100%"
      height="300px"
    />
  );
};
export default EditorPythonForm;
