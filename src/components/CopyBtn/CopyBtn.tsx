import { message } from "@/hooks/useAppStatic";
import { Button } from "antd";
import { useState } from "react";

const CopyBtn = ({ value }) => {
  const [copyValue, setCopyValue] = useState<string>("");

  return (
    <div style={{ marginBottom: 6 }}>
      <Button
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          if ((await navigator.clipboard.readText()) === value) {
            setCopyValue(value);
            message.success("复制成功🎉");
          }
        }}
      >
        {`复 制${copyValue && copyValue === value ? ` ✅` : ""}`}
      </Button>
    </div>
  );
};

export default CopyBtn;
