# Workflow Builder

A React and Tailwind CSS application for building and managing workflows. Users can create new workflows, add CSV files, connect nodes, and manage workflow data visually.

# Features

-   **Create New Workflow:** Users can create new workflows and manage them independently.
-   **CSV File Integration:** Add and manage CSV files within workflows.
-   **Node Management:** Two types of nodes available:

    -   **File Select Node:** For selecting CSV files.

    -   **Filter Node:** For applying filters on CSV data.

-   **Drag and Drop:** Users can move nodes around the canvas.
-   **Node Connections:** Connect nodes using arrows to define data flow.
-   **Data Display:** Click on a node to display its data output below the canvas.
-   **Export Data:** Export the data of selected nodes as a CSV file.
-   **Save Workflow:** Save the entire workflow for future use.

## Table of Contents

-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Folder Structure](#folder-structure)

## Installation

To install the necessary dependencies, use Node.js v18.18.2 or later, and run:

```bash
npm install
```

## Usage

To start the development server, run:

```bash
npm start
```

## Folder Structure

Here is an overview of the folder structure of the project:

```bash
src/
├── assets/
│   └── svg/
│       ├── arrow.svg
│       └── logo.svg
├── components/
│   ├── Button/
│   ├── Form/
│   ├── node/
│   └── Table/
├── constants/
│   └── conditionConstant.ts
├── layout/
│   ├── Footer.tsx
│   ├── FooterStyle.css
│   ├── Header.tsx
│   ├── HeaderStyle.css
│   ├── Layout.tsx
│   └── LayoutStyle.css
├── pages/
│   ├── Dashboard/
│   └── WorkflowBuilder/
├── store/
│   ├── edgeSlice.ts
│   ├── nodeSlice.ts
│   ├── store.ts
│   └── workflowSlice.ts
├── utils/
│   └── convertToCSV.ts
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

## Features

To start the development server, run:

```bash
npm start
```
