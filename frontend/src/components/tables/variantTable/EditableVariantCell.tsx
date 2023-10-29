import React from "react";
import { BasicTableRow } from "@src/api/table.api";
import { InputNumber } from "@src/components/common/inputs/InputNumber/InputNumber";
import { BaseInput } from "@src/components/common/inputs/BaseInput/BaseInput";
import { BaseForm } from "@src/components/common/forms/BaseForm/BaseForm";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: BasicTableRow;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <BaseInput />;

  return (
    <td {...restProps}>
      {editing ? (
        <BaseForm.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </BaseForm.Item>
      ) : (
        children
      )}
    </td>
  );
};
