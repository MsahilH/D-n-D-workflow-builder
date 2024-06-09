import React, { useEffect, useLayoutEffect, useState } from "react";
import "./DashboardStyle.css";
import Button from "components/Button";
import DynamicInput from "components/Form/DynamicInput";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useNavigate } from "react-router-dom";
import {
  deleteWorkflow,
  updateWorkflow,
  createNewWorkflow,
  loadAllWorkflows,
  saveWorkflow,
  setCurrentWorkflow,
} from "store/workflowSlice";

const Dashboard = () => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workflows = useSelector(
    (state: RootState) => state.workflows.workflows
  );
  const [newWorkflowName, setNewWorkflowName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [updateError, setUpdateError] = useState<string>("");
  useEffect(() => {
    dispatch(loadAllWorkflows());
  }, []);

  const handleCreateWorkflow = () => {
    const newWorkflowId = `workflow-${Date.now()}`;

    if (!newWorkflowName.trim()) {
      setError("Workflow name cannot be empty.");
      return;
    }

    const isDuplicate = workflows.some(
      (workflow) => workflow.name === newWorkflowName.trim()
    );

    if (isDuplicate) {
      setError("Workflow name already exists.");
      return;
    }
    setError("");

    dispatch(createNewWorkflow({ id: newWorkflowId, name: newWorkflowName }));
    dispatch(saveWorkflow(null));
    dispatch(setCurrentWorkflow(newWorkflowId));
    navigate(`/workflow/${newWorkflowId}`);
    setNewWorkflowName("");
  };

  const deleteWorkflows = (workflowId: string) => {
    dispatch(deleteWorkflow(workflowId));
  };

  const handleSelectWorkflow = (workflowId: string) => {
    navigate(`/workflow/${workflowId}`);
    dispatch(setCurrentWorkflow(workflowId));
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleCreateWorkflow();
    }
  };

  const handleInputChange = (e: any) => {
    setUpdateError("");
    setNewName(e.target.value);
  };
  const saveName = (newName: any) => {
    if (editingId) {
      if (!newName.trim()) {
        setUpdateError("cannot be empty.");
        return;
      }

      const isDuplicate = workflows.some(
        (workflow) =>
          workflow.name === newName.trim() && workflow.id !== editingId
      );

      if (isDuplicate) {
        setUpdateError("already exists.");
        return;
      }
      setUpdateError("");

      dispatch(updateWorkflow({ id: editingId, name: newName }));
      setEditingId(null);
      setNewName("");
    }
  };
  const startEditing = (workflow: any) => {
    setEditingId(workflow.id);
    setNewName(workflow.name);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      saveName(newName);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <DynamicInput
          type="text"
          error={error}
          placeholder="New Workflow Name"
          value={newWorkflowName}
          onChange={(e) => {
            setNewWorkflowName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleCreateWorkflow}>Create New Workflow</Button>
      </div>
      {!workflows.length && (
        <div className="w-full mt-[100px] h-full flex items-center justify-center">
          <h1 className="text-xl">Create new work flow </h1>
        </div>
      )}
      {!!workflows.length && (
        <div>
          <h2 className="text-xl">Existing Workflows</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {workflows.map((workflow) => (
              <li
                onClick={
                  editingId === workflow.id
                    ? () => {}
                    : () => handleSelectWorkflow(workflow.id)
                }
                className="py-8 px-5 border cursor-pointer rounded-lg border-gray-300 hover:bg-gray-700 text-base transition-all duration-300 flex justify-between items-center"
                key={workflow.id}
              >
                <div>
                  {editingId === workflow.id ? (
                    <div>
                      <DynamicInput
                        type="text"
                        error={updateError}
                        placeholder="New Workflow Name"
                        value={newName}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                      />
                    </div>
                  ) : (
                    <span>{workflow.name}</span>
                  )}
                </div>
                <div>
                  {editingId === workflow.id ? (
                    <div className="flex gap-2 hover:text-black">
                      <Button
                        onClick={() => saveName(newName)}
                        className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2 hover:text-black">
                      <Button
                        onClick={(e: any) => {
                          e.stopPropagation();
                          startEditing(workflow);
                        }}
                        className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
                      >
                        Update
                      </Button>
                      <Button
                        onClick={(e: any) => {
                          e.stopPropagation();
                          deleteWorkflows(workflow.id);
                        }}
                        className="px-4 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700"
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
