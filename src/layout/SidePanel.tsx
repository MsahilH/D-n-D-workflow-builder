import React from "react";
import "./SidePanelStyle.css";
import Button from "components/Button";
import { useDispatch } from "react-redux";
import { addNode } from "store/nodeSlice";

const SidePanel = () => {
  const dispatch = useDispatch();

  const handleAddNode = (type: string, ariaLabel: string) => {
    const newNodeId = `node-${Date.now()}`;
    dispatch(
      addNode({
        id: newNodeId,
        type,
        actionType: ariaLabel,
        data: [],
        position: { x: 100, y: 100 },
        selectedFile: null,
      })
    );
  };
  return (
    <aside className="side-panel flex flex-col gap-6 text-left">
      <div className="flex flex-col gap-5 border border-border-color p-3">
        <h4 className="text-lg">Input</h4>
        <Button
          className="text-left"
          onClick={() => handleAddNode("FileNode", "File")}
        >
          Add File Node
        </Button>
      </div>

      <div className="flex flex-col gap-5 border border-border-color p-3">
        <h4 className="text-lg">Transformer Nodes</h4>
        <div className="flex flex-col gap-5">
          <Button
            className="text-left"
            onClick={() => handleAddNode("FilterNode", "Filter")}
          >
            Add Filter Node
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <Button
            className="text-left"
            onClick={() => handleAddNode("FilterNode", "Reduce")}
          >
            Add Reduce Node
          </Button>
        </div>
        <div className="flex flex-col gap-5">
          <Button
            className="text-left"
            onClick={() => handleAddNode("FilterNode", "Find")}
          >
            Add Find Node
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
