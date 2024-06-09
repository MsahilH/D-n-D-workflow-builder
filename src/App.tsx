import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from 'layout/Layout';
import Dashboard from 'pages/Dashboard';
import WorkflowBuilder from 'pages/WorkflowBuilder/WorkflowBuilder';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/" element={<Dashboard />} />
					<Route
						path="/workflow/:workflowId"
						element={<WorkflowBuilder />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
