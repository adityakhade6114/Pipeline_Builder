# Deploy - https://react-pipeline-builder.netlify.app/
# Pipeline Builder

A visual workflow builder that allows users to create and connect custom processing nodes through an interactive drag-and-drop interface. The application supports multiple node types, dynamic connections, and backend validation of workflow pipelines.

## Features

* Drag-and-drop node creation
* Multiple custom node types
* Visual graph editor
* Edge-based node connections
* Pipeline validation
* Frontend and backend architecture
* Extensible node system

## Tech Stack

### Frontend

* React
* JavaScript
* React Flow
* CSS

### Backend

* FastAPI
* Python

## Project Structure

backend/

* main.py
* requirements.txt

frontend/

* src/
* public/
* package.json

## Installation

### Clone Repository

```bash
git clone https://github.com/adityakhade6114/fuel-route-api.git
cd fuel-route-api
```

### Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

pip install -r requirements.txt
```

Run backend:

```bash
uvicorn main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

### Frontend Setup

Open another terminal:

```bash
cd frontend

npm install
npm start
```

Frontend URL:

```text
http://localhost:3000
```

## Usage

1. Launch frontend and backend.
2. Drag nodes from the toolbar.
3. Connect nodes to build a workflow.
4. Submit the pipeline.
5. Backend validates the graph structure and returns results.

## Future Improvements

* Workflow persistence
* User authentication
* Real-time collaboration
* Workflow templates
* Export/Import pipelines

## Author

Aditya Khade
