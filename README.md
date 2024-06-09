# Workflow Builder

Workflow Builder, an intuitive and dynamic application designed to empower users to create, edit, and visualize complex workflows with ease. Whether you're dealing with large datasets or intricate processes, our tool offers a seamless drag-and-drop interface to build workflows consisting of multiple steps (nodes) and the relationships (edges) between them. From filtering and finding data to reducing, and applying various array methods, There is facility to save your multiple workflows and you can get back even after reload.

# Features

-   **Create New Workflow:** Users can create new workflows and manage them independently. It's stored even if user reload.
-   **CSV File Integration:** Add and manage CSV files within workflows.
-   **Node Management:** Two types of nodes available:

    -   **File Select Node:** For selecting CSV files.

    -   **Filter Node:** For applying filters on CSV data.

-   **Drag and Drop:** Users can move nodes around the canvas. 
-   **Node Connections:** Connect nodes using arrows to define data flow.
-   **Data Display:** Click on a node to display its data output below the canvas.
-   **Export Data:** Export the data of selected nodes as a CSV file.
-   **Save Workflow:** Save the entire workflow for future use. Those positions and connections are saved when user click on 'Save Workflow' given in right side top corner.

## Screen-Shots

[![Adding multiple entry : Create, Delete, Update, Save even after reload.](https://github.com/MsahilH/D-n-D-workflow-builder/blob/master/data/home.jpg)
[![Multiple combination of the filter nodes to process data, Export files options, Save workflow and go to home page](https://github.com/MsahilH/D-n-D-workflow-builder/blob/master/data/workflow.jpg)

To See the best verison of project, prefer to setup project in your local but for quick demo you can visit below link.

## To Visit Deploy Version

[Live Link : ](https://d-n-d-workflow-sahilmonparah.netlify.app/).


## Installation

To install the necessary dependencies, use Node.js v18.18.2 or later, and run:

```bash
npm install
```
git clone https://github.com/MsahilH/D-n-D-workflow-builder.git
cd D-n-D-workflow-builder
npm install

## Usage

To start the development server, run:

```bash
npm run start
```

## Folder Structure

Here is an overview of the folder structure of the project:

```bash


data/
└── Sample-Data.csv
src/
├── assets/
│   └── svg/
│       ├── arrow.svg
│       └── logo.svg
├── components/
│   ├── Button/
│   │   └── index.tsx
│   ├── Form/
│   │   ├── CsvFileSelectInput.tsx
│   │   └── DynamicInput.tsx
│   ├── Node/
│   │   ├── FileNode/
│   │   │   └── index.tsx
│   │   └── FilterNode/
│   │       └── index.tsx
│   └── Table/
│       ├── index.tsx
│       └── TableStyle.css
├── constants/
│   └── conditionConstants.ts
├── layout/
│   ├── Footer.tsx
│   ├── FooterStyle.css
│   ├── Header.tsx
│   ├── HeaderStyle.css
│   ├── Layout.tsx
│   ├── LayoutStyle.css
│   ├── SidePanel.tsx
│   └── SidePanelStyle.css
├── pages/
│   ├── Dashboard/
│   │   ├── DashboardStyle.css
│   │   └── index.tsx
│   └── WorkflowBuilder/
│       ├── FlowCanvas.tsx
│       ├── WorkflowBuilder.tsx
│       └── WorkflowBuilderStyle.css
├── store/
│   ├── edgeSlice.ts
│   ├── nodeSlice.ts
│   ├── store.ts
│   └── workflowSlice.ts
├── utils/
│   ├── convertToCSV.ts
│   └── findDeepData.ts
├── App.tsx
├── index.css
├── index.tsx
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
├── .gitignore
├── file-saver.d.ts
├── package-lock.json
├── package.json
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── webpack.config.ts

```

## Contributing

We welcome contributions from the community! Here's how you can get involved:

--Fork the repository.
--Create a new branch (git checkout -b feature-branch).
--Make your changes.
--Commit your changes (git commit -m 'Add new feature').
--Push to the branch (git push origin feature-branch).
--Open a Pull Request.


```bash
git checkout -b feature-branch
git commit -m 'Add new feature'
git push origin feature-branch
```


