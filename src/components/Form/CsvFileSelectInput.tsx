import React, { ChangeEvent } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import { useDispatch, useSelector } from "react-redux";
import DynamicInput from "./DynamicInput";
import { RootState } from "store/store";
import {
  removeNodeData,
  setNodeData,
  setSelectedNodeData,
} from "store/nodeSlice";
import Button from "components/Button";

const CsvFileSelectInput = ({ id }: { id?: string }) => {
  const dispatch = useDispatch();

  const selectedNode = useSelector(
    (state: RootState) => state.nodes.selectedNodeData
  );
  const node = useSelector((state: RootState) =>
    state.nodes.nodesData.find((n) => n.id === id)
  );
  const handleRemoveFile = () => {
    dispatch(removeNodeData(id!));
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const records = parse(text, {
          columns: true,
          skip_empty_lines: true,
        });

        if (selectedNode) {
          dispatch(
            setNodeData({
              id: selectedNode.id,
              type: selectedNode.type,
              actionType: selectedNode.actionType,
              data: records,
              position: selectedNode.position,
              selectedFile: file.name,
            })
          );
          dispatch(
            setSelectedNodeData({
              id: selectedNode.id,
              type: selectedNode.type,
              actionType: selectedNode.actionType,
              data: records,
              position: selectedNode.position,
              selectedFile: file.name,
            })
          );
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      {!node?.selectedFile && (
        <DynamicInput
          type="file"
          accept=".csv"
          label="Add CSV File"
          onChange={handleFileUpload}
          disabled={!!node?.selectedFile}
        />
      )}
      {node?.selectedFile && (
        <span className="my-4 flex items-center gap-4">
          {node.selectedFile}
          <Button onClick={handleRemoveFile}>X</Button>
        </span>
      )}
    </div>
  );
};

export default CsvFileSelectInput;
